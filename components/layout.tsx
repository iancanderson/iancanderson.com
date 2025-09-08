import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import WeirdBanner from "./weird-banner";
import Marquee from "./marquee";
import { useEffect } from "react";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  // Add a subtle scroll state class to jiggle cards while scrolling
  useEffect(() => {
    let t: any;
    const onScroll = () => {
      document.body.classList.add("is-scrolling");
      clearTimeout(t);
      t = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initialize random jiggle vars for cards
    const seedJiggle = () => {
      try {
        const cards = Array.from(document.querySelectorAll<HTMLElement>('.weird-card'));
        cards.forEach((el, i) => {
          const rnd = Math.random();
          const delay = Math.floor(rnd * 120);
          const duration = 200 + Math.floor(Math.random() * 120);
          const rot = (0.9 + Math.random() * 1.3).toFixed(2); // 0.9deg - 2.2deg
          const amp = (2 + Math.random() * 3).toFixed(1); // 2px - 5px
          el.style.setProperty('--j-delay', `${delay}ms`);
          el.style.setProperty('--j-duration', `${duration}ms`);
          el.style.setProperty('--j-rot', `${rot}deg`);
          el.style.setProperty('--j-amp', `${amp}px`);
        });
      } catch {}
    };
    seedJiggle();
    return () => {
      window.removeEventListener("scroll", onScroll as any);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {preview && <Alert />}
        <main className="px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
          <WeirdBanner />
          <Marquee />
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
