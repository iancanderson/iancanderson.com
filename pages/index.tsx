import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Header from "../components/header";
import Layout from "../components/layout";
import CalendarTimeline from "../components/calendar-timeline";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../types/post";

type Props = {
  allPosts: Post[];
  currentYearPosts: Post[];
  currentYear: number;
};

const Index = ({ allPosts, currentYearPosts, currentYear }: Props) => {
  const heroPost = currentYearPosts[0];
  const morePosts = currentYearPosts.slice(1);
  const count = currentYearPosts.length;
  const noun = count === 1 ? "post" : "posts";
  
  return (
    <>
      <Layout>
        <Head>
          <title>iancanderson</title>
        </Head>
        <Container>
          <Header />
          <CalendarTimeline posts={allPosts.map(p => ({ slug: p.slug, date: p.date, tags: p.tags }))} autoScrollOnMount />
          <h1 className="text-2xl font-semibold mt-4 mb-4">{count} {noun} in {currentYear}</h1>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              date={heroPost.date}
              slug={heroPost.slug}
              externalUrl={heroPost.externalUrl}
              isVideo={heroPost.type === 'video'}
              tags={heroPost.tags}
              videoDescription={(heroPost as any).videoDescription}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "externalUrl", "type", "tags", "videoDescription"]);

  // Find the most recent year with activity
  function yearOf(iso: string): number {
    return new Date(iso).getUTCFullYear();
  }

  const years = Array.from(new Set(allPosts.map((p) => yearOf(p.date)))).sort((a, b) => b - a);
  const currentYear = years[0] || new Date().getUTCFullYear();
  const currentYearPosts = allPosts.filter((p) => yearOf(p.date) === currentYear);

  return {
    props: { allPosts, currentYearPosts, currentYear },
  };
};
