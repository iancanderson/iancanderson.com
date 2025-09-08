import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Header from "../../components/header";
import MoreStories from "../../components/more-stories";
import CalendarTimeline from "../../components/calendar-timeline";
import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";

type Props = {
  year: string;
  posts: Post[];
  allPosts: any[];
};

function yearOf(iso: string): number {
  return new Date(iso).getUTCFullYear();
}

export default function YearPage({ year, posts, allPosts }: Props) {
  const count = posts.length;
  const noun = count === 1 ? "post" : "posts";
  return (
    <Layout>
      <Head>
        <title>Year: {year} | iancanderson</title>
      </Head>
      <Container>
        <Header />
        <CalendarTimeline 
          posts={allPosts.map(p => ({ slug: p.slug, date: p.date, tags: p.tags }))} 
          selectedDate={`${year}-01-01`}
        />
        <h2 className="text-2xl font-semibold mt-4 mb-4">{count} {noun} in {year}</h2>
        {count > 0 ? (
          <MoreStories posts={posts} />
        ) : (
          <p>No posts in this year.</p>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(["date"]) as any[];
  const years = Array.from(new Set(posts.map((p) => yearOf(p.date))));
  const paths = years.map((year) => ({ params: { year: String(year) } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = String((params as any).year);
  const yearNum = parseInt(year, 10);
  const all = getAllPosts(["title", "date", "slug", "externalUrl", "type", "tags", "videoDescription"]) as any[];
  const posts = all.filter((p) => yearOf(p.date) === yearNum);
  return { props: { year, posts, allPosts: all } };
};