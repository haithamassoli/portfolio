import { Chart } from '@tanstack/charts/react';
import { useMemo } from 'react';
import {
	accountsScatter,
	accountsScatterAriaLabel,
} from '../charts/accounts-scatter';
import type { Account } from '../data/accounts';

interface AccountsScatterProps {
	accounts: readonly Account[];
	/** Receives the whole row, not a projected point, so callers can act on it. */
	onFocusAccount?: (account: Account | null) => void;
}

export function AccountsScatter({
	accounts,
	onFocusAccount,
}: AccountsScatterProps) {
	// The definition captures the rows, so it is rebuilt whenever they change.
	const definition = useMemo(() => accountsScatter(accounts), [accounts]);

	return (
		<Chart
			ariaDescription="Up and to the right is healthier: revenue grows without losing retention. Larger points carry more seats. The table below holds the exact values."
			ariaLabel={accountsScatterAriaLabel(accounts)}
			definition={definition}
			height={380}
			initialWidth={720}
			onFocusChange={(point) => onFocusAccount?.(point?.datum ?? null)}
		/>
	);
}
