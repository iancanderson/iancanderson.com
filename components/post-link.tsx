import Link from "next/link";

type PostLinkProps = {
  title: string;
  externalUrl: string;
  slug: string;
};

const PostLink = ({ externalUrl, slug, title }: PostLinkProps) => {
  if (externalUrl) {
    return (
      <Link href={externalUrl}>
        <a className="hover:underline">{title}</a>
      </Link>
    );
  } else {
    return (
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a className="hover:underline">{title}</a>
      </Link>
    );
  }
};

export default PostLink;
