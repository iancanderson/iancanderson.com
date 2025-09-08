import DateFormatter from "./date-formatter";
import Link from "next/link";
import PostLink from "./post-link";
import { emojiForTag, colorClassForTag } from "../lib/tags";

type Props = {
  title: string;
  date: string;
  slug: string;
  externalUrl: string;
  isVideo?: boolean;
  tags?: string[];
  videoDescription?: string;
};

function summarize(s?: string, max = 140) {
  if (!s) return '';
  const clean = s.replace(/\s+/g, ' ').trim();
  // Use grapheme-aware slicing when available to avoid breaking emoji/ZWJ sequences
  try {
    // @ts-ignore Intl.Segmenter may not be in older TS libdom
    const seg = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter('en', { granularity: 'grapheme' }) : null;
    if (seg) {
      const out: string[] = [];
      let count = 0;
      for (const { segment } of seg.segment(clean) as any) {
        if (count + segment.length > max - 1) break;
        out.push(segment);
        count += segment.length;
      }
      const joined = out.join('');
      return joined.length < clean.length ? joined + '…' : joined;
    }
  } catch {}
  // Fallback: iterate code points to avoid splitting surrogate pairs
  const codepoints = Array.from(clean);
  if (codepoints.length > max - 1) {
    return codepoints.slice(0, max - 1).join('') + '…';
  }
  return clean;
}

const PostPreview = ({ title, date, slug, externalUrl, isVideo, tags, videoDescription }: Props) => {
  return (
    <div className="brutal-border weird-card mood-ring p-4 text-[color:var(--brutal-fg)]">
      <h3 className="text-xl mb-3 leading-snug">
        <PostLink externalUrl={externalUrl} title={title} slug={slug} />
      </h3>
      {isVideo && videoDescription && (
        <p className="mb-2 text-sm">{summarize(videoDescription)}</p>
      )}
      {Array.isArray(tags) && tags.length > 0 && (
        <div className="mb-2 text-sm">
          {tags.map((t) => (
            <Link
              key={t}
              href={`/tags/${t}`}
              className={`brutal-chip neon-chip ${colorClassForTag(t)} inline-flex items-center gap-2 mr-3 mb-2 px-2 py-1`}
            >
              <span className="chip-emoji" aria-hidden>{emojiForTag(t)}</span>
              <span>#{t}</span>
            </Link>
          ))}
        </div>
      )}
      <div className="mb-1">
        <DateFormatter dateString={date} />
      </div>
    </div>
  );
};

export default PostPreview;
