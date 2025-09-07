import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Intro from "../../components/intro";
import MoreStories from "../../components/more-stories";
import CalendarTimeline from "../../components/calendar-timeline";
import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";

type Props = {
  date: string; // YYYY-MM-DD
  posts: Post[];
  allPosts: any[];
};

function toDateKey(iso: string) {
  return String(iso).slice(0, 10);
}

export default function DayPage({ date, posts, allPosts }: Props) {
  const count = posts.length;
  const noun = count === 1 ? "post" : "posts";
  return (
    <Layout>
      <Head>
        <title>Day: {date} | iancanderson</title>
      </Head>
      <Container>
        <Intro />
        <h1 className="text-2xl font-semibold mb-4">{count} {noun} on {date}</h1>
        <CalendarTimeline posts={allPosts.map(p => ({ slug: p.slug, date: p.date, tags: p.tags }))} selectedDate={date} />
        {count > 0 ? (
          <MoreStories posts={posts} />
        ) : (
          <p>No posts on this day.</p>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(["date"]) as any[];
  const dates = Array.from(new Set(posts.map((p) => toDateKey(p.date))));
  const paths = dates.map((date) => ({ params: { date } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const date = String((params as any).date);
  const all = getAllPosts(["title", "date", "slug", "externalUrl", "type", "tags", "videoDescription"]) as any[];
  const posts = all.filter((p) => toDateKey(p.date) === date);
  return { props: { date, posts, allPosts: all } };
};

