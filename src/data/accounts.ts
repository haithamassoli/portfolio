export const SEGMENTS = ['startup', 'mid-market', 'enterprise'] as const;

export type Segment = (typeof SEGMENTS)[number];

export interface Contact {
	id: string;
	name: string;
	email: string;
}

export interface Account {
	id: string;
	name: string;
	segment: Segment;
	seats: number;
	/** Recurring revenue in USD for the current month. */
	monthlyRevenue: number;
	/** Net revenue retention as a fraction: 1.12 is 112%. */
	retention: number;
	owner: {
		name: string;
		email: string;
	};
	contract: {
		plan: string;
		renewal: {
			date: string;
			autoRenew: boolean;
		};
	};
	contacts: Contact[];
}

export const accounts: readonly Account[] = [
	{
		id: 'acc_northwind',
		name: 'Northwind Labs',
		segment: 'startup',
		seats: 18,
		monthlyRevenue: 1_450,
		retention: 0.94,
		owner: { name: 'Rana Idris', email: 'rana@northwind.example' },
		contract: {
			plan: 'Team',
			renewal: { date: '2026-11-01', autoRenew: true },
		},
		contacts: [
			{ id: 'c_1', name: 'Rana Idris', email: 'rana@northwind.example' },
		],
	},
	{
		id: 'acc_meridian',
		name: 'Meridian Freight',
		segment: 'mid-market',
		seats: 140,
		monthlyRevenue: 9_800,
		retention: 1.08,
		owner: { name: 'Yousef Haddad', email: 'yousef@meridian.example' },
		contract: {
			plan: 'Business',
			renewal: { date: '2027-02-15', autoRenew: true },
		},
		contacts: [
			{ id: 'c_2', name: 'Yousef Haddad', email: 'yousef@meridian.example' },
			{ id: 'c_3', name: 'Dana Okafor', email: 'dana@meridian.example' },
		],
	},
	{
		id: 'acc_calder',
		name: 'Calder Health',
		segment: 'enterprise',
		seats: 620,
		monthlyRevenue: 41_200,
		retention: 1.21,
		owner: { name: 'Priya Nandakumar', email: 'priya@calder.example' },
		contract: {
			plan: 'Enterprise',
			renewal: { date: '2027-06-30', autoRenew: false },
		},
		contacts: [
			{ id: 'c_4', name: 'Priya Nandakumar', email: 'priya@calder.example' },
		],
	},
	{
		id: 'acc_borealis',
		name: 'Borealis Retail',
		segment: 'mid-market',
		seats: 96,
		monthlyRevenue: 6_100,
		retention: 0.87,
		owner: { name: 'Tomas Lindqvist', email: 'tomas@borealis.example' },
		contract: {
			plan: 'Business',
			renewal: { date: '2026-09-20', autoRenew: false },
		},
		contacts: [
			{ id: 'c_5', name: 'Tomas Lindqvist', email: 'tomas@borealis.example' },
		],
	},
	{
		id: 'acc_kestrel',
		name: 'Kestrel Analytics',
		segment: 'startup',
		seats: 34,
		monthlyRevenue: 2_300,
		retention: 1.02,
		owner: { name: 'Amal Farouk', email: 'amal@kestrel.example' },
		contract: {
			plan: 'Team',
			renewal: { date: '2026-12-05', autoRenew: true },
		},
		contacts: [
			{ id: 'c_6', name: 'Amal Farouk', email: 'amal@kestrel.example' },
		],
	},
	{
		id: 'acc_vantage',
		name: 'Vantage Union',
		segment: 'enterprise',
		seats: 410,
		monthlyRevenue: 28_400,
		retention: 0.96,
		owner: { name: 'Grace Whitfield', email: 'grace@vantage.example' },
		contract: {
			plan: 'Enterprise',
			renewal: { date: '2027-04-11', autoRenew: true },
		},
		contacts: [
			{ id: 'c_7', name: 'Grace Whitfield', email: 'grace@vantage.example' },
			{ id: 'c_8', name: 'Ivan Petrov', email: 'ivan@vantage.example' },
		],
	},
];

// ponytail: stands in for the real "is this owner already on another account"
// endpoint. Swap the body for a fetch when the API exists; the debounce,
// abort signal, and error shape at the call site do not change.
const CLAIMED_OWNER_EMAILS = new Set([
	'sam@already-taken.example',
	'ops@already-taken.example',
]);

export function checkOwnerEmailAvailable(
	email: string,
	signal: AbortSignal,
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			resolve(!CLAIMED_OWNER_EMAILS.has(email.trim().toLowerCase()));
		}, 450);
		signal.addEventListener('abort', () => {
			clearTimeout(timer);
			reject(signal.reason);
		});
	});
}
