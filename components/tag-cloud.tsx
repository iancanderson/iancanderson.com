import Link from "next/link";

type Props = {
  counts: Record<string, number>;
};

const EMOJI: Record<string, string> = {
  software: "💻",
  investing: "📈",
  music: "🎵",
  video: "🎬",
  homebrewing: "🍺",
};

function emojiFor(tag: string) {
  return EMOJI[tag.toLowerCase()] || "🏷️";
}

const TagCloud = ({ counts }: Props) => {
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

  return (
    <div className="mb-10 brutal-border bg-[color:var(--brutal-card)] p-4 text-[color:var(--brutal-fg)]">
      <h2 className="text-xl mb-3 font-extrabold">Tags</h2>
      <div className="flex flex-wrap">
        {sorted.map(([tag, n]) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <a
              className={`inline-flex items-center gap-2 mr-3 mb-2 px-2 py-1 border border-[color:var(--brutal-border)] ${weightFor(n)}`}
            >
              <span aria-hidden>{emojiFor(tag)}</span>
              <span>#{tag}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
