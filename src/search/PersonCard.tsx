import { motion } from "motion/react";
import { Link } from "react-router";
import { Avatar } from "../ui/Avatar";

export interface CardPerson {
  name: string;
  born?: number | null;
  actedCount?: number | null;
  directedCount?: number | null;
}

export function PersonCard({ person, index = 0 }: { person: CardPerson; index?: number }) {
  const acted = person.actedCount ?? 0;
  const directed = person.directedCount ?? 0;
  return (
    <motion.article
      className="person-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 12) * 0.03 }}
      whileHover={{ y: -3 }}
    >
      <Link to={`/people/${encodeURIComponent(person.name)}`} className="person-link">
        <Avatar name={person.name} size="lg" />
        <span className="person-name">{person.name}</span>
      </Link>
      <div className="role-badges">
        {acted > 0 && <span className="role-badge role-actor">Actor · {acted}</span>}
        {directed > 0 && <span className="role-badge role-director">Director · {directed}</span>}
      </div>
      {person.born ? <p className="muted person-born">Born {person.born}</p> : null}
    </motion.article>
  );
}
