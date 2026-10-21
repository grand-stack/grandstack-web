import { useState } from "react";
import { CreateMovie } from "./pages/CreateMovie";
import { MovieDetail } from "./pages/MovieDetail";
import { MovieList } from "./pages/MovieList";

type View = { name: "list" } | { name: "detail"; title: string } | { name: "create" };

export function App() {
  const [view, setView] = useState<View>({ name: "list" });
  return (
    <main>
      <header>
        <h1 onClick={() => setView({ name: "list" })}>GRANDstack Movies</h1>
        <button onClick={() => setView({ name: "create" })}>Add movie</button>
      </header>
      {view.name === "list" && <MovieList onSelect={(title) => setView({ name: "detail", title })} />}
      {view.name === "detail" && <MovieDetail title={view.title} onBack={() => setView({ name: "list" })} />}
      {view.name === "create" && (
        <CreateMovie onDone={(title) => setView(title ? { name: "detail", title } : { name: "list" })} />
      )}
    </main>
  );
}
