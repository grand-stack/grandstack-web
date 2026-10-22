// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { motion } from "motion/react";
import { Link } from "react-router";
import { Poster } from "../poster/Poster";
import { useCompare } from "../lib/compare";
import { formatRuntime } from "../lib/filters";
import { RatingBadge } from "../ui";

export interface CardMovie {
  title: string;
  released?: number | null;
  rating?: number | null;
  runtime?: number | null;
  genres: { name: string }[];
}

export function MovieCard({ movie, view = "grid", index = 0 }: { movie: CardMovie; view?: "grid" | "list"; index?: number }) {
  const compare = useCompare();
  const selected = compare.has(movie.title);
  const genre = movie.genres[0]?.name;
  return (
    <motion.article
      className={`card card-${view}${selected ? " card-selected" : ""}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 12) * 0.03 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/movies/${encodeURIComponent(movie.title)}`} className="card-link" aria-label={movie.title}>
        <Poster title={movie.title} year={movie.released} genre={genre} />
      </Link>
      <div className="card-body">
        <div className="card-head">
          <Link to={`/movies/${encodeURIComponent(movie.title)}`} className="card-title">{movie.title}</Link>
          <RatingBadge rating={movie.rating} />
        </div>
        <p className="card-meta">
          {[movie.released, formatRuntime(movie.runtime)].filter(Boolean).join(" · ")}
        </p>
        <p className="card-genres">{movie.genres.map((g) => g.name).join(" · ")}</p>
        <label className={`compare-toggle${!selected && compare.full ? " disabled" : ""}`}>
          <input type="checkbox" checked={selected} disabled={!selected && compare.full} onChange={() => compare.toggle(movie.title)} />
          Compare
        </label>
      </div>
    </motion.article>
  );
}
