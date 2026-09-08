// The element owns its listeners, including when Astro swaps the page.
class OrbitMotion extends HTMLElement {
	private cleanup?: () => void;

	connectedCallback() {
		const controller = new AbortController();
		const { signal } = controller;
		const reduce = matchMedia('(prefers-reduced-motion: reduce)');
		const button = this.querySelector<HTMLButtonElement>('[data-pause]')!;
		const sculpture = this.querySelector<HTMLElement>('[data-sculpture]');
		const angle = this.querySelector<HTMLInputElement>('#orbit-angle');
		let paused = reduce.matches;
		const sync = () => {
			this.toggleAttribute('data-paused', paused || reduce.matches);
			button.setAttribute('aria-pressed', String(paused || reduce.matches));
			button.textContent = (
				reduce.matches
					? button.dataset.reduced
					: paused
						? button.dataset.play
						: button.dataset.stop
			)!;
			button.disabled = reduce.matches;
			if (paused || reduce.matches) sculpture?.style.removeProperty('--tilt');
		};
		this.querySelectorAll<HTMLElement>('[data-motion-controls]').forEach(
			(el) => (el.hidden = false),
		);
		button.addEventListener(
			'click',
			() => {
				paused = !paused;
				sync();
			},
			{ signal },
		);
		reduce.addEventListener(
			'change',
			() => {
				paused = reduce.matches;
				sync();
			},
			{ signal },
		);
		angle?.addEventListener(
			'input',
			() => {
				sculpture?.style.setProperty('--angle', `${angle.value}deg`);
				this.querySelector('output')!.value = `${angle.value}°`;
			},
			{ signal },
		);
		sculpture?.addEventListener(
			'pointermove',
			(event) => {
				if (paused || reduce.matches || event.pointerType !== 'mouse') return;
				const box = sculpture.getBoundingClientRect();
				const x = (event.clientX - box.left) / box.width - 0.5;
				const y = (event.clientY - box.top) / box.height - 0.5;
				sculpture.style.setProperty(
					'--tilt',
					`rotateX(${-y * 22}deg) rotateY(${x * 22}deg)`,
				);
			},
			{ signal },
		);
		sculpture?.addEventListener(
			'pointerleave',
			() => sculpture.style.removeProperty('--tilt'),
			{ signal },
		);
		sync();
		this.cleanup = () => controller.abort();
	}

	disconnectedCallback() {
		this.cleanup?.();
	}
}

if (!customElements.get('orbit-motion'))
	customElements.define('orbit-motion', OrbitMotion);
