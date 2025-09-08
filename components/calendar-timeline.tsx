import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { emojiForTag } from "../lib/tags";

type PostLite = {
  slug: string;
  date: string; // ISO
  tags?: string[];
};

type Props = {
  posts: PostLite[];
  selectedDate?: string; // YYYY-MM-DD
  bare?: boolean;
  hideTitle?: boolean;
  autoScrollOnMount?: boolean;
};

const PRIORITY: string[] = ["music", "software", "video", "podcast", "homebrewing", "investing"];

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

function pickEmojiTag(tags: string[]): { emoji: string | null; tag?: string } {
  if (!tags || tags.length === 0) return { emoji: null };
  const lower = tags.map((t) => t.toLowerCase());
  for (const t of PRIORITY) {
    if (lower.includes(t)) return { emoji: emojiForTag(t), tag: t };
  }
  // fallback to first known tag with emoji
  for (const t of lower) {
    const e = emojiForTag(t);
    if (e && e !== "🏷️") return { emoji: e, tag: t };
  }
  return { emoji: null };
}

export default function CalendarTimeline({ posts, selectedDate, bare = false, hideTitle = false, autoScrollOnMount = false }: Props) {
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

  const daySquare = 18; // px
  const gap = 3; // px

  function renderDay(ts: number) {
    const d = new Date(ts);
    const key = toDateKey(d.toISOString());
    const info = map.get(key);
    const inYear = d.getUTCFullYear() === year;
    let chosen: { emoji: string | null; tag?: string } = { emoji: null };
    if (info) {
      chosen = pickEmojiTag(Array.from(info.tags));
    }
    const title = `${key}${info ? ` • ${info.slugs.length} post(s)` : ""}`;
    const chipClass = chosen.tag ? `chip-${chosen.tag}` : '';
    const clsBase = `flex items-center justify-center ${info ? 'border border-gray-500/60' : 'border border-gray-400/30'} ${selectedDate === key ? 'ring-1 ring-offset-1 ring-[color:var(--brutal-fg)]' : ''} ${chipClass}`;
    const styleBase: CSSProperties = {
      width: daySquare,
      height: daySquare,
      opacity: inYear ? 1 : 0.08,
      backgroundColor: info ? 'rgba(var(--chip-color-rgb, 0,0,0), 0.12)' : undefined,
    };
    const content = <span className="text-gray-700" style={{ fontSize: 13, lineHeight: 1 }}>{chosen.emoji || ''}</span>;
    if (info) {
      const href = `/day/${key}`;
      return (
        <Link key={key} href={href} title={title} className={clsBase} style={styleBase}>
          {content}
        </Link>
      );
    }
    return (
      <div key={key} title={title} className={clsBase} style={styleBase}>
        {content}
      </div>
    );
  }

  // Full-year horizontal grid and month markers
  const y = year as number;
  const msWeek = 7 * 24 * 60 * 60 * 1000;
  const yearStartWeek = startOfWeekSundayUTC(startOfYearUTC(y));
  const yearEnd = endOfYearUTC(y);
  let weeks = 0;
  for (let t = yearStartWeek; t <= yearEnd; t = addDays(t, 7)) weeks += 1;
  const trackWidth = weeks * daySquare + (weeks - 1) * gap;
  const yearsHeight = 24; // px
  const labelHeight = 18; // px (month labels)
  const gridTop = yearsHeight + labelHeight;
  const trackHeight = gridTop + 7 * daySquare + 6 * gap;

  const monthTicks = useMemo(() => {
    const ticks: { label: string; left: number }[] = [];
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let m = 0; m < 12; m++) {
      const mStart = Date.UTC(y, m, 1);
      const mWeek = startOfWeekSundayUTC(mStart);
      const weeksFromStart = Math.floor((mWeek - yearStartWeek) / msWeek);
      const left = weeksFromStart * (daySquare + gap);
      const y2 = String(y).slice(2);
      ticks.push({ label: `${labels[m]} '${y2}` , left });
    }
    return ticks;
  }, [y, yearStartWeek]);

  const weeksCols: JSX.Element[] = [];
  for (let w = 0, t = yearStartWeek; w < weeks; w++, t = addDays(t, 7)) {
    const daysCol: JSX.Element[] = [];
    for (let d = 0; d < 7; d++) {
      daysCol.push(renderDay(addDays(t, d)));
    }
    weeksCols.push(
      <div key={`w-${w}`} className="flex flex-col" style={{ gap }}>
        {daysCol}
      </div>
    );
  }

  // Scroll fade indicators
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fadeL, setFadeL] = useState(false);
  const [fadeR, setFadeR] = useState(false);
  const didAutoScrollRef = useRef(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setFadeL(el.scrollLeft > 0);
      setFadeR(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [weeks, trackWidth]);

  // Optionally (homepage only), on first mount and small screens, auto-scroll
  // to the most recent activity so the calendar doesn't look empty.
  useEffect(() => {
    if (!autoScrollOnMount || didAutoScrollRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const small = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
    if (!small) return;
    const scrollTo = (x: number) => {
      el.scrollLeft = Math.max(0, Math.min(x, el.scrollWidth - el.clientWidth));
    };
    // Right-align latest
    requestAnimationFrame(() => scrollTo(el.scrollWidth - el.clientWidth));
    didAutoScrollRef.current = true;
  }, [autoScrollOnMount, trackWidth]);

  const header = (
    <div className="flex items-center justify-between mb-3">
      {!hideTitle && <h2 className="text-xl font-extrabold">Timeline</h2>}
    </div>
  );

  const scroller = (
    <div ref={containerRef} className="relative overflow-x-auto bg-[color:var(--brutal-card)]" style={{ height: trackHeight }}>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8" style={{ opacity: fadeL ? 1 : 0, transition: 'opacity 150ms', background: 'linear-gradient(to right, var(--brutal-card), rgba(0,0,0,0))' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8" style={{ opacity: fadeR ? 1 : 0, transition: 'opacity 150ms', background: 'linear-gradient(to left, var(--brutal-card), rgba(0,0,0,0))' }} />
        <div className="relative" style={{ width: trackWidth, height: trackHeight }}>
          {/* Years selector row inside scroller */}
          <div className="absolute left-0 right-0" style={{ top: 0, height: yearsHeight }}>
            <div className="inline-flex items-center text-sm gap-2">
              {years.map((yy) => (
                <Link
                  key={yy}
                  href={`/year/${yy}`}
                  className={yy === year ? "font-extrabold" : "hover:underline"}
                  onClick={() => setYear(yy)}
                >
                  {yy}
                </Link>
              ))}
            </div>
          </div>
          {/* Month labels */}
          {monthTicks.map((t) => (
            <div key={t.label} className="absolute text-[10px] text-gray-600" style={{ left: t.left, top: yearsHeight + 2 }}>
              {t.label}
            </div>
          ))}
          {/* Grid */}
          <div className="absolute" style={{ top: gridTop }}>
            <div className="flex" style={{ gap }}>
              {weeksCols}
            </div>
          </div>
        </div>
      </div>
  );

  if (bare) {
    return (
      <div className="text-[color:var(--brutal-fg)]">
        {header}
        {scroller}
      </div>
    );
  }

  return (
    <div className="mb-10 brutal-border bg-[color:var(--brutal-card)] p-3 text-[color:var(--brutal-fg)]">
      {header}
      {scroller}
    </div>
  );
}
