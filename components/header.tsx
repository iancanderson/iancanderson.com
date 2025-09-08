import Link from "next/link";

const Header = () => {
  return (
    <div className="mt-6 mb-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <h2 className="inline-block brutal-border bg-[color:var(--brutal-card)] px-3 py-2 text-3xl md:text-5xl font-extrabold tracking-tight text-[color:var(--brutal-fg)] self-center md:self-start text-center md:text-left">
          <Link href="/" className="no-underline text-[color:var(--brutal-fg)]">
            iancanderson
          </Link>
        </h2>
        <div className="text-lg mt-4 md:mt-0 self-center md:self-end text-center md:text-right">
          <Link href="/tags/software" className="brutal-link">programmer</Link>
          <span className="mx-2">|</span>
          <Link href="/tags/music" className="brutal-link">musician</Link>
          <span className="mx-2">|</span>
          <Link href="/tags/homebrewing" className="brutal-link">homebrewer</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
