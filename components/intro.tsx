import Link from "next/link";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-12 md:mb-10">
      <h1 className="inline-block brutal-border bg-[color:var(--brutal-card)] px-3 py-2 text-3xl md:text-5xl font-extrabold tracking-tight text-[color:var(--brutal-fg)] md:pr-8">
        <Link href="/" className="no-underline text-[color:var(--brutal-fg)]">iancanderson</Link>
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        <Link href="/tags/software" className="brutal-link">programmer</Link>
        <span className="mx-2">|</span>
        <Link href="/tags/music" className="brutal-link">musician</Link>
        <span className="mx-2">|</span>
        <Link href="/tags/homebrewing" className="brutal-link">homebrewer</Link>
      </h4>
    </section>
  );
};

export default Intro;
