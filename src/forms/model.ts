import type { MovieCreateInput, MovieUpdateInput } from "../graphql/generated/graphql";

export interface PersonRef {
  name: string;
  /** True when the person does not exist yet and must be created with the movie. */
  isNew: boolean;
}

export interface CastRow extends PersonRef {
  /** Roles separated by semicolons, for example "Zachry; Dr. Henry Goose". */
  role: string;
}

export interface MovieFormState {
  title: string;
  tagline: string;
  released: string;
  rating: string;
  runtime: string;
  genres: string[];
  directors: PersonRef[];
  cast: CastRow[];
}

export const emptyMovieForm: MovieFormState = {
  title: "", tagline: "", released: "", rating: "", runtime: "", genres: [], directors: [], cast: [],
};

export interface PersonFormState {
  name: string;
  born: string;
}

export const emptyPersonForm: PersonFormState = { name: "", born: "" };

export function parseRoles(role: string): string[] {
  return role.split(";").map((r) => r.trim()).filter(Boolean);
}

export const joinRoles = (roles: string[]): string => roles.join("; ");

// ---- validation ----

export type Errors = Record<string, string>;

function checkNumber(value: string, label: string, opts: { min: number; max: number; integer?: boolean }): string | undefined {
  if (value.trim() === "") return undefined;
  const n = Number(value);
  if (!Number.isFinite(n)) return `${label} must be a number`;
  if (opts.integer && !Number.isInteger(n)) return `${label} must be a whole number`;
  if (n < opts.min || n > opts.max) return `${label} must be between ${opts.min} and ${opts.max}`;
  return undefined;
}

export function validateMovie(s: MovieFormState): Errors {
  const errors: Errors = {};
  if (!s.title.trim()) errors.title = "Title is required";
  const released = checkNumber(s.released, "Year", { min: 1888, max: 2100, integer: true });
  if (released) errors.released = released;
  const rating = checkNumber(s.rating, "Rating", { min: 0, max: 10 });
  if (rating) errors.rating = rating;
  const runtime = checkNumber(s.runtime, "Runtime", { min: 1, max: 1000, integer: true });
  if (runtime) errors.runtime = runtime;
  const names = s.cast.map((c) => c.name);
  if (new Set(names).size !== names.length) errors.cast = "Each person can appear once in the cast";
  return errors;
}

export function validatePerson(s: PersonFormState): Errors {
  const errors: Errors = {};
  if (!s.name.trim()) errors.name = "Name is required";
  const born = checkNumber(s.born, "Birth year", { min: 1800, max: 2100, integer: true });
  if (born) errors.born = born;
  return errors;
}

// ---- mutation inputs ----

const byName = (name: string) => ({ where: { node: { name: { eq: name } } } });
const inNames = (names: string[]) => ({ where: { node: { name: { in: names } } } });
const num = (v: string): number | undefined => (v.trim() === "" ? undefined : Number(v));
const clean = <T extends Record<string, unknown>>(o: T): T =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;

/** Input for createMovies. Existing people and genres are connected, new ones are created. */
export function buildCreateInput(s: MovieFormState, existingGenres: string[]): MovieCreateInput {
  const known = new Set(existingGenres);
  const newGenres = s.genres.filter((g) => !known.has(g));
  const oldGenres = s.genres.filter((g) => known.has(g));
  const people = (list: PersonRef[]) => clean({
    connect: list.some((p) => !p.isNew) ? list.filter((p) => !p.isNew).map((p) => byName(p.name)) : undefined,
    create: list.some((p) => p.isNew) ? list.filter((p) => p.isNew).map((p) => ({ node: { name: p.name } })) : undefined,
  });
  const cast = s.cast;
  return clean({
    title: s.title.trim(),
    tagline: s.tagline.trim() || undefined,
    released: num(s.released),
    rating: num(s.rating),
    runtime: num(s.runtime),
    genres: s.genres.length ? clean({
      connect: oldGenres.length ? oldGenres.map(byName) : undefined,
      create: newGenres.length ? newGenres.map((name) => ({ node: { name } })) : undefined,
    }) : undefined,
    directors: s.directors.length ? people(s.directors) : undefined,
    actors: cast.length ? clean({
      connect: cast.some((c) => !c.isNew)
        ? cast.filter((c) => !c.isNew).map((c) => ({ ...byName(c.name), edge: { roles: parseRoles(c.role) } }))
        : undefined,
      create: cast.some((c) => c.isNew)
        ? cast.filter((c) => c.isNew).map((c) => ({ node: { name: c.name }, edge: { roles: parseRoles(c.role) } }))
        : undefined,
    }) : undefined,
  }) as MovieCreateInput;
}

