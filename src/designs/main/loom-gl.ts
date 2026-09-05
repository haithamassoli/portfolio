/* The loom's GL half: the mesh, the shaders, the loop. Loaded on demand by
   loom.ts, and nowhere else, so `three` is only ever fetched by a device
   that will draw with it. Named imports, so the bundle carries the renderer
   and one mesh's worth of the library rather than all of it.

   A field of threads fills the hero — warp across, weft down, a true plain
   weave (thread i passes over thread j when i + j is even) — and the name is
   woven into it: wherever a thread crosses the glyphs of a text mask it lifts
   towards the viewer and takes the indigo. A reveal sweeps the pattern in
   from the reading side; the pointer bows the threads apart; and scrolling
   down loosens the whole cloth and tilts it away.

   Everything that moves, moves in the vertex shader. The CPU builds one
   indexed ribbon mesh (two vertices per sample, two triangles per segment)
   and after that only uniforms change per frame. ~150k vertices on a laptop,
   ~60k on a phone, one draw call.

   ponytail: no post-processing, no controls, no scene graph beyond one mesh.
   Ribbons over GL lines because lines are always 1px and this wants cloth. */
import {
	BufferAttribute,
	BufferGeometry,
	CanvasTexture,
	Color,
	DoubleSide,
	LinearFilter,
	Mesh,
	PerspectiveCamera,
	Scene,
	ShaderMaterial,
	Sphere,
	type Texture,
	Vector2,
	Vector3,
	WebGLRenderer,
} from 'three';
import type { LoomOptions } from './loom';

const SPACING = 11;
const SAMPLES_PER_SPACING = 5;
const MAX_VERTICES = 220_000;

const vertexShader = /* glsl */ `
	uniform float uTime, uReveal, uScroll, uSpacing, uAmp, uWidth, uRtl, uW, uH, uMouseF;
	uniform vec2 uMouse;
	uniform sampler2D uMask;
	attribute float aAlong, aAcross, aSide, aIndex, aSet, aSeed;
	varying float vInk, vLight, vSet, vEdge, vFade;

	const float PI = 3.14159265;

	void main() {
		float warp = 1.0 - aSet;
		vec2 p = warp > 0.5 ? vec2(aAlong, aAcross) : vec2(aAcross, aAlong);

		/* plain weave: over, under, over */
		float phase = PI * aAlong / uSpacing + PI * aIndex + PI * aSet;
		float z = uAmp * cos(phase);
		float dz = -sin(phase);

		/* the name */
		vec2 uv = vec2(p.x / uW, 1.0 - p.y / uH);
		float ink = texture2D(uMask, uv).r;
		float sx = uRtl > 0.5 ? 1.0 - uv.x : uv.x;
		ink *= smoothstep(sx - 0.10, sx + 0.02, uReveal);

		/* breathing, more of it as the cloth loosens */
		float loose = 1.0 + uScroll * 5.0;
		float drift = sin(uTime * 0.7 + aAlong * 0.012 + aSeed * 6.2832) * 1.4 * loose;

		/* the pointer parts the threads */
		vec2 d = p - uMouse;
		float dist = length(d);
		float f = uMouseF * smoothstep(190.0, 0.0, dist);
		vec2 push = (dist > 0.001 ? d / dist : vec2(0.0)) * f * 30.0;

		vec2 across = warp > 0.5 ? vec2(0.0, 1.0) : vec2(1.0, 0.0);
		float w = uWidth * (0.55 + 0.45 * ink);
		vec2 pos2 = p + push + across * (aSide * w + drift);
		z += ink * 16.0 + f * 12.0;

		vec3 pos = vec3(pos2.x - uW * 0.5, uH * 0.5 - pos2.y, z);
		vInk = ink;
		vSet = aSet;
		vEdge = aSide;
		vLight = 0.5 + 0.5 * dz;
		vFade = smoothstep(0.0, 0.16, uv.y) * smoothstep(1.0, 0.94, uv.y);
		gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
	}
`;

const fragmentShader = /* glsl */ `
	precision highp float;
	uniform vec3 uThread, uLinen;
	varying float vInk, vLight, vSet, vEdge, vFade;

	void main() {
		vec3 base = mix(uLinen * 0.90, uLinen * 0.80, vSet);
		vec3 col = mix(base, uThread, vInk);
		float round = 1.0 - vEdge * vEdge;
		col *= 0.78 + 0.22 * round;
		col *= 0.86 + 0.28 * vLight;
		gl_FragColor = vec4(col, vFade);
	}
`;

