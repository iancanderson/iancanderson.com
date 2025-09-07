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
  return clean.length > max ? clean.slice(0, max - 1) + '…' : clean;
}

const PostPreview = ({ title, date, slug, externalUrl, isVideo, tags, videoDescription }: Props) => {
  return (
    <div className="brutal-border bg-[color:var(--brutal-card)] p-4 text-[color:var(--brutal-fg)]">
      <h3 className="text-2xl mb-3 leading-snug">
        <PostLink externalUrl={externalUrl} title={title} slug={slug} />
      </h3>
      {isVideo && videoDescription && (
        <p className="mb-2 text-sm">{summarize(videoDescription)}</p>
      )}
      {Array.isArray(tags) && tags.length > 0 && (
        <div className="mb-2 text-sm">
          {tags.map((t) => (
            <Link key={t} href={`/tags/${t}`}>
              <a className={`brutal-chip ${colorClassForTag(t)} inline-flex items-center gap-2 mr-3 mb-2 px-2 py-1`}>
                <span className="chip-emoji" aria-hidden>{emojiForTag(t)}</span>
                <span>#{t}</span>
              </a>
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
