import Link from "next/link";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-12 md:mb-10">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <Link href="/" className="hover:underline">iancanderson</Link>
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        programmer and musician
      </h4>
    </section>
  );
};

export default Intro;
