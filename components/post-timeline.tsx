import Link from "next/link";
import { useMemo, useRef, useEffect, useState } from "react";
import { emojiForTag } from "../lib/tags";

type Post = {
  slug: string;
  date: string;
  tags?: string[];
};

type Props = {
  posts: Post[];
};

function parseISO(d: string) {
  return new Date(d).getTime();
}

export default function PostTimeline({ posts }: Props) {
  function formatDateUTC(iso: string): string {
    const d = new Date(iso);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  const data = useMemo(() => {
    const ps = posts
      .filter((p) => p.date)
      .map((p) => ({ ...p, t: parseISO(p.date) }))
      .sort((a, b) => a.t - b.t);
    return ps;
  }, [posts]);

  const yearsList = useMemo(() => {
    const set = new Set<number>();
    data.forEach((p) => set.add(new Date(p.t).getUTCFullYear()));
    return Array.from(set).sort((a, b) => b - a);
  }, [data]);

  const [year, setYear] = useState<number | null>(yearsList[0] || null);
  useEffect(() => {
    if (yearsList.length && (year === null || !yearsList.includes(year))) setYear(yearsList[0]);
  }, [yearsList]);

  if (!year) return null;

  const items = data.filter((p) => new Date(p.t).getUTCFullYear() === year);
  const startOfYear = Date.UTC(year, 0, 1);
  const endOfYear = Date.UTC(year + 1, 0, 1) - 1;
  const totalDays = Math.max(1, Math.round((endOfYear - startOfYear) / (1000 * 60 * 60 * 24)));

  const pctLeft = (dateISO: string) => {
    const t = parseISO(dateISO);
    const days = Math.max(0, Math.min(totalDays, Math.round((t - startOfYear) / (1000 * 60 * 60 * 24))));
    return (days / totalDays) * 100;
  };

  const monthTicks = useMemo(() => {
    const ticks: { label: string; left: number }[] = [];
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let m = 0; m < 12; m++) {
      const t = Date.UTC(year, m, 1);
      const days = Math.max(0, Math.min(totalDays, Math.round((t - startOfYear) / (1000 * 60 * 60 * 24))));
      ticks.push({ label: labels[m], left: (days / totalDays) * 100 });
    }
    return ticks;
  }, [year, totalDays, startOfYear]);

  return (
    <div className="mb-10 brutal-border bg-[color:var(--brutal-card)] p-3 text-[color:var(--brutal-fg)]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-extrabold">Timeline</h2>
      </div>
      <div className="text-sm mb-3">
        {yearsList.map((y, idx) => (
          <span key={y}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setYear(y);
              }}
              className={y === year ? "font-extrabold" : "hover:underline"}
            >
              {y}
            </a>
            {idx < yearsList.length - 1 ? <span className="mx-2">|</span> : null}
          </span>
        ))}
      </div>
      <div className="relative" style={{ height: 160 }}>
        <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-400/40" />
        {monthTicks.map((t) => (
          <div key={t.label} className="absolute top-[10px] text-[10px] text-gray-600" style={{ left: `${t.left}%` }}>
            <div className="h-3 border-l border-gray-400/70" />
            <div className="-ml-3 mt-1">{t.label}</div>
          </div>
        ))}
        {items.map((p) => {
          const left = pctLeft(p.date);
          const tags = (p.tags || []).filter((t: string) => emojiForTag(t) !== "🏷️");
          if (tags.length === 0) return null;
          return (
            <div key={p.slug} className="absolute" style={{ left: `${left}%`, top: 70 }}>
              <div className="flex flex-col items-center gap-1">
                {tags.map((t: string, idx: number) => (
                  <Link
                    key={t + idx}
                    href={`/posts/${p.slug}`}
                    className="hover:scale-110 transition-transform"
                    title={`#${t} – ${formatDateUTC(p.date)}`}
                    aria-label={`${t} post on ${formatDateUTC(p.date)}`}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>{emojiForTag(t)}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
