import Head from "next/head";
import Layout from "../components/layout";
import Container from "../components/container";
import Header from "../components/header";

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <script type="text/javascript" src="/handle404.js"></script>
      </Head>
      <Container>
        <Header />
        <h2 className="text-2xl font-semibold mb-6">404 - Page Not Found</h2>
        <p>Sorry, we couldn&apos;t find that page.</p>
      </Container>
    </Layout>
  );
}
