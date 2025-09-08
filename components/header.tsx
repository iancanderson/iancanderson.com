import Link from "next/link";

const Header = () => {
  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-5xl mx-auto mt-6 mb-10 text-left">
      <h1 className="inline-block brutal-border bg-[color:var(--brutal-card)] px-3 py-2 text-3xl md:text-5xl font-extrabold tracking-tight text-[color:var(--brutal-fg)]">
        <Link href="/" className="no-underline text-[color:var(--brutal-fg)]">
          iancanderson
        </Link>
      </h1>
    </div>
  );
};

export default Header;
