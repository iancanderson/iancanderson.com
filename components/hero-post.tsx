import DateFormatter from "./date-formatter";
import PostLink from "./post-link";
import Link from "next/link";

type Props = {
  title: string;
  date: string;
  externalUrl: string;
  slug: string;
  isVideo?: boolean;
  tags?: string[];
  videoDescription?: string;
};

const HeroPost = ({ title, date, externalUrl, slug, isVideo, tags, videoDescription }: Props) => {
  const EMOJI: Record<string, string> = {
    software: "💻",
    investing: "📈",
    music: "🎵",
    video: "🎬",
    homebrewing: "🍺",
  };
  const emojiFor = (tag: string) => EMOJI[tag.toLowerCase()] || "🏷️";
  const colorClass = (tag: string) => (EMOJI[tag.toLowerCase()] ? `chip-${tag.toLowerCase()}` : '');
  return (
    <section>
      <div className="mb-10">
        <div className="brutal-border bg-[color:var(--brutal-card)] p-5 text-[color:var(--brutal-fg)]">
          <h3 className="mb-3 text-3xl lg:text-4xl leading-tight">
            <PostLink externalUrl={externalUrl} title={title} slug={slug} />
          </h3>
          {isVideo && videoDescription && (
            <p className="mb-2 text-base">{videoDescription}</p>
          )}
          {Array.isArray(tags) && tags.length > 0 && (
            <div className="mb-2 text-sm">
              {tags.map((t) => (
                <Link key={t} href={`/tags/${t}`}>
                  <a className={`brutal-chip ${colorClass(t)} inline-flex items-center gap-2 mr-3 mb-2 px-2 py-1`}>
                    <span className="chip-emoji" aria-hidden>{emojiFor(t)}</span>
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
      </div>
    </section>
  );
};

export default HeroPost;
