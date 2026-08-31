import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import '../styles/hire-form.css';
import { useId, useState } from 'react';

type Values = {
	fullName: string;
	email: string;
	phone: string;
	deal: string;
	location: string;
	summary: string;
	budget: string;
	techStack: string[];
};

type Option = { value: string; label: string };

export type HireFormProps = {
	lang: 'en' | 'ar';
	email: string;
	t: Record<string, string>;
	deals: Option[];
	locations: Option[];
	techStack: Option[];
};

const REQUIRED_COUNT = 8;

/** One schema for the whole brief. Messages come from the dictionary so the
 *  Arabic form fails in Arabic. Exported so the unit test can parse without
 *  mounting the form. */
export const hireSchema = (t: Record<string, string>) =>
	z.object({
		fullName: z.string().trim().min(3, t['err.fullName']),
		email: z.email(t['err.email']),
		phone: z
			.string()
			.refine((v) => (v.match(/\d/g) ?? []).length >= 10, t['err.phone']),
		deal: z.string(),
		location: z.string(),
		summary: z.string().trim().min(12, t['err.summary']),
		budget: z.string().trim().min(1, t['err.budget']),
		techStack: z.array(z.string()).min(1, t['err.techStack']),
	});

const filled = (v: Values) =>
	[
		v.fullName.trim(),
		v.email.trim(),
		v.phone.trim(),
		v.deal,
		v.location,
		v.summary.trim(),
		v.budget.trim(),
		v.techStack.length ? 'y' : '',
	].filter(Boolean).length;

export default function HireForm(props: HireFormProps) {
	const { lang, email, t, deals, locations, techStack } = props;
	const [sent, setSent] = useState(false);
	const uid = useId();
	const ar = lang === 'ar';

	const form = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			phone: '',
			deal: 'part',
			location: 'remote',
			summary: '',
			budget: '',
			techStack: [] as string[],
		} satisfies Values,
		// onMount so the empty brief is invalid — the button starts disabled.
		validators: { onMount: hireSchema(t), onChange: hireSchema(t) },
		onSubmit: ({ value }) => {
			const label = (opts: Option[], v: string) =>
				opts.find((o) => o.value === v)?.label ?? v;
			const rows = ar
				? [
						`الاسم: ${value.fullName}`,
						`البريد: ${value.email}`,
						`الهاتف: ${value.phone}`,
						`نوع الارتباط: ${label(deals, value.deal)}`,
						`مكان العمل: ${label(locations, value.location)}`,
						`الميزانية: ${value.budget}`,
						`المطلوب: ${value.techStack.map((v) => label(techStack, v)).join('، ')}`,
						'',
						'عن المشروع:',
						value.summary,
					]
				: [
						`Name: ${value.fullName}`,
						`Email: ${value.email}`,
						`Phone: ${value.phone}`,
						`Arrangement: ${label(deals, value.deal)}`,
						`Location: ${label(locations, value.location)}`,
						`Budget: ${value.budget}`,
						`Needs: ${value.techStack.map((v) => label(techStack, v)).join(', ')}`,
						'',
						'About the project:',
						value.summary,
					];

			const subject = ar
				? `مشروع جديد — ${value.fullName}`
				: `New project — ${value.fullName}`;
			const greeting = ar
				? `مرحبًا هيثم،\n\nأتواصل معك بخصوص مشروع. التفاصيل:\n\n`
				: `Hi Haitham,\n\nI am getting in touch about a project. The details:\n\n`;
			const sign = ar
				? `\n\nبانتظار ردك،\n${value.fullName}`
				: `\n\nLooking forward to hearing from you,\n${value.fullName}`;

			const body = greeting + rows.join('\n') + sign;
			window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
			setSent(true);
		},
	});

	return (
		<form
			className="hire-form"
			noValidate
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			{/* The seam again, this time as a completion meter. */}
			<form.Subscribe selector={(s) => filled(s.values as Values)}>
				{(n) => (
					<div
						className="meter"
						role="progressbar"
						aria-valuenow={n}
						aria-valuemin={0}
						aria-valuemax={REQUIRED_COUNT}
						aria-label={t['hire.title']}
					>
						<span style={{ scale: `${n / REQUIRED_COUNT} 1` }} />
					</div>
				)}
			</form.Subscribe>

			<div className="fields">
				<form.Field name="fullName">
					{(f) => (
						<Text
							field={f}
							id={`${uid}-name`}
							label={t['hire.fullName']}
							autoComplete="name"
						/>
					)}
				</form.Field>

				<div className="pair">
					<form.Field name="email">
						{(f) => (
							<Text
								field={f}
								id={`${uid}-email`}
								label={t['hire.email']}
								type="email"
								autoComplete="email"
								dir="ltr"
							/>
						)}
					</form.Field>

					<form.Field name="phone">
						{(f) => (
							<Text
								field={f}
								id={`${uid}-phone`}
								label={t['hire.phone']}
								type="tel"
								autoComplete="tel"
								dir="ltr"
							/>
						)}
					</form.Field>
				</div>

				<form.Field name="deal">
					{(f) => (
						<Choice
							legend={t['hire.deal']}
							name={`${uid}-deal`}
							options={deals}
							value={f.state.value}
							onChange={f.handleChange}
						/>
					)}
				</form.Field>

				<form.Field name="location">
					{(f) => (
						<Choice
							legend={t['hire.location']}
							name={`${uid}-location`}
							options={locations}
							value={f.state.value}
							onChange={f.handleChange}
						/>
					)}
				</form.Field>

				<form.Field name="techStack">
					{(f) => (
						<fieldset className="group">
							<legend className="label mono">{t['hire.techStack']}</legend>
							<div className="chips">
								{techStack.map((o) => {
									const on = f.state.value.includes(o.value);
									return (
										<label
											key={o.value}
											className={on ? 'chip chip--on' : 'chip'}
										>
											<input
												type="checkbox"
												checked={on}
												onBlur={f.handleBlur}
												onChange={(e) =>
													f.handleChange(
														e.target.checked
															? [...f.state.value, o.value]
															: f.state.value.filter((v) => v !== o.value),
													)
												}
											/>
											<span className="chip__box" aria-hidden="true">
												<svg viewBox="0 0 12 12" width="10" height="10">
													<path
														d="M1.5 6.2 4.4 9l6-7"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											{o.label}
										</label>
									);
								})}
							</div>
							<FieldError field={f} />
						</fieldset>
					)}
				</form.Field>

				<form.Field name="summary">
					{(f) => (
						<Text
							field={f}
							id={`${uid}-summary`}
							label={t['hire.summary']}
							placeholder={t['hire.summaryPlaceholder']}
							multiline
						/>
					)}
				</form.Field>

				<form.Field name="budget">
					{(f) => (
						<Text
							field={f}
							id={`${uid}-budget`}
							label={t['hire.budget']}
							placeholder={t['hire.budgetPlaceholder']}
						/>
					)}
				</form.Field>
			</div>

			<form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
				{([canSubmit, isSubmitting]) => (
					<button
						className="btn submit"
						type="submit"
						disabled={!canSubmit || isSubmitting}
					>
						{isSubmitting ? t['hire.submitting'] : t['hire.submit']}
						<span className="arrow">→</span>
					</button>
				)}
			</form.Subscribe>

			<p className="note mono" aria-live="polite">
				{sent ? t['hire.sent'] : t['hire.note']}
			</p>
		</form>
	);
}

