import DateFormatter from "./date-formatter";
import PostLink from "./post-link";

type Props = {
  title: string;
  date: string;
  externalUrl: string;
  slug: string;
  isVideo?: boolean;
};

const HeroPost = ({ title, date, externalUrl, slug, isVideo }: Props) => {
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
          <div className="mb-4 md:mb-0">
            <DateFormatter dateString={date} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