/** The name, white on transparent, fitted into a W×H field. */
function drawMask(W: number, H: number, o: LoomOptions) {
	const scale = Math.min(1, 1600 / W);
	const c = document.createElement('canvas');
	c.width = Math.max(2, Math.round(W * scale));
	c.height = Math.max(2, Math.round(H * scale));
	const ctx = c.getContext('2d')!;
	ctx.scale(scale, scale);
	ctx.fillStyle = '#fff';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.direction = o.rtl ? 'rtl' : 'ltr';

	const fit = (lines: string[]) => {
		let size = Math.min(H * 0.6, H / (lines.length * 1.15));
		ctx.font = `900 ${size}px ${o.font}`;
		const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
		size *= Math.min(1, (W * 0.88) / widest);
		ctx.font = `900 ${size}px ${o.font}`;
		return size;
	};

	let lines = [o.text];
	let size = fit(lines);
	/* A narrow screen splits the name at its space rather than shrinking it. */
	if (size < H * 0.3 && o.text.includes(' ')) {
		lines = o.text.split(' ');
		size = fit(lines);
	}

	const lh = size * 1.02;
	const top = H / 2 - ((lines.length - 1) * lh) / 2;
	lines.forEach((l, i) => ctx.fillText(l, W / 2, top + i * lh));
	return c;
}

