// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { useEffect, useState, type FormEvent } from "react";
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { CompareProvider, MAX_COMPARE, useCompare } from "./lib/compare";
import { Compare } from "./pages/Compare";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { MovieEdit } from "./pages/MovieEdit";
import { MovieNew } from "./pages/MovieNew";
import { People } from "./pages/People";
import { PersonDetail } from "./pages/PersonDetail";
import { PersonEdit } from "./pages/PersonEdit";
import { PersonNew } from "./pages/PersonNew";
import { Results } from "./pages/Results";
import { Button } from "./ui";

type Theme = "dark" | "light";

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try { return localStorage.getItem("grandstack.theme") === "light" ? "light" : "dark"; } catch { return "dark"; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("grandstack.theme", theme); } catch { /* storage unavailable */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function Header({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) {
  const navigate = useNavigate();
  const compare = useCompare();
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(q.trim() ? `/movies?q=${encodeURIComponent(q.trim())}` : "/movies");
    setQ("");
  };
  return (
    <header className="site-header">
      <Link to="/" className="brand"><span className="brand-mark" aria-hidden="true" />GRANDstack <strong>Movies</strong></Link>
      <form className="header-search" onSubmit={submit} role="search">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search movies…" aria-label="Search movies" />
      </form>
      <nav aria-label="Main">
        <NavLink to="/movies">Browse</NavLink>
        <NavLink to="/people">People</NavLink>
        <NavLink to="/compare">Compare{compare.titles.length > 0 && <span className="badge">{compare.titles.length}</span>}</NavLink>
        <AddMenu />
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </nav>
    </header>
  );
}

function AddMenu() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <div className="menu" onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}>
      <button type="button" className="menu-button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>Add ▾</button>
      {open && (
        <div className="menu-list" role="menu">
          <Link to="/movies/new" role="menuitem">Add movie</Link>
          <Link to="/people/new" role="menuitem">Add person</Link>
        </div>
      )}
    </div>
  );
}

function CompareTray() {
  const compare = useCompare();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // The tray would cover form buttons, so keep it off the compare and edit screens
  const show = compare.titles.length > 0 && pathname !== "/compare" && !/\/(new|edit)$/.test(pathname);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="tray" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} role="region" aria-label="Comparison tray">
          <span>{compare.titles.length} of {MAX_COMPARE} selected: {compare.titles.join(", ")}</span>
          <div>
            <Button variant="ghost" onClick={compare.clear}>Clear</Button>
            <Button variant="primary" disabled={compare.titles.length < 2} onClick={() => navigate("/compare")}>
              {compare.titles.length < 2 ? "Pick one more" : "Compare"}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    <CompareProvider>
      <ScrollToTop />
      <a className="skip" href="#main">Skip to content</a>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Results />} />
          <Route path="/movies/new" element={<MovieNew />} />
          <Route path="/movies/:title" element={<MovieDetail />} />
          <Route path="/movies/:title/edit" element={<MovieEdit />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/new" element={<PersonNew />} />
          <Route path="/people/:name" element={<PersonDetail />} />
          <Route path="/people/:name/edit" element={<PersonEdit />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/new" element={<Navigate to="/movies/new" replace />} />
          <Route path="*" element={<div className="empty"><h2>Page not found</h2><Link to="/">Go home</Link></div>} />
        </Routes>
      </main>
      <CompareTray />
    </CompareProvider>
  );
}
