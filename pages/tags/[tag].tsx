import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Intro from "../../components/intro";
import MoreStories from "../../components/more-stories";
import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";

type Props = {
  tag: string;
  posts: Post[];
};

export default function TagPage({ tag, posts }: Props) {
  const sorted = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return (
    <Layout>
      <Head>
        <title>Tag: {tag} | iancanderson</title>
      </Head>
      <Container>
        <Intro />
        <h1 className="text-4xl font-bold mb-8">Tag: {tag}</h1>
        {sorted.length > 0 ? (
          <MoreStories posts={sorted} />
        ) : (
          <p>No posts found for this tag.</p>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const all = getAllPosts(["slug", "tags"]);
  const tagSet = new Set<string>();
  all.forEach((p: any) => {
    const tags: string[] = p.tags || [];
    tags.forEach((t) => tagSet.add(t));
  });
  const paths = Array.from(tagSet).map((tag) => ({ params: { tag } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = String((params as any).tag);
  const posts = getAllPosts(["title", "date", "slug", "externalUrl", "type", "tags"])
    .filter((p: any) => Array.isArray(p.tags) && p.tags.includes(tag));
  return { props: { tag, posts } };
};

