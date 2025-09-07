import Link from "next/link";

type PostLinkProps = {
  title: string;
  externalUrl?: string;
  slug: string;
};

const PostLink = ({ externalUrl, slug, title }: PostLinkProps) => {
  if (externalUrl) {
    return (
      <Link href={externalUrl} className="hover:underline" target="_blank" rel="noopener noreferrer">
        {title}
      </Link>
    );
  }

  return (
    <Link href={`/posts/${slug}`} className="hover:underline">
      {title}
    </Link>
  );
};

export default PostLink;
