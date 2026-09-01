import { useForm } from '@tanstack/react-form';
import { useMemo, useState } from 'react';
import {
	SEGMENTS,
	accounts as seedAccounts,
	checkOwnerEmailAvailable,
	type Account,
} from '../data/accounts';
import { AccountsScatter } from './AccountsScatter';
import {
	CheckboxField,
	NumberField,
	PercentField,
	SelectField,
	TextField,
} from './form-controls';

const SEGMENT_LABELS: Record<Account['segment'], string> = {
	startup: 'Startup',
	'mid-market': 'Mid-market',
	enterprise: 'Enterprise',
};

const segmentOptions = SEGMENTS.map((segment) => ({
	value: segment,
	label: SEGMENT_LABELS[segment],
}));

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const usd = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0,
});

function blankAccount(): Account {
	return {
		id: `acc_${crypto.randomUUID()}`,
		name: '',
		segment: 'startup',
		seats: 1,
		monthlyRevenue: 0,
		retention: 1,
		owner: { name: '', email: '' },
		contract: {
			plan: 'Team',
			renewal: { date: '', autoRenew: true },
		},
		contacts: [],
	};
}

interface AccountsFormProps {
	initialAccounts?: readonly Account[];
}

export function AccountsForm({
	initialAccounts = seedAccounts,
}: AccountsFormProps) {
	const [focused, setFocused] = useState<Account | null>(null);
	const [savedAt, setSavedAt] = useState<string | null>(null);

	const defaultValues = useMemo(
		() => ({
			accounts: initialAccounts.map((account) => structuredClone(account)),
		}),
		[initialAccounts],
	);

	const form = useForm({
		defaultValues,
		validators: {
			onChange: ({ value }) =>
				value.accounts.length === 0 ? 'Keep at least one account.' : undefined,
		},
		onSubmit: async ({ value }) => {
			// ponytail: no accounts API yet. Replace with the real call; the
			// validation and submit states above do not change.
			await new Promise((resolve) => setTimeout(resolve, 400));
			setSavedAt(
				`Saved ${value.accounts.length} accounts at ${new Date().toLocaleTimeString()}`,
			);
		},
	});

	return (
		<div className="flex flex-col gap-8">
			<section
				aria-labelledby="portfolio-heading"
				className="flex flex-col gap-3"
			>
				<div className="flex flex-wrap items-baseline justify-between gap-2">
					<h2
						className="text-lg font-semibold text-neutral-900"
						id="portfolio-heading"
					>
						Revenue and retention
					</h2>
					{/*
					  Selectors are compared by reference, so each subscription
					  returns a primitive and re-renders on its own value alone.
					*/}
					<form.Subscribe
						selector={(state) =>
							state.values.accounts.reduce(
								(total, account) => total + account.monthlyRevenue,
								0,
							)
						}
					>
						{(totalRevenue) => (
							<p className="font-mono text-sm text-neutral-600">
								{usd.format(totalRevenue)} / month
							</p>
						)}
					</form.Subscribe>
				</div>

				<form.Subscribe selector={(state) => state.values.accounts}>
					{(rows) => (
						<AccountsScatter accounts={rows} onFocusAccount={setFocused} />
					)}
				</form.Subscribe>

				<p aria-live="polite" className="min-h-5 text-sm text-neutral-600">
					{focused
						? `${focused.name}: ${usd.format(focused.monthlyRevenue)} monthly revenue, ${Math.round(focused.retention * 100)}% net retention, ${focused.seats} seats, ${SEGMENT_LABELS[focused.segment]}.`
						: ''}
				</p>
			</section>

			<form
				className="flex flex-col gap-6"
				noValidate
				onSubmit={(event) => {
					event.preventDefault();
					void form.handleSubmit();
				}}
			>
				<form.Field mode="array" name="accounts">
					{(accountsField) => (
						<>
							<div className="flex flex-col gap-5">
								{accountsField.state.value.map((account, index) => (
									<fieldset
										className="rounded-lg border border-neutral-200 bg-white p-4"
										key={account.id}
									>
										<legend className="px-1 text-sm font-semibold text-neutral-900">
											{account.name || 'New account'}
										</legend>

										<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
											<form.Field
												name={`accounts[${index}].name`}
												validators={{
													onChange: ({ value }) =>
														value.trim() ? undefined : 'Enter an account name.',
												}}
											>
												{(field) => (
													<TextField field={field} label="Account name" />
												)}
											</form.Field>

											<form.Field name={`accounts[${index}].segment`}>
												{(field) => (
													<SelectField
														field={field}
														label="Segment"
														options={segmentOptions}
													/>
												)}
											</form.Field>

											<form.Field
												name={`accounts[${index}].seats`}
												validators={{
													onChange: ({ value }) =>
														Number.isInteger(value) && value >= 1
															? undefined
															: 'Enter a whole number of 1 or more.',
												}}
											>
												{(field) => (
													<NumberField
														field={field}
														hint="Sets the chart point size."
														label="Seats"
														min={1}
													/>
												)}
											</form.Field>

											<form.Field
												name={`accounts[${index}].monthlyRevenue`}
												validators={{
													onChange: ({ value }) =>
														value >= 0
															? undefined
															: 'Monthly revenue cannot be negative.',
												}}
											>
												{(field) => (
													<NumberField
														field={field}
														label="Monthly revenue"
														prefix="$"
														step={50}
													/>
												)}
											</form.Field>

											<form.Field
												name={`accounts[${index}].retention`}
												validators={{
													onChange: ({ value }) =>
														value > 0 && value <= 3
															? undefined
															: 'Net retention must fall between 1% and 300%.',
												}}
											>
												{(field) => (
													<PercentField
														field={field}
														hint="Revenue retained over the last 12 months."
														label="Net retention"
													/>
												)}
											</form.Field>

											<form.Field name={`accounts[${index}].contract.plan`}>
												{(field) => <TextField field={field} label="Plan" />}
											</form.Field>

											<form.Field
												name={`accounts[${index}].owner.name`}
												validators={{
													onChange: ({ value }) =>
														value.trim()
															? undefined
															: "Enter the account owner's name.",
												}}
											>
												{(field) => (
													<TextField
														autoComplete="off"
														field={field}
														label="Owner"
													/>
												)}
											</form.Field>

											<form.Field
												name={`accounts[${index}].owner.email`}
												validators={{
													onChange: ({ value, fieldApi }) => {
														if (!EMAIL.test(value)) {
															return 'Enter a valid email address.';
														}
														const duplicate =
															fieldApi.form.state.values.accounts.some(
																(other, otherIndex) =>
																	otherIndex !== index &&
																	other.owner.email.trim().toLowerCase() ===
																		value.trim().toLowerCase(),
															);
														return duplicate
															? 'Another account in this portfolio already has that owner.'
															: undefined;
													},
													onChangeAsyncDebounceMs: 400,
													onChangeAsync: async ({ value, signal }) => {
														const available = await checkOwnerEmailAvailable(
															value,
															signal,
														);
														return available
															? undefined
															: 'That owner already manages an account elsewhere.';
													},
												}}
											>
												{(field) => (
													<TextField
														autoComplete="off"
														field={field}
														hint="We check the directory as you type."
														label="Owner email"
														type="email"
													/>
												)}
											</form.Field>

											<form.Field
												name={`accounts[${index}].contract.renewal.date`}
												validators={{
													onChange: ({ value }) =>
														value && !Number.isNaN(Date.parse(value))
															? undefined
															: 'Pick a renewal date.',
												}}
											>
												{(field) => (
													<TextField
														field={field}
														label="Renews on"
														type="date"
													/>
												)}
											</form.Field>

											<form.Field
												name={`accounts[${index}].contract.renewal.autoRenew`}
											>
												{(field) => (
													<CheckboxField
														field={field}
														hint="Renew this contract without a new order form."
														label="Auto-renew"
													/>
												)}
											</form.Field>
										</div>

										<form.Field
											mode="array"
											name={`accounts[${index}].contacts`}
										>
											{(contactsField) => (
												<div className="mt-4 flex flex-col gap-3 border-t border-neutral-200 pt-4">
													<div className="flex items-center justify-between gap-2">
														<h3 className="text-xs font-semibold tracking-wide text-neutral-700 uppercase">
															Contacts
														</h3>
														<button
															className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
															onClick={() =>
																contactsField.pushValue({
																	id: `c_${crypto.randomUUID()}`,
																	name: '',
																	email: '',
																})
															}
															type="button"
														>
															Add contact
														</button>
													</div>

													{contactsField.state.value.length === 0 ? (
														<p className="text-xs text-neutral-500">
															No contacts yet.
														</p>
													) : null}

													{contactsField.state.value.map(
														(contact, contactIndex) => (
															<div
																className="grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]"
																key={contact.id}
															>
																<form.Field
																	name={`accounts[${index}].contacts[${contactIndex}].name`}
																	validators={{
																		onChange: ({ value }) =>
																			value.trim()
																				? undefined
																				: 'Name this contact.',
																	}}
																>
																	{(field) => (
																		<TextField field={field} label="Name" />
																	)}
																</form.Field>

																<form.Field
																	name={`accounts[${index}].contacts[${contactIndex}].email`}
																	validators={{
																		onChange: ({ value }) =>
																			EMAIL.test(value)
																				? undefined
																				: 'Enter a valid email address.',
																	}}
																>
																	{(field) => (
																		<TextField
																			field={field}
																			label="Email"
																			type="email"
																		/>
																	)}
																</form.Field>

																<button
																	className="mb-1 rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
																	onClick={() =>
																		contactsField.removeValue(contactIndex)
																	}
																	type="button"
																>
																	Remove
																	<span className="sr-only">
																		{` contact ${contact.name || contactIndex + 1}`}
																	</span>
																</button>
															</div>
														),
													)}
												</div>
											)}
										</form.Field>

										<div className="mt-4 flex justify-end">
											<button
												className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
												onClick={() => accountsField.removeValue(index)}
												type="button"
											>
												Remove account
												<span className="sr-only">
													{` ${account.name || index + 1}`}
												</span>
											</button>
										</div>
									</fieldset>
								))}
							</div>

							<button
								className="self-start rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
								onClick={() => accountsField.pushValue(blankAccount())}
								type="button"
							>
								Add account
							</button>
						</>
					)}
				</form.Field>

				<div className="flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-4">
					<form.Subscribe selector={(state) => state.canSubmit}>
						{(canSubmit) => (
							<form.Subscribe selector={(state) => state.isSubmitting}>
								{(isSubmitting) => (
									<button
										className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
										disabled={!canSubmit || isSubmitting}
										type="submit"
									>
										{isSubmitting ? 'Saving…' : 'Save portfolio'}
									</button>
								)}
							</form.Subscribe>
						)}
					</form.Subscribe>

					<form.Subscribe selector={(state) => state.isDirty}>
						{(isDirty) => (
							<button
								className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-800 disabled:opacity-50"
								disabled={!isDirty}
								onClick={() => form.reset()}
								type="button"
							>
								Reset
							</button>
						)}
					</form.Subscribe>

					<p aria-live="polite" className="text-sm text-neutral-600">
						{savedAt ?? ''}
					</p>
				</div>
			</form>
		</div>
	);
}