/* ---- field pieces ------------------------------------------------------- */

type AnyField = {
	name: string;
	state: { value: string; meta: { isTouched: boolean; errors: unknown[] } };
	handleChange: (v: string) => void;
	handleBlur: () => void;
};

function firstError(meta: { isTouched: boolean; errors: unknown[] }) {
	if (!meta.isTouched) return null;
	const e = meta.errors.find(Boolean);
	if (!e) return null;
	return typeof e === 'string'
		? e
		: ((e as { message?: string }).message ?? null);
}

function FieldError({
	field,
}: {
	field: { state: { meta: AnyField['state']['meta'] } };
}) {
	const msg = firstError(field.state.meta);
	return (
		<span className="err" role="alert">
			{msg}
		</span>
	);
}

function Text({
	field,
	id,
	label,
	multiline,
	...rest
}: {
	field: AnyField;
	id: string;
	label: string;
	multiline?: boolean;
	type?: string;
	dir?: string;
	placeholder?: string;
	autoComplete?: string;
}) {
	const msg = firstError(field.state.meta);
	const Tag = multiline ? 'textarea' : 'input';
	return (
		<p className={msg ? 'field field--bad' : 'field'}>
			<label className="label mono" htmlFor={id}>
				{label}
			</label>
			<Tag
				id={id}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e: { target: { value: string } }) =>
					field.handleChange(e.target.value)
				}
				aria-invalid={msg ? true : undefined}
				aria-describedby={msg ? `${id}-err` : undefined}
				rows={multiline ? 4 : undefined}
				{...rest}
			/>
			<span className="err" id={`${id}-err`} role="alert">
				{msg}
			</span>
		</p>
	);
}

function Choice({
	legend,
	name,
	options,
	value,
	onChange,
}: {
	legend: string;
	name: string;
	options: Option[];
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<fieldset className="group">
			<legend className="label mono">{legend}</legend>
			<div className="chips">
				{options.map((o) => (
					<label
						key={o.value}
						className={value === o.value ? 'chip chip--on' : 'chip'}
					>
						<input
							type="radio"
							name={name}
							value={o.value}
							checked={value === o.value}
							onChange={() => onChange(o.value)}
						/>
						<span className="chip__dot" aria-hidden="true" />
						{o.label}
					</label>
				))}
			</div>
		</fieldset>
	);
}
