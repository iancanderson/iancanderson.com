import Link from "next/link";
import { useMemo, useRef, useEffect } from "react";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const data = useMemo(() => {
    const ps = posts
      .filter((p) => p.date)
      .map((p) => ({ ...p, t: parseISO(p.date) }))
      .sort((a, b) => a.t - b.t);
    if (ps.length === 0) return { items: [] as any[], minT: 0, maxT: 0 };
    const minT = ps[0].t;
    const maxT = ps[ps.length - 1].t;
    return { items: ps, minT, maxT };
  }, [posts]);

  const pxPerDay = 1.2; // scale
  const days = Math.max(1, (data.maxT - data.minT) / (1000 * 60 * 60 * 24));
  const width = Math.max(800, Math.ceil(days * pxPerDay) + 60);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollLeft = el.scrollWidth; // jump to latest
  }, [width]);

  const posLeft = (dateISO: string) => {
    const t = parseISO(dateISO);
    return ((t - data.minT) / (1000 * 60 * 60 * 24)) * pxPerDay;
  };

  const years: { year: number; left: number }[] = useMemo(() => {
    if (!data.minT || !data.maxT) return [] as { year: number; left: number }[];
    const y0 = new Date(data.minT).getUTCFullYear();
    const y1 = new Date(data.maxT).getUTCFullYear();
    const ts = [] as { year: number; left: number }[];
    for (let y = y0; y <= y1; y++) {
      const t = Date.UTC(y, 0, 1);
      const days = (t - data.minT) / (1000 * 60 * 60 * 24);
      ts.push({ year: y, left: days * pxPerDay });
    }
    return ts;
  }, [data.minT, data.maxT]);

  return (
    <div className="mb-10 brutal-border bg-[color:var(--brutal-card)] p-3 text-[color:var(--brutal-fg)]">
      <h2 className="text-xl mb-3 font-extrabold">Timeline</h2>
      <div ref={containerRef} className="overflow-x-auto" style={{ height: 160 }}>
        <div className="relative" style={{ width }}>
          <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-400/40" />
          {/* Year ticks */}
          {years.map((t: { year: number; left: number }) => (
            <div key={t.year} className="absolute top-[10px] text-[10px] text-gray-600" style={{ left: t.left }}>
              <div className="h-3 border-l border-gray-400/70" />
              <div className="-ml-3 mt-1">{t.year}</div>
            </div>
          ))}
          {/* Posts as stacks of emojis */}
          {data.items.map((p) => {
            const left = posLeft(p.date);
            const tags = (p.tags || []).filter((t: string) => emojiForTag(t) !== "🏷️");
            if (tags.length === 0) return null;
            return (
              <div key={p.slug} className="absolute" style={{ left, top: 70 }}>
                <div className="flex flex-col items-center gap-1">
                  {tags.map((t: string, idx: number) => (
                    <Link key={t + idx} as={`/posts/${p.slug}`} href="/posts/[slug]">
                      <a
                        className="hover:scale-110 transition-transform"
                        title={`#${t} – ${new Date(p.date).toDateString()}`}
                        aria-label={`${t} post on ${new Date(p.date).toDateString()}`}
                      >
                        <span style={{ fontSize: 18, lineHeight: 1 }}>{emojiForTag(t)}</span>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
