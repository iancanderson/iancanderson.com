import Link from "next/link";

const Header = () => {
  return (
    <div className="mt-6 mb-10 text-left">
      <h1 className="inline-block brutal-border bg-[color:var(--brutal-card)] px-3 py-2 text-3xl md:text-5xl font-extrabold tracking-tight text-[color:var(--brutal-fg)]">
        <Link href="/" className="no-underline text-[color:var(--brutal-fg)]">
          iancanderson
        </Link>
      </h1>
      <div className="text-lg mt-4">
        <Link href="/tags/software" className="brutal-link">programmer</Link>
        <span className="mx-2">|</span>
        <Link href="/tags/music" className="brutal-link">musician</Link>
        <span className="mx-2">|</span>
        <Link href="/tags/homebrewing" className="brutal-link">homebrewer</Link>
      </div>
    </div>
  );
};

export default Header;
