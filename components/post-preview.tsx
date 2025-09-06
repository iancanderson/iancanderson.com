import DateFormatter from "./date-formatter";
import Link from "next/link";
import PostLink from "./post-link";

type Props = {
  title: string;
  date: string;
  slug: string;
  externalUrl: string;
  isVideo?: boolean;
};

const PostPreview = ({ title, date, slug, externalUrl, isVideo }: Props) => {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        {isVideo && (
          <span className="mr-2 align-middle inline-block text-[10px] font-semibold uppercase tracking-wide text-red-600">Video</span>
        )}
        <PostLink externalUrl={externalUrl} title={title} slug={slug} />
      </h3>
      <div className="mb-4">
        <DateFormatter dateString={date} />
      </div>
    </div>
  );
};

export default PostPreview;
