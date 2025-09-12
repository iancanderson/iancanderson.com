import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import Image from "next/image";
import PostType from "../../types/post";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import prism from "remark-prism";
import Counter from "../../components/counter";
import AudioPlayer from "../../components/audio-player";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

const components = {
  Counter,
};

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title} | iancanderson.com</title>
              </Head>
              <PostHeader title={post.title} date={post.date} />
              {post.type === 'video' && post.youtubeId ? (
                <div className="mb-8">
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${post.youtubeId}`}
                      title={post.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    />
                  </div>
                </div>
              ) : null}
              {post.type === 'music' && (post as any).soundcloudUrl ? (
                <div className="mb-8">
                  <div style={{ position: 'relative', paddingBottom: '166px', height: 0 }}>
                    <iframe
                      title={post.title}
                      allow="autoplay"
                      scrolling="no"
                      frameBorder="no"
                      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent((post as any).soundcloudUrl)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '166px', border: 0 }}
                    />
                  </div>
                </div>
              ) : null}
              {post.type === 'audio' && (post as any).audioUrl ? (
                <div className="mb-8 brutal-border bg-[color:var(--brutal-card)] p-3">
                  <AudioPlayer src={(post as any).audioUrl} title={post.title} />
                </div>
              ) : null}
              {post.type === 'video' && (post as any).videoDescription && (
                <p className="mb-6 text-base">{(post as any).videoDescription}</p>
              )}
              {post.type === 'audio' && (post as any).summary && (
                <p className="mb-6 text-base">{(post as any).summary}</p>
              )}
              <PostBody>
                <MDXRemote {...post.content} components={components} />
              </PostBody>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "externalUrl",
    "type",
    "youtubeId",
    "videoDescription",
    "soundcloudUrl",
    "audioUrl",
    "summary",
  ]);
  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [prism],
    },
  });

  return {
    props: {
      post: {
        ...post,
        content: mdxSource,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
