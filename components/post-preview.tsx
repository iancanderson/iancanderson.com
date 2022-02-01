import DateFormatter from "./date-formatter";
import Link from "next/link";
import PostLink from "./post-link";

type Props = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  externalUrl: string;
};

const PostPreview = ({ title, date, excerpt, slug, externalUrl }: Props) => {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <PostLink externalUrl={externalUrl} title={title} slug={slug} />
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  );
};

export default PostPreview;
