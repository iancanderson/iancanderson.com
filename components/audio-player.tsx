import { useEffect, useRef } from "react";

type Props = {
  src: string;
  title?: string;
  className?: string;
};

export default function AudioPlayer({ src, title, className }: Props) {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let player: any;
    let mounted = true;
    (async () => {
      try {
        const mod = await import("plyr");
        if (!mounted || !ref.current) return;
        const Plyr = mod.default || (mod as any);
        player = new Plyr(ref.current, {
          controls: [
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "download",
          ],
          invertTime: false,
        });
      } catch (_) {
        // No-op: fall back to native <audio> controls
      }
    })();
    return () => {
      mounted = false;
      try {
        if (player && typeof player.destroy === "function") player.destroy();
      } catch {}
    };
  }, [src]);

  return (
    <div className={className}>
      <audio ref={ref} className="w-full" controls preload="metadata" src={src} aria-label={title}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

