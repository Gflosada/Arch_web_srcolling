import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudyCards } from "../data/caseStudyCards.js";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function GoldCorners() {
  return (
    <div className="case-card-corners pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      <span className="absolute left-4 top-4 h-[34px] w-[34px] border-l-2 border-t-2 border-[rgba(210,170,100,0.85)]" />
      <span className="absolute right-4 top-4 h-[34px] w-[34px] border-r-2 border-t-2 border-[rgba(210,170,100,0.85)]" />
      <span className="absolute bottom-4 left-4 h-[34px] w-[34px] border-b-2 border-l-2 border-[rgba(210,170,100,0.85)]" />
      <span className="absolute bottom-4 right-4 h-[34px] w-[34px] border-b-2 border-r-2 border-[rgba(210,170,100,0.85)]" />
    </div>
  );
}

const CaseCard = forwardRef(function CaseCard({ card, index }, ref) {
  const isReversed = index % 2 === 1;

  return (
    <article ref={ref} className="case-card grid min-h-[78vh] w-full items-center gap-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-luxury backdrop-blur-xl will-change-transform md:absolute md:inset-0 md:min-h-0 md:opacity-0 md:p-5 lg:grid-cols-2 lg:gap-8 lg:p-6">
      <div className={`case-card-image-wrap relative aspect-[16/10] overflow-hidden rounded-md bg-black shadow-2xl shadow-black/50 ${isReversed ? "lg:order-2" : ""}`}>
        <img
          className="case-card-image h-full w-full object-cover will-change-transform"
          src={card.image}
          alt={card.alt}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" aria-hidden="true" />
        <GoldCorners />
      </div>

      <div className={`case-card-content px-1 py-2 md:px-2 ${isReversed ? "lg:order-1" : ""}`}>
        <p className="case-card-eyebrow text-xs font-semibold uppercase tracking-[0.38em] text-gold">{card.eyebrow}</p>
        <p className="case-card-label mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/45">
          {card.label}
        </p>
        <h3 className="case-card-title mt-4 font-display text-4xl font-medium leading-[0.95] tracking-[-0.045em] text-ivory sm:text-5xl lg:text-[clamp(2.65rem,3.8vw,4.6rem)]">
          {card.title}
        </h3>
        <p className="case-card-description mt-4 max-w-xl text-base leading-7 text-stone sm:text-[1.05rem]">
          {card.description}
        </p>

        <div className="case-card-stats mt-5 grid grid-cols-3 gap-3 border-t border-white/12 pt-4">
          {card.stats.map((stat) => (
            <div key={stat.label} className="case-stat rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/42">{stat.label}</p>
              <p className="mt-1.5 font-display text-2xl text-ivory">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="case-card-price mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-gold/80">{card.priceLabel}</p>
            <p className="mt-1.5 font-display text-[2.35rem] leading-none text-ivory">{card.price}</p>
          </div>
          <a href="#footer" className="text-xs font-semibold uppercase tracking-[0.32em] text-gold transition hover:text-ivory focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-4 focus:ring-offset-black">
            Discover →
          </a>
        </div>
      </div>
    </article>
  );
});

export default function CompleteCaseStudyScroll() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const cardRefs = useRef([]);
  const backgroundTextRef = useRef(null);
  const closingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canPin = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

    if (!section || !canPin || prefersReducedMotion()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".case-card");
      const introParts = [".case-eyebrow", ".case-headline", ".case-description"];

      gsap.set(introParts, { autoAlpha: 0, y: 40, filter: "blur(10px)" });
      gsap.set(cardsWrapRef.current, { autoAlpha: 0 });
      gsap.set(cards, {
        position: "absolute",
        inset: 0,
        opacity: 0,
        y: 240,
        scale: 0.92,
        filter: "blur(8px)",
      });
      gsap.set(".case-card-image-wrap", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".case-card-image", { scale: 1.1 });
      gsap.set(".case-card-content > *", { autoAlpha: 0, y: 28 });
      gsap.set(closingRef.current, { autoAlpha: 0, y: 40, filter: "blur(8px)" });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(".case-eyebrow", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45 })
        .to(".case-headline", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.62 }, "-=0.16")
        .to(".case-description", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.48 }, "-=0.18")
        .to(introRef.current, { y: -18, autoAlpha: 0.24, scale: 1.03, filter: "blur(2px)", duration: 0.7 }, "+=0.38")
        .to(cardsWrapRef.current, { autoAlpha: 1, duration: 0.32 }, "<0.12")
        .to(backgroundTextRef.current, { xPercent: -10, duration: 5.4, ease: "none" }, 0);

      cards.forEach((card, index) => {
        const imageWrap = card.querySelector(".case-card-image-wrap");
        const image = card.querySelector(".case-card-image");
        const contentItems = card.querySelectorAll(".case-card-content > *");

        if (index === 0) {
          timeline
            .to(card, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.72 }, "-=0.12")
            .to(imageWrap, { clipPath: "inset(0 0% 0 0)", duration: 0.62 }, "<0.08")
            .to(image, { scale: 1, duration: 0.72 }, "<")
            .to(contentItems, { autoAlpha: 1, y: 0, stagger: 0.055, duration: 0.42 }, "<0.22");
          return;
        }

        const previous = cards[index - 1];
        timeline
          .to(previous, { y: -130, opacity: 0.22, scale: 0.92, filter: "blur(2px)", duration: 0.58 }, "+=0.44")
          .to(card, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.68 }, "<0.1")
          .to(imageWrap, { clipPath: "inset(0 0% 0 0)", duration: 0.56 }, "<0.08")
          .to(image, { scale: 1, duration: 0.68 }, "<")
          .to(contentItems, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.38 }, "<0.18");
      });

      timeline
        .to(cards[cards.length - 1], { y: -105, opacity: 0.18, scale: 0.94, filter: "blur(2px)", duration: 0.55 }, "+=0.5")
        .to(closingRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.56 }, "<0.18");

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
      ref={sectionRef}
      className="complete-case-study relative overflow-hidden bg-[#030303] px-5 py-24 text-ivory sm:px-8 lg:min-h-screen lg:px-12 lg:py-0"
      aria-labelledby="case-study-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_38%,rgba(165,111,52,0.24),transparent_34%),radial-gradient(circle_at_78%_28%,rgba(255,255,255,0.06),transparent_26%),linear-gradient(90deg,#050505_0%,#070504_48%,#030303_100%)]" aria-hidden="true" />

      <div ref={backgroundTextRef} className="case-bg-text pointer-events-none absolute left-[-8vw] top-[9vh] z-0 hidden select-none whitespace-nowrap font-display text-[15vw] font-semibold leading-none tracking-[-0.08em] text-white/[0.035] md:block">
        COMPLETE STORY&nbsp;&nbsp;RESIDENCE&nbsp;&nbsp;FOUNDATION TO FINISH
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-center py-16 lg:py-0">
        <div ref={introRef} className="case-intro mx-auto max-w-[1040px] text-center will-change-transform">
          <p className="case-eyebrow text-xs font-semibold uppercase tracking-[0.42em] text-gold">Complete Case Study</p>
          <h2 id="case-study-heading" className="case-headline mx-auto mt-6 max-w-[980px] font-display text-[clamp(3rem,7vw,8rem)] font-medium leading-[0.88] tracking-[-0.06em] text-ivory">
            A Complete Journey From Foundation to Finish
          </h2>
          <p className="case-description mx-auto mt-8 max-w-[860px] text-lg leading-[1.8] text-stone sm:text-xl lg:text-[1.28rem]">
            This immersive experience captures the full transformation of a luxury modern residence — from site preparation and structural build-out to refined interior design and seamless indoor-outdoor living.
          </p>
        </div>

        <div ref={cardsWrapRef} className="case-cards-stage relative mx-auto mt-16 grid w-full gap-8 md:absolute md:left-1/2 md:top-1/2 md:mt-0 md:h-[64vh] md:min-h-[500px] md:w-[min(88vw,1500px)] md:-translate-x-1/2 md:-translate-y-1/2 md:opacity-0">
          {caseStudyCards.map((card, index) => (
            <CaseCard
              key={card.title}
              card={card}
              index={index}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
            />
          ))}
        </div>

        <p ref={closingRef} className="case-closing z-20 mt-12 text-center font-display text-4xl font-medium tracking-[-0.04em] text-ivory md:pointer-events-none md:absolute md:inset-x-5 md:bottom-[12vh] md:mt-0 md:opacity-0 sm:text-6xl">
          Every phase becomes part of the story.
        </p>
      </div>
    </section>
  );
}
