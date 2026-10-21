import { useEffect, useId, useState, type KeyboardEvent } from "react";
import { useQuery } from "urql";
import { graphql } from "../graphql/generated";
import { titleVariants } from "../lib/filters";
import type { PersonRef } from "./model";

const PersonSearchQuery = graphql(`
  query PersonSearch($where: PersonWhere) {
    people(where: $where, limit: 8, sort: [{ name: ASC }]) {
      name
    }
  }
`);

interface Props {
  label: string;
  /** Names already chosen, hidden from the suggestions. */
  exclude: string[];
  onPick: (person: PersonRef) => void;
}

/** Typeahead over existing people, with a "create new person" option when the name is not found. */
export function PersonPicker({ label, exclude, onPick }: Props) {
  const id = useId();
  const [text, setText] = useState("");
  const [debounced, setDebounced] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(text.trim()), 200);
    return () => clearTimeout(t);
  }, [text]);

  const ready = debounced.length >= 2 && debounced === text.trim();
  const [{ data }] = useQuery({
    query: PersonSearchQuery,
    variables: { where: { OR: titleVariants(debounced).map((v) => ({ name: { contains: v } })) } },
    pause: debounced.length < 2,
  });

  const existing = (ready ? data?.people ?? [] : []).filter((p) => !exclude.includes(p.name));
  const exact = existing.some((p) => p.name.toLowerCase() === debounced.toLowerCase()) || exclude.some((n) => n.toLowerCase() === debounced.toLowerCase());
  const canCreate = ready && !!data && !exact;
  const options: PersonRef[] = [...existing.map((p) => ({ name: p.name, isNew: false })), ...(canCreate ? [{ name: debounced, isNew: true }] : [])];

  const pick = (o: PersonRef) => { onPick(o); setText(""); setDebounced(""); setActive(0); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, options.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (options[active]) pick(options[active]); }
    else if (e.key === "Escape") { setText(""); setDebounced(""); }
  };

  return (
    <div className="picker">
      <input
        className="text-input" role="combobox" aria-expanded={options.length > 0} aria-controls={`${id}-list`}
        aria-autocomplete="list" aria-label={label} placeholder={label} value={text}
        aria-activedescendant={options.length ? `${id}-${active}` : undefined}
        onChange={(e) => { setText(e.target.value); setActive(0); }} onKeyDown={onKey}
      />
      {options.length > 0 && (
        <ul className="suggest" id={`${id}-list`} role="listbox">
          {options.map((o, i) => (
            <li key={`${o.isNew}-${o.name}`} id={`${id}-${i}`} role="option" aria-selected={i === active}>
              <button type="button" className={i === active ? "active" : ""} onMouseEnter={() => setActive(i)} onClick={() => pick(o)}>
                {o.isNew ? <>Create new person “{o.name}”</> : o.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
