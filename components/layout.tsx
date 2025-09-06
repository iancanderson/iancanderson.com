import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {preview && <Alert />}
        <main className="px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
