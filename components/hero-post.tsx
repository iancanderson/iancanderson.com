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
};

const HeroPost = ({ title, date, externalUrl, slug, isVideo, tags }: Props) => {
  return (
    <section>
      <div className="mb-10">
        <div className="brutal-border bg-[color:var(--brutal-card)] p-5">
          <h3 className="mb-3 text-3xl lg:text-4xl leading-tight">
            {isVideo && (
              <span className="mr-3 align-middle inline-block text-xs font-semibold uppercase tracking-wide text-red-600">Video</span>
            )}
            <PostLink externalUrl={externalUrl} title={title} slug={slug} />
          </h3>
          {Array.isArray(tags) && tags.length > 0 && (
            <div className="mb-2 text-sm text-gray-800">
              {tags.map((t) => (
                <Link key={t} href={`/tags/${t}`}>
                  <a className="brutal-tag">#{t}</a>
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
