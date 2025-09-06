import Link from "next/link";

type Props = {
  counts: Record<string, number>;
};

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
    <div className="mb-10">
      <h2 className="text-xl mb-3">Tags</h2>
      <div className="flex flex-wrap gap-x-3 gap-y-2 text-gray-700">
        {sorted.map(([tag, n]) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <a className={`hover:underline ${weightFor(n)}`}>#{tag}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;

