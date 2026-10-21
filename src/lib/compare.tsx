import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const MAX_COMPARE = 4;
const KEY = "grandstack.compare";

interface CompareState {
  titles: string[];
  has: (title: string) => boolean;
  toggle: (title: string) => void;
  remove: (title: string) => void;
  clear: () => void;
  full: boolean;
}

const Ctx = createContext<CompareState | null>(null);

function load(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((t) => typeof t === "string").slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [titles, setTitles] = useState<string[]>(load);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(titles)); } catch { /* storage unavailable */ }
  }, [titles]);

  const toggle = useCallback((t: string) => {
    setTitles((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : cur.length >= MAX_COMPARE ? cur : [...cur, t]));
  }, []);
  const value = useMemo<CompareState>(
    () => ({
      titles,
      has: (t) => titles.includes(t),
      toggle,
      remove: (t) => setTitles((cur) => cur.filter((x) => x !== t)),
      clear: () => setTitles([]),
      full: titles.length >= MAX_COMPARE,
    }),
    [titles, toggle],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCompare(): CompareState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCompare must be used inside CompareProvider");
  return v;
}
