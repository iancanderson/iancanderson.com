import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <script type="text/javascript" src="/handle404.js"></script>
      </Head>
      <h1>404 - Page Not Found</h1>
    </>
  );
}
