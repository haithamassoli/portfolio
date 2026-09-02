export const styles = [
	{ id: 1, name: 'Quiet Room', note: 'Minimal, generous space, light/dark' },
	{
		id: 2,
		name: '静けさ Shizukesa',
		note: 'Japanese, vertical type, sumi ink',
	},
	{ id: 3, name: 'Liquid Glass', note: 'Refractive glass, depth, blur' },
	{
		id: 4,
		name: 'Terminal',
		note: 'Phosphor console, monospace, keyboard-first',
	},
	{ id: 5, name: 'Bento', note: 'Modular dashboard cards, live figures' },
	{ id: 6, name: 'Night Reel', note: 'Cinematic dark, spotlight, film grain' },
	{ id: 7, name: 'Playroom', note: 'Kinetic colour, springy, tactile' },
	{
		id: 8,
		name: 'Ink & Bone',
		note: 'The original bilingual seam, indigo and signal orange',
	},
] as const;

export const styleIds: readonly number[] = styles.map(({ id }) => id);
