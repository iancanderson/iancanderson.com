import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { emojiForTag } from "../lib/tags";

type PostLite = {
  slug: string;
  date: string; // ISO
  tags?: string[];
};

type Props = {
  posts: PostLite[];
  selectedDate?: string; // YYYY-MM-DD
};

const PRIORITY: string[] = ["music", "software", "programming", "video", "podcast", "homebrewing", "investing"];

function toDateKey(iso: string): string {
  // Normalize to YYYY-MM-DD in UTC
  const d = new Date(iso);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yearOf(iso: string): number {
  return new Date(iso).getUTCFullYear();
}

function startOfYearUTC(year: number): number {
  return Date.UTC(year, 0, 1);
}

function endOfYearUTC(year: number): number {
  return Date.UTC(year + 1, 0, 0, 23, 59, 59, 999);
}

function startOfWeekSundayUTC(ts: number): number {
  const d = new Date(ts);
  const dow = d.getUTCDay(); // 0..6, 0=Sun
  const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  return start.getTime() - dow * 24 * 60 * 60 * 1000;
}

function addDays(ts: number, days: number): number {
  return ts + days * 24 * 60 * 60 * 1000;
}

function pickEmoji(tags: string[]): string | null {
  if (!tags || tags.length === 0) return null;
  const lower = tags.map((t) => t.toLowerCase());
  for (const t of PRIORITY) {
    if (lower.includes(t)) return emojiForTag(t);
  }
  // fallback to first known tag with emoji
  for (const t of lower) {
    const e = emojiForTag(t);
    if (e && e !== "🏷️") return e;
  }
  return null;
}

export default function CalendarTimeline({ posts, selectedDate }: Props) {
  const map = useMemo(() => {
    const m = new Map<string, { slugs: string[]; tags: Set<string> }>();
    posts.forEach((p) => {
      const key = toDateKey(p.date);
      if (!m.has(key)) m.set(key, { slugs: [], tags: new Set() });
      const entry = m.get(key)!;
      entry.slugs.push(p.slug);
      (p.tags || []).forEach((t) => entry.tags.add(t));
    });
    return m;
  }, [posts]);

  const years = useMemo(() => {
    const set = new Set<number>();
    posts.forEach((p) => set.add(yearOf(p.date)));
    return Array.from(set).sort((a, b) => b - a);
  }, [posts]);

  const [year, setYear] = useState<number | null>(years[0] || null);
  useEffect(() => {
    if (selectedDate) {
      const y = Number(selectedDate.slice(0, 4));
      setYear(y);
    } else if (years.length) {
      setYear(years[0]);
    }
  }, [selectedDate, years.join(",")]);

  if (!year) return null;

  const startWeek = startOfWeekSundayUTC(startOfYearUTC(year));
  const end = endOfYearUTC(year);
  // compute number of weeks to cover the year fully
  let weeks = 0;
  let iter = startWeek;
  while (iter <= end) {
    weeks += 1;
    iter = addDays(iter, 7);
  }

  const daySquare = 18; // px
  const gap = 3; // px

  function renderDay(ts: number) {
    const d = new Date(ts);
    const key = toDateKey(d.toISOString());
    const info = map.get(key);
    const inYear = d.getUTCFullYear() === year;
    let emoji: string | null = null;
    if (info) {
      emoji = pickEmoji(Array.from(info.tags));
    }
    const title = `${key}${info ? ` • ${info.slugs.length} post(s)` : ""}`;
    const clsBase = `flex items-center justify-center ${info ? 'border border-gray-500/60' : 'border border-gray-400/30'} ${selectedDate === key ? 'ring-1 ring-offset-1 ring-[color:var(--brutal-fg)]' : ''}`;
    const styleBase = {
      width: daySquare,
      height: daySquare,
      opacity: inYear ? 1 : 0.08,
    } as React.CSSProperties;
    const content = <span className="text-gray-700" style={{ fontSize: 13, lineHeight: 1 }}>{emoji || ''}</span>;
    if (info) {
      const href = `/day/${key}`;
      return (
        <Link key={key} href={href}>
          <a title={title} className={clsBase} style={styleBase}>{content}</a>
        </Link>
      );
    }
    return (
      <div key={key} title={title} className={clsBase} style={styleBase}>
        {content}
      </div>
    );
  }

  const weeksCols = [] as JSX.Element[];
  let colStart = startWeek;
  for (let w = 0; w < weeks; w++) {
    const daysCol = [] as JSX.Element[];
    for (let d = 0; d < 7; d++) {
      daysCol.push(renderDay(addDays(colStart, d)));
    }
    weeksCols.push(
      <div key={w} className="flex flex-col" style={{ gap }}>
        {daysCol}
      </div>
    );
    colStart = addDays(colStart, 7);
  }

  return (
    <div className="mb-10 brutal-border bg-[color:var(--brutal-card)] p-3 text-[color:var(--brutal-fg)]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-extrabold">Timeline</h2>
        <div className="text-sm">
          {years.map((y, idx) => (
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
              {idx < years.length - 1 ? <span className="mx-2">|</span> : null}
            </span>
          ))}
        </div>
      </div>
      <div className="flex" style={{ gap }}>
        {weeksCols}
      </div>
    </div>
  );
}
