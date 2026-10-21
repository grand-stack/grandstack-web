import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "../ui";
import { PublicEditBanner } from "../ui/PublicEditBanner";
import { validatePerson, type Errors, type PersonFormState } from "./model";

interface Props {
  heading: string;
  initial: PersonFormState;
  submitLabel: string;
  saving: boolean;
  serverError?: string;
  onSubmit: (state: PersonFormState) => void;
  onCancel: () => void;
  extraActions?: ReactNode;
}

export function PersonForm({ heading, initial, submitLabel, saving, serverError, onSubmit, onCancel, extraActions }: Props) {
  const [s, setS] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const form = useRef<HTMLFormElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validatePerson(s);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    onSubmit(s);
  };

  return (
    <form className="form" onSubmit={submit} ref={form} noValidate>
      <h1>{heading}</h1>
      <PublicEditBanner />
      <label>Name
        <input className="text-input" value={s.name} onChange={(e) => { setS({ ...s, name: e.target.value }); setErrors(({ name: _n, ...rest }) => rest); }} required
          aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "err-name" : undefined} />
        {errors.name && <span className="field-error" id="err-name" role="alert">{errors.name}</span>}
      </label>
      <label>Birth year (optional)
        <input className="text-input" inputMode="numeric" value={s.born} onChange={(e) => { setS({ ...s, born: e.target.value }); setErrors(({ born: _b, ...rest }) => rest); }}
          aria-invalid={errors.born ? true : undefined} aria-describedby={errors.born ? "err-born" : undefined} />
        {errors.born && <span className="field-error" id="err-born" role="alert">{errors.born}</span>}
      </label>
      {serverError && <p className="error" role="alert">{serverError}</p>}
      <div className="form-actions">
        <Button variant="primary" type="submit" disabled={saving}>{saving ? "Saving…" : submitLabel}</Button>
        <Button type="button" onClick={onCancel} disabled={saving}>Cancel</Button>
        {extraActions}
      </div>
    </form>
  );
}
