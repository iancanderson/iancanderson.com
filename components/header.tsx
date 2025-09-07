import Link from "next/link";

const Header = () => {
  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-5xl mx-auto mt-6 mb-10">
      <h1 className="inline-block brutal-border bg-[color:var(--brutal-card)] px-3 py-2 text-2xl md:text-4xl font-extrabold tracking-tight text-[color:var(--brutal-fg)]">
        <Link href="/" legacyBehavior>
          <a className="no-underline text-[color:var(--brutal-fg)]">iancanderson</a>
        </Link>
      </h1>
    </div>
  );
};

export default Header;
