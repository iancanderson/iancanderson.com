import DateFormatter from "./date-formatter";
import PostLink from "./post-link";

type Props = {
  title: string;
  date: string;
  externalUrl: string;
  slug: string;
};

const HeroPost = ({ title, date, externalUrl, slug }: Props) => {
  return (
    <section>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
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
