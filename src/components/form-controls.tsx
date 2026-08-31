import type { AnyFieldApi } from '@tanstack/react-form';
import { useId, type ReactNode } from 'react';

/** Validators may return a string or an object with a message; render either. */
function messages(field: AnyFieldApi): string[] {
	return field.state.meta.errors
		.map((error: unknown) => {
			if (typeof error === 'string') return error;
			if (error && typeof error === 'object' && 'message' in error) {
				return String((error as { message: unknown }).message);
			}
			return error == null ? '' : String(error);
		})
		.filter(Boolean);
}

interface ControlIds {
	id: string;
	describedBy: string | undefined;
	invalid: boolean;
}

interface ShellProps {
	field: AnyFieldApi;
	label: string;
	hint?: string;
	children: (ids: ControlIds) => ReactNode;
}

const inputClass =
	'w-full rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-sm text-neutral-900 shadow-sm outline-none focus-visible:border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900/20 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600/20';

/**
 * Owns the label, description, busy state, and error wiring. The control
 * itself stays a render prop so each field keeps its own product markup.
 */
export function FieldShell({ field, label, hint, children }: ShellProps) {
	const id = useId();
	const hintId = `${id}-hint`;
	const errorId = `${id}-error`;
	const errors = messages(field);
	const invalid = field.state.meta.isTouched && errors.length > 0;
	const describedBy =
		[hint ? hintId : null, invalid ? errorId : null]
			.filter(Boolean)
			.join(' ') || undefined;

	return (
		<div className="flex flex-col gap-1">
			<label className="text-xs font-medium text-neutral-700" htmlFor={id}>
				{label}
			</label>
			{children({ id, describedBy, invalid })}
			{hint ? (
				<p className="text-xs text-neutral-500" id={hintId}>
					{hint}
				</p>
			) : null}
			<p aria-live="polite" className="text-xs text-neutral-500">
				{field.state.meta.isValidating
					? `Checking ${label.toLowerCase()}…`
					: ''}
			</p>
			{invalid ? (
				<p className="text-xs text-red-700" id={errorId} role="alert">
					{errors.join('. ')}
				</p>
			) : null}
		</div>
	);
}

interface TextFieldProps {
	field: AnyFieldApi;
	label: string;
	hint?: string;
	type?: 'text' | 'email' | 'date';
	autoComplete?: string;
}

export function TextField({
	field,
	label,
	hint,
	type = 'text',
	autoComplete,
}: TextFieldProps) {
	return (
		<FieldShell field={field} hint={hint} label={label}>
			{({ id, describedBy, invalid }) => (
				<input
					aria-busy={field.state.meta.isValidating || undefined}
					aria-describedby={describedBy}
					aria-invalid={invalid}
					autoComplete={autoComplete}
					className={inputClass}
					id={id}
					name={field.name}
					onBlur={field.handleBlur}
					onChange={(event) => field.handleChange(event.target.value)}
					type={type}
					value={String(field.state.value ?? '')}
				/>
			)}
		</FieldShell>
	);
}

interface NumberFieldProps {
	field: AnyFieldApi;
	label: string;
	hint?: string;
	min?: number;
	step?: number;
	prefix?: string;
}

export function NumberField({
	field,
	label,
	hint,
	min = 0,
	step = 1,
	prefix,
}: NumberFieldProps) {
	return (
		<FieldShell field={field} hint={hint} label={label}>
			{({ id, describedBy, invalid }) => (
				<div className="relative">
					{prefix ? (
						<span
							aria-hidden="true"
							className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-sm text-neutral-500"
						>
							{prefix}
						</span>
					) : null}
					<input
						aria-describedby={describedBy}
						aria-invalid={invalid}
						className={prefix ? `${inputClass} pl-6` : inputClass}
						id={id}
						inputMode="numeric"
						min={min}
						name={field.name}
						onBlur={field.handleBlur}
						onChange={(event) =>
							field.handleChange(
								event.target.value === '' ? 0 : event.target.valueAsNumber,
							)
						}
						step={step}
						type="number"
						value={Number(field.state.value ?? 0)}
					/>
				</div>
			)}
		</FieldShell>
	);
}

/**
 * Retention is stored as a fraction because that is what the chart scale
 * consumes, but nobody types "1.12" for 112 percent.
 */
export function PercentField({
	field,
	label,
	hint,
}: Pick<NumberFieldProps, 'field' | 'label' | 'hint'>) {
	const asPercent = Math.round(Number(field.state.value ?? 0) * 1000) / 10;

	return (
		<FieldShell field={field} hint={hint} label={label}>
			{({ id, describedBy, invalid }) => (
				<div className="relative">
					<input
						aria-describedby={describedBy}
						aria-invalid={invalid}
						className={`${inputClass} pr-7`}
						id={id}
						inputMode="decimal"
						min={0}
						name={field.name}
						onBlur={field.handleBlur}
						onChange={(event) =>
							field.handleChange(
								event.target.value === ''
									? 0
									: event.target.valueAsNumber / 100,
							)
						}
						step={0.1}
						type="number"
						value={asPercent}
					/>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-sm text-neutral-500"
					>
						%
					</span>
				</div>
			)}
		</FieldShell>
	);
}

interface SelectFieldProps {
	field: AnyFieldApi;
	label: string;
	hint?: string;
	options: readonly { value: string; label: string }[];
}

export function SelectField({ field, label, hint, options }: SelectFieldProps) {
	return (
		<FieldShell field={field} hint={hint} label={label}>
			{({ id, describedBy, invalid }) => (
				<select
					aria-describedby={describedBy}
					aria-invalid={invalid}
					className={inputClass}
					id={id}
					name={field.name}
					onBlur={field.handleBlur}
					onChange={(event) => field.handleChange(event.target.value)}
					value={String(field.state.value ?? '')}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			)}
		</FieldShell>
	);
}

export function CheckboxField({
	field,
	label,
	hint,
}: Pick<TextFieldProps, 'field' | 'label' | 'hint'>) {
	const id = useId();
	const hintId = `${id}-hint`;

	return (
		<div className="flex items-start gap-2 pt-5">
			<input
				aria-describedby={hint ? hintId : undefined}
				checked={Boolean(field.state.value)}
				className="mt-0.5 size-4 rounded border-neutral-300"
				id={id}
				name={field.name}
				onBlur={field.handleBlur}
				onChange={(event) => field.handleChange(event.target.checked)}
				type="checkbox"
			/>
			<div className="flex flex-col gap-0.5">
				<label className="text-xs font-medium text-neutral-700" htmlFor={id}>
					{label}
				</label>
				{hint ? (
					<p className="text-xs text-neutral-500" id={hintId}>
						{hint}
					</p>
				) : null}
			</div>
		</div>
	);
}
