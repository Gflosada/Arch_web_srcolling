import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const backgroundWords = ["RESIDENCE", "CONSTRUCTION", "INTERIOR", "LUXURY", "DESIGN"];
const transitionImage = "/images/house-story/ChatGPT Image May 13, 2026, 12_49_14 PM.png";

export default function CinematicIntroTransition() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bgTextRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const captionPrimaryRef = useRef(null);
  const captionSecondaryRef = useRef(null);
  const cornerRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) {
      return undefined;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, {
        autoAlpha: 0,
        scale: 0.4,
        filter: isMobile ? "blur(8px)" : "blur(16px)",
        transformOrigin: "center center",
      });
      gsap.set(bgTextRef.current, { xPercent: isMobile ? -8 : -16 });
      gsap.set(cardRef.current, {
        autoAlpha: 0,
        width: isMobile ? "46vw" : "22vw",
        height: isMobile ? "5.5vh" : "6vh",
        scale: 0.8,
        borderRadius: 4,
        transformOrigin: "center center",
      });
      gsap.set(imageRef.current, { scale: 1.15 });
      gsap.set(captionPrimaryRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(captionSecondaryRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(cornerRefs.current, { autoAlpha: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(titleRef.current, {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.18,
          ease: "power3.out",
        })
        .to(bgTextRef.current, { xPercent: isMobile ? 8 : 16, duration: 1, ease: "none" }, 0)
        .to(titleRef.current, {
          scale: isMobile ? 1.35 : 2.05,
          autoAlpha: 0.34,
          duration: 0.32,
          ease: "power3.inOut",
        })
        .to(cardRef.current, {
          autoAlpha: 1,
          width: isMobile ? "56vw" : "28vw",
          height: isMobile ? "8vh" : "8vh",
          scale: 1,
          duration: 0.18,
          ease: "expo.out",
        }, "<0.04")
        .to(imageRef.current, { scale: 1, duration: 0.3, ease: "power3.out" }, "<")
        .to(captionPrimaryRef.current, { autoAlpha: 1, y: 0, duration: 0.14, ease: "power3.out" }, "<0.05")
        .to(cardRef.current, {
          width: isMobile ? "88vw" : "78vw",
          height: isMobile ? "38vh" : "58vh",
          borderRadius: isMobile ? 10 : 12,
          duration: 0.28,
          ease: "power4.inOut",
        })
        .to(cornerRefs.current, { autoAlpha: 1, stagger: 0.02, duration: 0.12 }, "<0.08")
        .to(captionPrimaryRef.current, { autoAlpha: 0, y: -14, duration: 0.12 }, "<0.04")
        .to(captionSecondaryRef.current, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power3.out" }, ">-0.04")
        .to(cardRef.current, {
          width: isMobile ? "92vw" : "calc(100vw - 64px)",
          height: isMobile ? "56vh" : "calc(100vh - 112px)",
          scale: 1,
          duration: 0.32,
          ease: "power4.inOut",
        })
        .to(titleRef.current, { autoAlpha: 0.12, scale: isMobile ? 1.55 : 2.35, duration: 0.2 }, "<")
        .to(captionSecondaryRef.current, { autoAlpha: 0, y: -18, duration: 0.14 }, ">-0.08");

      const refresh = () => ScrollTrigger.refresh();
      imageRef.current?.addEventListener("load", refresh);

      return () => {
        imageRef.current?.removeEventListener("load", refresh);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cinematic-transition" aria-label="Cinematic transition into the build story">
      <div className="transition-bg-text" ref={bgTextRef} aria-hidden="true">
        {backgroundWords.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </div>

      <h2 className="transition-title" ref={titleRef}>
        THE BUILD
      </h2>

      <figure className="transition-card" ref={cardRef}>
        <img
          ref={imageRef}
          src={transitionImage}
          alt="Empty residential lot prepared for a luxury modern home construction project"
        />
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((position, index) => (
          <span
            key={position}
            ref={(node) => {
              cornerRefs.current[index] = node;
            }}
            className={`corner-mark corner-mark-${position}`}
            aria-hidden="true"
          />
        ))}
      </figure>

      <div className="transition-caption" aria-live="polite">
        <p ref={captionPrimaryRef}>From vision to structure.</p>
        <p ref={captionSecondaryRef}>A luxury residence takes shape.</p>
      </div>
    </section>
  );
}
