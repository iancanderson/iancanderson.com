import Link from "next/link";
import { emojiForTag, colorClassForTag } from "../lib/tags";

type Props = {
  counts: Record<string, number>;
  bare?: boolean;
};

// tag helpers centralized in lib/tags

const TagCloud = ({ counts, bare = false }: Props) => {
  const entries = Object.entries(counts);
  if (entries.length === 0) return null;
  const max = Math.max(...entries.map(([, n]) => n));

  const weightFor = (n: number) => {
    const ratio = n / (max || 1);
    if (ratio >= 0.75) return "font-bold";
    if (ratio >= 0.5) return "font-semibold";
    if (ratio >= 0.25) return "font-medium";
    return "font-normal";
  };

  const sorted = entries.sort(([a], [b]) => a.localeCompare(b));

  const content = (
    <div className="flex flex-wrap">
      {sorted.map(([tag, n]) => (
        <Link
          key={tag}
          href={`/tags/${tag}`}
          className={`brutal-chip neon-chip ${colorClassForTag(tag)} inline-flex items-center gap-2 mr-3 mb-2 px-2 py-1 ${weightFor(n)}`}
        >
          <span className="chip-emoji" aria-hidden>{emojiForTag(tag)}</span>
          <span>#{tag}</span>
        </Link>
      ))}
    </div>
  );

  if (bare) return content;

  return (
    <div className="mb-10 brutal-border bg-[color:var(--brutal-card)] p-4 text-[color:var(--brutal-fg)]">
      <h2 className="text-lg mb-3 font-extrabold">Tags</h2>
      {content}
    </div>
  );
};

export default TagCloud;