const diff = (before: string[], after: string[]) => ({
  removed: before.filter((x) => !after.includes(x)),
  added: after.filter((x) => !before.includes(x)),
});

/**
 * Input for updateMovies as a diff between the loaded and edited form. Relationship changes are sent as
 * disconnect, connect/create and per-person edge updates in one mutation, never as "disconnect all, reconnect"
 * (the disconnect runs last in v7 and would remove the new links).
 */
export function buildUpdateInput(before: MovieFormState, after: MovieFormState, existingGenres: string[]): MovieUpdateInput {
  const update: Record<string, unknown> = {};
  const scalar = (key: "title" | "tagline" | "released" | "rating" | "runtime", from: string, to: string, parse: (v: string) => unknown) => {
    if (from.trim() !== to.trim()) update[key] = { set: to.trim() === "" ? null : parse(to.trim()) };
  };
  scalar("title", before.title, after.title, (v) => v);
  scalar("tagline", before.tagline, after.tagline, (v) => v);
  scalar("released", before.released, after.released, Number);
  scalar("rating", before.rating, after.rating, Number);
  scalar("runtime", before.runtime, after.runtime, Number);

  const known = new Set(existingGenres);
  const g = diff(before.genres, after.genres);
  if (g.removed.length || g.added.length) {
    update.genres = [clean({
      disconnect: g.removed.length ? [inNames(g.removed)] : undefined,
      connect: g.added.filter((n) => known.has(n)).length ? g.added.filter((n) => known.has(n)).map(byName) : undefined,
      create: g.added.filter((n) => !known.has(n)).length ? g.added.filter((n) => !known.has(n)).map((name) => ({ node: { name } })) : undefined,
    })];
  }

  const d = diff(before.directors.map((p) => p.name), after.directors.map((p) => p.name));
  if (d.removed.length || d.added.length) {
    const added = after.directors.filter((p) => d.added.includes(p.name));
    update.directors = [clean({
      disconnect: d.removed.length ? [inNames(d.removed)] : undefined,
      connect: added.some((p) => !p.isNew) ? added.filter((p) => !p.isNew).map((p) => byName(p.name)) : undefined,
      create: added.some((p) => p.isNew) ? added.filter((p) => p.isNew).map((p) => ({ node: { name: p.name } })) : undefined,
    })];
  }

  const a = diff(before.cast.map((c) => c.name), after.cast.map((c) => c.name));
  const added = after.cast.filter((c) => a.added.includes(c.name));
  const roleChanges = after.cast.filter((c) => {
    const old = before.cast.find((b) => b.name === c.name);
    return old && JSON.stringify(parseRoles(old.role)) !== JSON.stringify(parseRoles(c.role));
  });
  if (a.removed.length || added.length || roleChanges.length) {
    const entries: Record<string, unknown>[] = [];
    if (a.removed.length || added.length) {
      entries.push(clean({
        disconnect: a.removed.length ? [inNames(a.removed)] : undefined,
        connect: added.some((c) => !c.isNew)
          ? added.filter((c) => !c.isNew).map((c) => ({ ...byName(c.name), edge: { roles: parseRoles(c.role) } }))
          : undefined,
        create: added.some((c) => c.isNew)
          ? added.filter((c) => c.isNew).map((c) => ({ node: { name: c.name }, edge: { roles: parseRoles(c.role) } }))
          : undefined,
      }));
    }
    roleChanges.forEach((c) => entries.push({ update: { ...byName(c.name), edge: { roles: { set: parseRoles(c.role) } } } }));
    update.actors = entries;
  }
  return update as MovieUpdateInput;
}

export const isEmptyUpdate = (u: object): boolean => Object.keys(u).length === 0;

/** Maps a GraphQL error to a message a person can act on. */
export function friendlyError(message: string, subject: string): string {
  if (message.includes("Constraint validation failed")) {
    return `${subject} already exists. Names and titles must be unique.`;
  }
  if (message.toLowerCase().includes("failed to fetch") || message.toLowerCase().includes("network")) {
    return "Could not reach the server. Check that it is running and try again.";
  }
  return message.replace(/^\[GraphQL\]\s*/, "").replace(/^\[Network\]\s*/, "");
}
