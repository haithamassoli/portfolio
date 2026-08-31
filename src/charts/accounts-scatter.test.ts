import { createChartScene } from '@tanstack/charts';
import { expect, test } from 'vitest';
import { accountsScatter } from './accounts-scatter';
import { accounts, type Account } from '../data/accounts';

const scene = createChartScene(accountsScatter(accounts), {
	width: 800,
	height: 400,
});

interface SceneNodeLike {
	kind: string;
	radius?: number;
	children?: readonly SceneNodeLike[];
	interaction?: { point: { datum: Account } };
}

/**
 * Only the mark's own dots carry a semantic interaction point. The focus ring
 * and the legend swatches reuse `dot` at a constant radius and are skipped.
 */
function accountDots(nodes: readonly unknown[]): [Account, number][] {
	const found: [Account, number][] = [];
	const walk = (children: readonly SceneNodeLike[]) => {
		for (const node of children) {
			if (node.kind === 'dot' && node.interaction) {
				found.push([node.interaction.point.datum, node.radius ?? 0]);
			} else if (node.children) {
				walk(node.children);
			}
		}
	};
	walk(nodes as readonly SceneNodeLike[]);
	return found;
}

test('every account keeps its original row on the point', () => {
	expect(scene.points).toHaveLength(accounts.length);
	for (const [index, point] of scene.points.entries()) {
		expect(point.datum).toBe(accounts[index]);
		expect(point.xValue).toBe(accounts[index].monthlyRevenue);
		expect(point.yValue).toBe(accounts[index].retention);
	}
});

test('seats map to radius through the square-root scale', () => {
	const dots = accountDots(scene.nodes);
	expect(dots).toHaveLength(accounts.length);

	// scaleSqrt().domain([0, maxSeats]).range([5, 26])
	const maxSeats = Math.max(...accounts.map((account) => account.seats));
	for (const [account, radius] of dots) {
		expect(radius).toBeCloseTo(5 + 21 * Math.sqrt(account.seats / maxSeats), 5);
	}

	// Calder has ~34x the seats of Northwind. A linear radius would draw it
	// ~34x wider; the square-root scale keeps the ratio under 6.
	const radii = dots.map(([, radius]) => radius);
	expect(Math.max(...radii) / Math.min(...radii)).toBeLessThan(6);
});
