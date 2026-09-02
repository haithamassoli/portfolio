/* Square and phone-shaped shots, sat inside a landscape frame.
 *
 * A 1080×2340 phone capture or a 512×512 logo dropped into a 16/9 card is
 * either blown up until it is unreadable or cropped to a strip. This bakes the
 * frame into the file instead: the shot is placed at (at most) its own size on
 * a blurred wash of itself, so every design gets the same landscape asset and
 * needs no per-design CSS.
 *
 * Originals are kept in src/assets/_raw/ and are the input on every run, so
 * this is idempotent and reversible.
 *
 * Run: node scripts/frame-shots.mjs
 */
import { readFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const RAW = join(root, 'src/assets/_raw');

/* 16/9, wide enough that a 2× logo still has pixels to spare. */
const W = 2400;
const H = 1350;
/* The shot never fills the frame, and never grows more than 2×. Two thirds of
   the height leaves enough margin that a card cropping this to ~2.6/1 still
   shows the whole subject. */
const BOX_W = 2160;
const BOX_H = 900;
const MAX_UP = 2;
/* Logos and app icons sit smaller than a screenshot does. */
const SQ = 640;
/* Anything within 5% of square counts as square, not landscape. */
const LANDSCAPE = 1.05;

/** Every cover and gallery path the content layer actually renders. */
const referenced = () => {
	const src = readFileSync(join(root, 'content/projects.ts'), 'utf8');
	return [
		...new Set(src.match(/'\/(?:projects|apps)\/[^']+\.png'/g) ?? []),
	].map((q) => q.slice(1, -1));
};

const rounded = (w, h, r) =>
	Buffer.from(
		`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}"/></svg>`,
	);

async function frame(file) {
	const live = join(root, 'src/assets', file);
	const raw = join(RAW, file);
	if (!existsSync(raw)) {
		mkdirSync(dirname(raw), { recursive: true });
		copyFileSync(live, raw);
	}

	const input = sharp(raw);
	const { width: w, height: h } = await input.metadata();
	if (w > h * LANDSCAPE) return null; // already landscape, leave it alone

	/* A logo is not a screenshot: it sits smaller in the frame, and it is
	   almost always an app icon, so it gets an icon-sized corner radius. */
	const square = w > h / LANDSCAPE;
	const scale = Math.min(
		(square ? SQ : BOX_W) / w,
		(square ? SQ : BOX_H) / h,
		MAX_UP,
	);
	const iw = Math.round(w * scale);
	const ih = Math.round(h * scale);
	const r = Math.round(Math.min(iw, ih) * (square ? 0.22 : 0.045));

	const shot = await sharp(raw)
		.resize(iw, ih, { fit: 'fill' })
		.composite([{ input: rounded(iw, ih, r), blend: 'dest-in' }])
		.png()
		.toBuffer();

	const pad = 28;
	const shadow = await sharp({
		create: {
			width: iw + pad * 2,
			height: ih + pad * 2,
			channels: 4,
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		},
	})
		.composite([
			{
				input: await sharp(rounded(iw, ih, r))
					.png()
					.toColorspace('b-w')
					.toBuffer(),
				left: pad,
				top: pad,
			},
		])
		.blur(20)
		.linear(0.34, 0)
		.png()
		.toBuffer();

	/* Transparent: whatever the design puts behind the image is the frame. */
	await sharp({
		create: {
			width: W,
			height: H,
			channels: 4,
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		},
	})
		.composite([
			{
				input: shadow,
				left: Math.round((W - iw) / 2) - pad,
				top: Math.round((H - ih) / 2) - pad + 12,
				blend: 'over',
			},
			{
				input: shot,
				left: Math.round((W - iw) / 2),
				top: Math.round((H - ih) / 2),
			},
		])
		.png({ compressionLevel: 9 })
		.toFile(live);

	return `${file}  ${w}×${h} → ${W}×${H} (shot ${iw}×${ih})`;
}

const done = [];
for (const p of referenced()) {
	const line = await frame(p);
	if (line) done.push(line);
}
console.log(done.join('\n'));
console.log(`\n${done.length} framed, originals in src/assets/_raw/`);
