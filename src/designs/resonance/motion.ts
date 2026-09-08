class ResonanceMotion extends HTMLElement {
	private cleanup?: () => void;
	connectedCallback() {
		const controller = new AbortController();
		const { signal } = controller;
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		const button = this.querySelector<HTMLButtonElement>('[data-pause]')!;
		const sculpture = this.querySelector<HTMLElement>('.sculpture');
		let paused = false;
		const sync = () => {
			const still = paused || reduced.matches;
			this.toggleAttribute('data-still', still);
			button.setAttribute('aria-pressed', String(still));
			button.textContent = (
				reduced.matches
					? button.dataset.reduced
					: paused
						? button.dataset.play
						: button.dataset.stop
			)!;
			button.disabled = reduced.matches;
			if (still) sculpture?.style.removeProperty('--tilt');
		};
		this.querySelectorAll<HTMLElement>('[data-controls]').forEach(
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
		reduced.addEventListener('change', sync, { signal });
		this.querySelectorAll<HTMLButtonElement>('[data-shape]').forEach(
			(control) => {
				control.addEventListener(
					'click',
					() => {
						if (!sculpture) return;
						sculpture.dataset.form = control.dataset.shape;
						this.querySelectorAll('[data-shape]').forEach((el) =>
							el.setAttribute('aria-pressed', String(el === control)),
						);
					},
					{ signal },
				);
			},
		);
		sculpture?.addEventListener(
			'pointermove',
			(event) => {
				if (paused || reduced.matches || event.pointerType !== 'mouse') return;
				const rect = sculpture.getBoundingClientRect();
				sculpture.style.setProperty(
					'--tilt',
					`rotateX(${((event.clientY - rect.top) / rect.height - 0.5) * -18}deg) rotateY(${((event.clientX - rect.left) / rect.width - 0.5) * 22}deg)`,
				);
			},
			{ signal },
		);
		sculpture?.addEventListener(
			'pointerleave',
			() => sculpture.style.removeProperty('--tilt'),
			{ signal },
		);
		const visibility = new IntersectionObserver((entries) =>
			entries.forEach((entry) =>
				entry.target.toggleAttribute('data-outside', !entry.isIntersecting),
			),
		);
		if (sculpture) visibility.observe(sculpture);
		sync();
		this.cleanup = () => {
			controller.abort();
			visibility.disconnect();
		};
	}
	disconnectedCallback() {
		this.cleanup?.();
	}
}
if (!customElements.get('resonance-motion'))
	customElements.define('resonance-motion', ResonanceMotion);
