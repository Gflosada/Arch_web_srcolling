import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storyScenes } from "../data/storyScenes.js";

gsap.registerPlugin(ScrollTrigger);

const isReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function StoryScroll() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeScene = storyScenes[activeIndex];

  const setActiveScene = (index) => {
    const nextIndex = gsap.utils.clamp(0, storyScenes.length - 1, index);
    if (activeIndexRef.current === nextIndex) return;

    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isReducedMotion()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${storyScenes.length * 100}%`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(storyScenes.length - 1, Math.floor(self.progress * storyScenes.length));
          setActiveScene(nextIndex);
          gsap.set(progressRef.current, { scaleY: self.progress });
        },
        onRefresh: (self) => {
          const nextIndex = Math.min(storyScenes.length - 1, Math.floor(self.progress * storyScenes.length));
          setActiveScene(nextIndex);
          gsap.set(progressRef.current, { scaleY: self.progress });
        },
      });

      gsap.set(progressRef.current, { scaleY: 0, transformOrigin: "top center" });

      const refresh = () => ScrollTrigger.refresh();
      section.querySelectorAll("img").forEach((image) => image.addEventListener("load", refresh));

      return () => {
        section.querySelectorAll("img").forEach((image) => image.removeEventListener("load", refresh));
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-obsidian"
      aria-labelledby="story-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(200,155,92,0.18),transparent_34%),radial-gradient(circle_at_85%_55%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,#050505,#080605_48%,#050505)]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-dvh max-w-[1500px] items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(430px,0.95fr)] lg:gap-20 lg:px-12">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] border border-gold/20 bg-white/[0.04] shadow-luxury">
          {storyScenes.map((scene, index) => (
            <img
              key={`${scene.image}-${index}`}
              src={scene.image}
              alt={scene.alt}
              loading="eager"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition duration-700 ease-out will-change-transform ${
                activeIndex === index ? "z-10 opacity-100 scale-100" : "z-0 opacity-0 scale-[1.04]"
              }`}
            />
          ))}

          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/55 via-transparent to-black/20" aria-hidden="true" />
          <div className="absolute inset-0 z-20 rounded-[1.5rem] ring-1 ring-inset ring-white/10" aria-hidden="true" />

          <div className="absolute bottom-5 left-5 right-5 z-30 flex items-end justify-between gap-4 rounded-3xl border border-white/12 bg-black/35 p-4 backdrop-blur-xl sm:p-5">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.34em] text-gold">Current Step</p>
              <p className="mt-2 max-w-md font-display text-2xl leading-none text-ivory sm:text-3xl">
                {activeScene.title}
              </p>
            </div>
            <p className="font-display text-4xl text-white/60">{String(activeIndex + 1).padStart(2, "0")}</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute right-0 top-0 hidden h-full w-px bg-white/10 lg:block" aria-hidden="true">
            <span ref={progressRef} className="block h-full w-px origin-top bg-gold" />
          </div>

          <div className="max-w-3xl pr-0 lg:pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-gold">Immersive Interior Story</p>
            <h2 id="story-heading" className="sr-only">
              Pinned cinematic house story
            </h2>

            <div key={activeScene.title} className="mt-8 animate-[sceneFade_700ms_ease-out]">
              <div className="mb-7 flex items-center gap-4">
                <span className="font-display text-5xl leading-none text-gold/35">{String(activeIndex + 1).padStart(2, "0")}</span>
                <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">{activeScene.eyebrow}</p>
              </div>

              <h3 className="font-display text-5xl font-medium leading-[1.02] tracking-[-0.035em] text-ivory sm:text-6xl">
                {activeScene.title}
              </h3>
              <p className="mt-7 max-w-2xl text-base leading-8 text-stone sm:text-lg">
                {activeScene.description}
              </p>
              <ul className="mt-9 grid gap-3 sm:grid-cols-3">
                {activeScene.details.map((detail) => (
                  <li key={detail} className="rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-4 text-sm font-semibold text-ivory/86">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex gap-2" aria-hidden="true">
              {storyScenes.map((scene, index) => (
                <span
                  key={scene.title}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIndex === index ? "w-12 bg-gold" : "w-5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
