import { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { PostKind } from "./kind";

type PostType = {
  slug: string;
  title: string;
  date: string;
  content: MDXRemoteSerializeResult<Record<string, unknown>>;
  externalUrl: string;
  type?: PostKind; // 'article' | 'video'
  youtubeId?: string;
  tags?: string[];
};

export default PostType;
