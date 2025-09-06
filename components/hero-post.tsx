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
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            {isVideo && (
              <span className="mr-3 align-middle inline-block text-xs font-semibold uppercase tracking-wide text-red-600">Video</span>
            )}
            <PostLink externalUrl={externalUrl} title={title} slug={slug} />
          </h3>
          {Array.isArray(tags) && tags.length > 0 && (
            <div className="mb-2 text-sm text-gray-600">
              {tags.map((t) => (
                <Link key={t} href={`/tags/${t}`}>
                  <a className="mr-2 inline-block hover:underline">#{t}</a>
                </Link>
              ))}
            </div>
          )}
          <div className="mb-4 md:mb-0">
            <DateFormatter dateString={date} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
