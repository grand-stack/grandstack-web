import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button, Chip } from "../ui";
import { PublicEditBanner } from "../ui/PublicEditBanner";
import { validateMovie, type Errors, type MovieFormState } from "./model";
import { PersonPicker } from "./PersonPicker";

interface Props {
  heading: string;
  initial: MovieFormState;
  existingGenres: string[];
  submitLabel: string;
  saving: boolean;
  serverError?: string;
  onSubmit: (state: MovieFormState) => void;
  onCancel: () => void;
  extraActions?: ReactNode;
}

export function MovieForm({ heading, initial, existingGenres, submitLabel, saving, serverError, onSubmit, onCancel, extraActions }: Props) {
  const [s, setS] = useState<MovieFormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [newGenre, setNewGenre] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const clearError = (key: string) => setErrors((cur) => { if (!(key in cur)) return cur; const { [key]: _removed, ...rest } = cur; return rest; });
  const set = <K extends keyof MovieFormState>(key: K, value: MovieFormState[K]) => {
    setS((cur) => ({ ...cur, [key]: value }));
    clearError(key === "cast" ? "cast" : key); // editing a field clears its error until the next submit
  };
  const allGenres = [...existingGenres, ...s.genres.filter((g) => !existingGenres.includes(g))];
  const toggleGenre = (g: string) => set("genres", s.genres.includes(g) ? s.genres.filter((x) => x !== g) : [...s.genres, g]);
  const addGenre = () => {
    const g = newGenre.trim();
    if (g && !s.genres.includes(g)) set("genres", [...s.genres, g]);
    setNewGenre("");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateMovie(s);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    onSubmit(s);
  };

  const field = (key: string) => ({ "aria-invalid": errors[key] ? true : undefined, "aria-describedby": errors[key] ? `err-${key}` : undefined });
  const fieldError = (key: string) => errors[key] && <span className="field-error" id={`err-${key}`} role="alert">{errors[key]}</span>;

  return (
    <form className="form form-wide" onSubmit={submit} ref={form} noValidate>
      <h1>{heading}</h1>
      <PublicEditBanner />
      <label>Title
        <input className="text-input" value={s.title} onChange={(e) => set("title", e.target.value)} required {...field("title")} />
        {fieldError("title")}
      </label>
      <label>Tagline
        <input className="text-input" value={s.tagline} onChange={(e) => set("tagline", e.target.value)} />
      </label>
      <div className="form-row">
        <label>Released
          <input className="text-input" inputMode="numeric" value={s.released} onChange={(e) => set("released", e.target.value)} {...field("released")} />
          {fieldError("released")}
        </label>
        <label>Rating (0-10)
          <input className="text-input" inputMode="decimal" value={s.rating} onChange={(e) => set("rating", e.target.value)} {...field("rating")} />
          {fieldError("rating")}
        </label>
        <label>Runtime (minutes)
          <input className="text-input" inputMode="numeric" value={s.runtime} onChange={(e) => set("runtime", e.target.value)} {...field("runtime")} />
          {fieldError("runtime")}
        </label>
      </div>

      <fieldset>
        <legend>Genres</legend>
        <div className="chips">
          {allGenres.map((g) => (
            <Chip key={g} active={s.genres.includes(g)} onClick={() => toggleGenre(g)}>
              {existingGenres.includes(g) ? g : `${g} (new)`}
            </Chip>
          ))}
        </div>
        <div className="inline-add">
          <input
            className="text-input" placeholder="Add a new genre" aria-label="New genre name" value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGenre(); } }}
          />
          <Button type="button" onClick={addGenre} disabled={!newGenre.trim()}>Add genre</Button>
        </div>
      </fieldset>

      <fieldset>
        <legend>Directors</legend>
        <ul className="plain pick-list">
          {s.directors.map((d) => (
            <li key={d.name}>
              <span>{d.name}{d.isNew && <span className="muted"> (new person)</span>}</span>
              <Button type="button" variant="ghost" onClick={() => set("directors", s.directors.filter((x) => x.name !== d.name))} aria-label={`Remove director ${d.name}`}>Remove</Button>
            </li>
          ))}
        </ul>
        <PersonPicker label="Add a director" exclude={s.directors.map((d) => d.name)} onPick={(p) => set("directors", [...s.directors, p])} />
      </fieldset>

      <fieldset>
        <legend>Cast</legend>
        <p className="muted hint">Separate several roles for one person with semicolons.</p>
        <ul className="plain pick-list">
          {s.cast.map((c) => (
            <li key={c.name} className="cast-row">
              <span>{c.name}{c.isNew && <span className="muted"> (new person)</span>}</span>
              <input
                className="text-input" placeholder="Role" aria-label={`Role for ${c.name}`} value={c.role}
                onChange={(e) => set("cast", s.cast.map((x) => (x.name === c.name ? { ...x, role: e.target.value } : x)))}
              />
              <Button type="button" variant="ghost" onClick={() => set("cast", s.cast.filter((x) => x.name !== c.name))} aria-label={`Remove ${c.name} from cast`}>Remove</Button>
            </li>
          ))}
        </ul>
        {fieldError("cast")}
        <PersonPicker label="Add a cast member" exclude={s.cast.map((c) => c.name)} onPick={(p) => set("cast", [...s.cast, { ...p, role: "" }])} />
      </fieldset>

      {serverError && <p className="error" role="alert">{serverError}</p>}
      <div className="form-actions">
        <Button variant="primary" type="submit" disabled={saving}>{saving ? "Saving…" : submitLabel}</Button>
        <Button type="button" onClick={onCancel} disabled={saving}>Cancel</Button>
        {extraActions}
      </div>
    </form>
  );
}
