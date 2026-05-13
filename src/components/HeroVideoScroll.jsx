import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroVideoScroll() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video || prefersReducedMotion()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const setVideoTime = (progress) => {
        const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 8;
        video.currentTime = gsap.utils.clamp(0, duration, progress * duration);
      };

      video.pause();
      video.currentTime = 0;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setVideoTime(self.progress),
        },
      });

      timeline
        .to(overlayRef.current, { opacity: 0.38, duration: 0.55 }, 0)
        .to(contentRef.current, { autoAlpha: 0, y: -90, filter: "blur(14px)", duration: 0.36 }, 0.08)
        .to(section.querySelector(".hero-grain"), { opacity: 0.16, duration: 1 }, 0);

      const refresh = () => ScrollTrigger.refresh();
      video.addEventListener("loadedmetadata", refresh);
      video.addEventListener("loadeddata", refresh);

      return () => {
        video.removeEventListener("loadedmetadata", refresh);
        video.removeEventListener("loadeddata", refresh);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const handleExplore = () => {
    const nextSection = document.getElementById("story");
    nextSection?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Cinematic construction fly-through"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/house-construction-flyby.mp4"
        muted
        playsInline
        preload="auto"
        poster="/images/house-story/01-empty-lot.png"
        aria-label="Scroll-controlled fly-through of a luxury home construction journey"
      />

      <div ref={overlayRef} className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div className="hero-grain absolute inset-0 opacity-25 mix-blend-soft-light" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(200,155,92,0.28),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.15),rgba(5,5,5,0.75))]" />

      <div className="relative z-10 flex min-h-screen items-center px-5 py-24 sm:px-8 lg:px-12">
        <div ref={contentRef} className="mx-auto max-w-6xl text-center will-change-transform">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.48em] text-gold sm:text-sm">
            Cinematic Build Story
          </p>
          <h1 className="font-display text-5xl font-medium leading-[0.92] tracking-[-0.05em] text-ivory sm:text-7xl lg:text-8xl">
            From Vacant Lot to Finished Luxury Home
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-stone sm:text-lg">
            An immersive construction journey powered by cinematic scroll storytelling.
          </p>
          <button
            type="button"
            onClick={handleExplore}
            className="mt-10 rounded-full border border-white/15 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-ivory backdrop-blur transition hover:border-gold/70 hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
          >
            Explore the Build
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.36em] text-white/60">
        <span>Scroll to explore</span>
        <span className="h-12 w-px overflow-hidden bg-white/20">
          <span className="block h-1/2 w-full animate-scrollCue bg-gold" />
        </span>
      </div>
    </section>
  );
}
