import { Chart } from '@tanstack/charts/react';
import { useMemo } from 'react';
import {
	LEVEL_COLORS,
	contributionCalendar,
	cumulativeContributions,
	identityColors,
	languageTreemap,
} from '../../charts/dev-stats';
import type { DevStats, Slice } from '../../data/dev-stats';

/* A treemap always ends up with a tile too narrow for its own label, so the
   names live outside it. */
function Key({ slices }: { slices: readonly Slice[] }) {
	return (
		<ul className="mono key key--names" dir="ltr">
			{identityColors(slices.map((slice) => slice.name)).map(
				({ name, color }) => (
					<li key={name}>
						<span
							aria-hidden="true"
							className="key__swatch"
							style={{ background: color }}
						/>
						{name}
					</li>
				),
			)}
		</ul>
	);
}

interface Props {
	stats: DevStats;
	/** Pre-translated so the island never has to carry the whole dictionary. */
	labels: {
		calendar: string;
		cumulative: string;
		languages: string;
		contributions: string;
		hours: string;
		day: string;
		less: string;
		more: string;
		calendarDesc: string;
		cumulativeDesc: string;
		languagesDesc: string;
	};
}

export function DevStatsCharts({ stats, labels }: Props) {
	const calendar = useMemo(
		() => contributionCalendar(stats.days, labels.day),
		[stats.days, labels.day],
	);
	const cumulative = useMemo(
		() => cumulativeContributions(stats.days, labels.contributions),
		[stats.days, labels.contributions],
	);
	const languages = useMemo(
		() => languageTreemap(stats.languages, labels.hours),
		[stats.languages, labels.hours],
	);

	/* The captions follow the page direction, the plots do not: the axes are
	   numeric, the calendar runs oldest to newest, and every category name is
	   Latin. Mirroring them would only put the year on backwards. */
	return (
		<div className="charts">
			<figure className="panel panel--wide">
				<figcaption className="mono panel__title">{labels.calendar}</figcaption>
				{/* Fifty-three columns will not fit a phone. The calendar keeps its
				    square cells and scrolls sideways instead of turning to slivers. */}
				<div className="scroller" dir="ltr">
					<div className="scroller__track">
						<Chart
							ariaLabel={labels.calendar}
							ariaDescription={labels.calendarDesc}
							definition={calendar}
							height={150}
							initialWidth={900}
						/>
					</div>
				</div>
				{/* Five swatches in markup beat a legend mark that would have to be
				    laid out around the calendar. */}
				<p className="mono key" dir="ltr">
					<span>{labels.less}</span>
					{LEVEL_COLORS.map((color, level) => (
						<span
							aria-hidden="true"
							className="key__swatch"
							key={level}
							style={{ background: color }}
						/>
					))}
					<span>{labels.more}</span>
				</p>
			</figure>

			<figure className="panel">
				<figcaption className="mono panel__title">
					{labels.cumulative}
				</figcaption>
				<div dir="ltr">
					<Chart
						ariaLabel={labels.cumulative}
						ariaDescription={labels.cumulativeDesc}
						definition={cumulative}
						height={300}
						initialWidth={420}
					/>
				</div>
			</figure>

			<figure className="panel">
				<figcaption className="mono panel__title">
					{labels.languages}
				</figcaption>
				<div dir="ltr">
					<Chart
						ariaLabel={labels.languages}
						ariaDescription={labels.languagesDesc}
						definition={languages}
						height={300}
						initialWidth={420}
					/>
				</div>
				<Key slices={stats.languages} />
			</figure>
		</div>
	);
}
