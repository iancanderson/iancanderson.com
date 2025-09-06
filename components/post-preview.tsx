import DateFormatter from "./date-formatter";
import Link from "next/link";
import PostLink from "./post-link";

type Props = {
  title: string;
  date: string;
  slug: string;
  externalUrl: string;
  isVideo?: boolean;
  tags?: string[];
};

const PostPreview = ({ title, date, slug, externalUrl, isVideo, tags }: Props) => {
  return (
    <div className="brutal-border bg-[color:var(--brutal-card)] p-4 text-[color:var(--brutal-fg)]">
      <h3 className="text-2xl mb-3 leading-snug">
        {isVideo && (
          <span className="mr-2 align-middle inline-block text-[10px] font-semibold uppercase tracking-wide text-red-600">Video</span>
        )}
        <PostLink externalUrl={externalUrl} title={title} slug={slug} />
      </h3>
      {Array.isArray(tags) && tags.length > 0 && (
        <div className="mb-2 text-sm">
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
  );
};

export default PostPreview;
