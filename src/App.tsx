import { useEffect, useState, type FormEvent } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { CompareProvider, MAX_COMPARE, useCompare } from "./lib/compare";
import { Compare } from "./pages/Compare";
import { CreateMovie } from "./pages/CreateMovie";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
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
        <NavLink to="/compare">Compare{compare.titles.length > 0 && <span className="badge">{compare.titles.length}</span>}</NavLink>
        <NavLink to="/new">Add</NavLink>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </nav>
    </header>
  );
}

function CompareTray() {
  const compare = useCompare();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const show = compare.titles.length > 0 && pathname !== "/compare";
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
          <Route path="/movies/:title" element={<MovieDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/new" element={<CreateMovie />} />
          <Route path="*" element={<div className="empty"><h2>Page not found</h2><Link to="/">Go home</Link></div>} />
        </Routes>
      </main>
      <CompareTray />
    </CompareProvider>
  );
}
