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

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

const Img = ({ src, ...props }: any) => {
  const isProd = process.env.CI === "true";
  const prefixedSrc = isProd ? `/iancanderson.com/${src}` : src;
  return <img src={prefixedSrc} {...props} />;
};

const components = {
  Image: Img,
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