export function mount(host: HTMLElement, o: LoomOptions) {
	const canvas =
		host.querySelector('canvas') ?? document.createElement('canvas');
	if (!canvas.isConnected) host.appendChild(canvas);

	const renderer = new WebGLRenderer({
		canvas,
		antialias: true,
		alpha: true,
		powerPreference: 'high-performance',
	});
	renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
	renderer.setClearColor(0x000000, 0);

	const scene = new Scene();
	const camera = new PerspectiveCamera(28, 1, 1, 6000);
	const uniforms = {
		uTime: { value: 0 },
		uReveal: { value: 0 },
		uScroll: { value: 0 },
		uSpacing: { value: SPACING },
		uAmp: { value: 3 },
		uWidth: { value: SPACING * 0.36 },
		uRtl: { value: o.rtl ? 1 : 0 },
		uW: { value: 1 },
		uH: { value: 1 },
		uMouse: { value: new Vector2(-9999, -9999) },
		uMouseF: { value: 0 },
		uMask: { value: null as Texture | null },
		uThread: { value: new Color(o.thread) },
		uLinen: { value: new Color(o.linen) },
	};
	const material = new ShaderMaterial({
		uniforms,
		vertexShader,
		fragmentShader,
		transparent: true,
		side: DoubleSide,
	});
	let mesh: Mesh | null = null;
	let W = 0;
	let H = 0;

	/** One ribbon per thread, both sets in one indexed geometry. */
	function build() {
		W = host.clientWidth;
		H = host.clientHeight;
		if (!W || !H) return;

		/* Density falls with the area, so a phone gets a coarser cloth rather
		   than a slideshow. */
		/* A phone gets a finer cloth: the name is two lines there and needs the
		   resolution; the area is small enough that it still stays cheap. */
		let spacing = W < 700 ? 8 : SPACING;
		let per = SAMPLES_PER_SPACING;
		const count = (s: number, p: number) => {
			const rows = Math.floor(H / s) + 1;
			const cols = Math.floor(W / s) + 1;
			const nx = Math.floor(W / s) * p + 1;
			const ny = Math.floor(H / s) * p + 1;
			return { rows, cols, nx, ny, verts: (rows * nx + cols * ny) * 2 };
		};
		let c = count(spacing, per);
		while (c.verts > MAX_VERTICES) {
			if (per > 3) per--;
			else spacing += 1;
			c = count(spacing, per);
		}
		uniforms.uSpacing.value = spacing;
		uniforms.uWidth.value = spacing * 0.36;

		const along = new Float32Array(c.verts);
		const across = new Float32Array(c.verts);
		const side = new Float32Array(c.verts);
		const index = new Float32Array(c.verts);
		const set = new Float32Array(c.verts);
		const seed = new Float32Array(c.verts);
		const tris = (c.rows * (c.nx - 1) + c.cols * (c.ny - 1)) * 6;
		const idx = new Uint32Array(tris);
		let v = 0;
		let k = 0;
		const strip = (n: number, samples: number, length: number, s: number) => {
			for (let i = 0; i < n; i++) {
				const sd = Math.random();
				const base = v;
				for (let j = 0; j < samples; j++) {
					const a = (j / (samples - 1)) * length;
					for (const e of [-1, 1]) {
						along[v] = a;
						across[v] = i * spacing;
						side[v] = e;
						index[v] = i;
						set[v] = s;
						seed[v] = sd;
						v++;
					}
					if (j > 0) {
						const p = base + (j - 1) * 2;
						const q = base + j * 2;
						idx[k++] = p;
						idx[k++] = p + 1;
						idx[k++] = q;
						idx[k++] = p + 1;
						idx[k++] = q + 1;
						idx[k++] = q;
					}
				}
			}
		};
		strip(c.rows, c.nx, W, 0);
		strip(c.cols, c.ny, H, 1);

		const g = new BufferGeometry();
		g.setAttribute('aAlong', new BufferAttribute(along, 1));
		g.setAttribute('aAcross', new BufferAttribute(across, 1));
		g.setAttribute('aSide', new BufferAttribute(side, 1));
		g.setAttribute('aIndex', new BufferAttribute(index, 1));
		g.setAttribute('aSet', new BufferAttribute(set, 1));
		g.setAttribute('aSeed', new BufferAttribute(seed, 1));
		g.setIndex(new BufferAttribute(idx, 1));
		/* No `position` attribute, so tell three what it cannot compute. */
		g.boundingSphere = new Sphere(new Vector3(), Math.hypot(W, H));

		if (mesh) {
			mesh.geometry.dispose();
			mesh.geometry = g;
		} else {
			mesh = new Mesh(g, material);
			mesh.frustumCulled = false;
			scene.add(mesh);
		}

		uniforms.uMask.value?.dispose();
		const tex = new CanvasTexture(drawMask(W, H, o));
		tex.minFilter = LinearFilter;
		tex.magFilter = LinearFilter;
		tex.generateMipmaps = false;
		uniforms.uMask.value = tex;
		uniforms.uW.value = W;
		uniforms.uH.value = H;

		camera.aspect = W / H;
		camera.position.z = H / 2 / Math.tan((camera.fov * Math.PI) / 360);
		camera.updateProjectionMatrix();
		renderer.setSize(W, H, false);
	}

	/* ---- input ---- */
	const target = new Vector2(-9999, -9999);
	let over = 0;
	const onMove = (e: PointerEvent) => {
		const r = host.getBoundingClientRect();
		target.set(e.clientX - r.left, e.clientY - r.top);
		over = 1;
	};
	const onLeave = () => {
		over = 0;
	};
	host.addEventListener('pointermove', onMove, { passive: true });
	host.addEventListener('pointerleave', onLeave);

	let visible = true;
	const io = new IntersectionObserver(([en]) => {
		visible = en.isIntersecting;
		if (visible) tick();
	});
	io.observe(host);

	let resizeTimer = 0;
	const ro = new ResizeObserver(() => {
		clearTimeout(resizeTimer);
		resizeTimer = window.setTimeout(build, 120);
	});
	ro.observe(host);

	/* ---- the loop ---- */
	const t0 = performance.now();
	let raf = 0;
	let running = true;
	let lastScroll = -1;
	let frames = 0;
	let slow = 0;
	function tick() {
		cancelAnimationFrame(raf);
		if (!running || !visible || document.hidden || !mesh) return;
		raf = requestAnimationFrame(tick);
		const now = performance.now();
		const t = (now - t0) / 1000;
		uniforms.uTime.value = t;

		/* The ceiling: a device that cannot hold ten frames a second through
		   the first second gets the CSS weave back, not a slideshow. */
		if (frames++ < 30) {
			if (uniforms.uTime.value > 0 && now - lastFrame > 100) slow++;
			if (slow > 8) {
				dispose();
				return;
			}
		}
		lastFrame = now;

		/* the reveal: ease-out over two seconds, once the mask is in */
		const r = Math.min(1, t / 2.2);
		uniforms.uReveal.value = (1 - Math.pow(1 - r, 3)) * 1.15;

		/* the pointer, on a spring */
		uniforms.uMouse.value.lerp(target, 0.12);
		uniforms.uMouseF.value += (over - uniforms.uMouseF.value) * 0.08;

		/* the scroll: the cloth loosens and leans away */
		const s = Math.min(1, Math.max(0, scrollY / Math.max(1, H)));
		if (s !== lastScroll) {
			lastScroll = s;
			uniforms.uScroll.value = s;
			uniforms.uAmp.value = 3 + 22 * s;
			camera.rotation.x = -0.32 * s;
			camera.position.y = -H * 0.12 * s;
			host.style.opacity = String(1 - s * 0.85);
		}

		renderer.render(scene, camera);
		host.dataset.state = 'on';
	}

	const onVis = () => tick();
	document.addEventListener('visibilitychange', onVis);

	let lastFrame = performance.now();
	function dispose() {
		if (!running) return;
		running = false;
		cancelAnimationFrame(raf);
		io.disconnect();
		ro.disconnect();
		host.removeEventListener('pointermove', onMove);
		host.removeEventListener('pointerleave', onLeave);
		document.removeEventListener('visibilitychange', onVis);
		mesh?.geometry.dispose();
		material.dispose();
		uniforms.uMask.value?.dispose();
		renderer.dispose();
		delete host.dataset.state;
	}

	build();
	tick();

	return dispose;
}
