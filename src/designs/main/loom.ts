/* The loom: the hero's field of threads, with the name woven in. This file
   is the small half — is the device one that wants it, and wiring to the
   page lifecycle. The mesh and shaders are in loom-gl.ts, fetched with
   `three` only once `wanted()` says yes; a reader on reduced motion, on
   save-data, or without WebGL never downloads them and gets the CSS weave in
   Home.astro instead. */

export interface LoomOptions {
	/** The name, in the page's language. */
	text: string;
	/** A CSS font-family list the canvas can use; taken from the h1. */
	font: string;
	rtl: boolean;
	thread: string;
	linen: string;
}

/** Should this device get the loom at all? */
function wanted() {
	const nav = navigator as Navigator & {
		connection?: { saveData?: boolean };
		deviceMemory?: number;
	};
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
	if (nav.connection?.saveData) return false;
	if (nav.deviceMemory && nav.deviceMemory < 4) return false;
	const probe = document.createElement('canvas');
	const gl = probe.getContext('webgl2');
	if (!gl) return false;
	/* A software rasteriser (SwiftShader, llvmpipe, a VM) would draw the
	   cloth at two frames a second and stall the page with it. */
	const info = gl.getExtension('WEBGL_debug_renderer_info');
	const renderer = info
		? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
		: '';
	return !/swiftshader|llvmpipe|software|mesa offscreen/i.test(renderer);
}

/** Wire the loom to the page lifecycle: mount on load, dispose on swap. */
export function boot() {
	let dispose: (() => void) | null = null;

	const start = () => {
		const host = document.querySelector<HTMLElement>('[data-loom]');
		if (!host || dispose || !wanted()) return;
		const h1 = host.querySelector('h1');
		const font = h1 ? getComputedStyle(h1).fontFamily : 'sans-serif';
		const opts: LoomOptions = {
			text: host.dataset.loom || h1?.textContent?.trim() || '',
			font,
			rtl: document.documentElement.dir === 'rtl',
			thread: getComputedStyle(host).getPropertyValue('--thread').trim(),
			linen: getComputedStyle(host).getPropertyValue('--linen').trim(),
		};
		/* Wait for the display face so the mask is set in it, not a fallback. */
		const ready =
			document.fonts?.load(`900 100px ${font}`) ?? Promise.resolve();
		let alive = true;
		const off = () => {
			alive = false;
		};
		document.addEventListener('astro:before-swap', off, { once: true });
		ready
			.catch(() => undefined)
			.then(async () => {
				if (!alive || !host.isConnected) return;
				const { mount } = await import('./loom-gl');
				const d = mount(host, opts);
				if (alive) dispose = d;
				else d();
			});
	};

	document.addEventListener('astro:page-load', start);
	document.addEventListener('astro:before-swap', () => {
		dispose?.();
		dispose = null;
	});
}
