import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import CalendarTimeline from "../components/calendar-timeline";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../types/post";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  
  return (
    <>
      <Layout>
        <Head>
          <title>iancanderson</title>
        </Head>
        <Container>
          <Intro />
          <CalendarTimeline posts={allPosts.map(p => ({ slug: p.slug, date: p.date, tags: p.tags }))} />
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

  return {
    props: { allPosts },
  };
};
