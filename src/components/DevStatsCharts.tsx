import { Chart } from '@tanstack/charts/react';
import { useMemo } from 'react';
import { hoursBar, reposPerYear } from '../charts/dev-stats';
import type { DevStats } from '../data/dev-stats';

interface Props {
	stats: DevStats;
	/** Pre-translated so the island never has to carry the whole dictionary. */
	labels: {
		hours: string;
		repos: string;
		languagesTitle: string;
		editorsTitle: string;
		yearsTitle: string;
		languagesDesc: string;
		editorsDesc: string;
		yearsDesc: string;
	};
}

/* One bar per row plus breathing room. Fixing the height per row keeps the
   three panels from jumping around as the numbers change between builds. */
const rowHeight = (rows: number) => 44 + rows * 34;

export function DevStatsCharts({ stats, labels }: Props) {
	// One ceiling for both hours charts, rounded here rather than left to each
	// axis, so the two read against the same ruler.
	const maxHours = useMemo(() => {
		const largest = Math.max(
			...stats.languages.map((slice) => slice.hours),
			...stats.editors.map((slice) => slice.hours),
		);
		return Math.ceil(largest / 100) * 100;
	}, [stats.languages, stats.editors]);

	// Both panels sit on one row, so both get the taller one's height.
	const hoursHeight = rowHeight(
		Math.max(stats.languages.length, stats.editors.length),
	);
	const languages = useMemo(
		() => hoursBar(stats.languages, labels.hours, maxHours),
		[stats.languages, labels.hours, maxHours],
	);
	const editors = useMemo(
		() => hoursBar(stats.editors, labels.hours, maxHours),
		[stats.editors, labels.hours, maxHours],
	);
	const years = useMemo(
		() => reposPerYear(stats.years, labels.repos),
		[stats.years, labels.repos],
	);

	/* The captions follow the page direction, the plots do not: the axes are
	   numeric and every category name is Latin, so mirroring them would only
	   put the baseline on the wrong side. */
	return (
		<div className="charts">
			<figure className="panel">
				<figcaption className="mono panel__title">
					{labels.languagesTitle}
				</figcaption>
				<div dir="ltr">
					<Chart
						ariaLabel={labels.languagesTitle}
						ariaDescription={labels.languagesDesc}
						definition={languages}
						height={hoursHeight}
						initialWidth={420}
					/>
				</div>
			</figure>

			<figure className="panel">
				<figcaption className="mono panel__title">
					{labels.editorsTitle}
				</figcaption>
				<div dir="ltr">
					<Chart
						ariaLabel={labels.editorsTitle}
						ariaDescription={labels.editorsDesc}
						definition={editors}
						height={hoursHeight}
						initialWidth={420}
					/>
				</div>
			</figure>

			<figure className="panel panel--wide">
				<figcaption className="mono panel__title">
					{labels.yearsTitle}
				</figcaption>
				<div dir="ltr">
					<Chart
						ariaLabel={labels.yearsTitle}
						ariaDescription={labels.yearsDesc}
						definition={years}
						height={rowHeight(stats.years.length)}
						initialWidth={640}
					/>
				</div>
			</figure>
		</div>
	);
}
