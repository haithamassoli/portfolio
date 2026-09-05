/* The webfonts each design asks Google for. One URL per design, because Shell
   and Home both need it and a font list copied into two files drifts into two
   font lists. The main design and Signal serve their own faces from src/assets/fonts.
   ponytail: a plain record, not a config — nothing here is computed. */
import type { DesignId } from './registry';

const family = (families: string) =>
	`https://fonts.googleapis.com/css2?${families}&display=swap`;

export const fonts: Record<Exclude<DesignId, 'main' | 'signal'>, string> = {
	'quiet-room': family(
		'family=Amiri:wght@400;700&family=Geist+Mono:wght@400..500&family=Newsreader:opsz,wght@6..72,300..500&family=Noto+Kufi+Arabic:wght@400',
	),
	shizukesa: family(
		'family=Amiri:wght@400;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=Shippori+Mincho:wght@400;600&family=Zen+Kaku+Gothic+New:wght@400;500',
	),
	'liquid-glass': family(
		'family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,300..800&family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..400&family=Azeret+Mono:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700',
	),
	terminal: family(
		'family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=IBM+Plex+Serif:ital,wght@1,400',
	),
	bento: family(
		'family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400;12..96,75..100,600;12..96,75..100,800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700',
	),
	'night-reel': family(
		'family=Archivo:wdth,wght@62..125,400..800&family=Barlow+Condensed:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..500&family=Cairo:wght@500..900&family=Tajawal:wght@400;500;700&family=Amiri:wght@400;700',
	),
	playroom: family(
		'family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Cairo:wght@400;600;800&family=Lalezar&family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@700',
	),
	'slip-box': family(
		'family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;1,7..72,400&family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Kufi+Arabic:wght@400;700',
	),
	spooler: family(
		'family=IBM+Plex+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@400;500;700',
	),
	blueprint: family(
		'family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..500&family=Barlow:wght@400;500&family=Barlow+Semi+Condensed:wght@500;600&family=Amiri:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans+Arabic:wght@400;500&family=Cairo:wght@500;700',
	),
};
