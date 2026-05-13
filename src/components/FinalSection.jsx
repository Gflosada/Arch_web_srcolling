import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Construction Storytelling",
    text: "A visual narrative that turns the build process into a premium cinematic experience.",
  },
  {
    title: "Scroll-Controlled Video",
    text: "The opening video responds directly to user scroll for a more immersive journey.",
  },
  {
    title: "Luxury Interior Showcase",
    text: "Each room is presented with refined copy, premium visuals, and smooth motion transitions.",
  },
];

export default function FinalSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".final-reveal", {
        autoAlpha: 0,
        y: 56,
        filter: "blur(12px)",
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 62%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#080808] px-5 py-24 sm:px-8 lg:px-12" ref={sectionRef} aria-labelledby="final-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_30%,rgba(200,155,92,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.07),transparent_42%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="final-reveal max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-gold">Complete Case Study</p>
          <h2 id="final-heading" className="mt-5 font-display text-5xl font-medium leading-[0.96] tracking-[-0.045em] text-ivory sm:text-7xl">
            A Complete Journey From Foundation to Finish
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-stone">
            This immersive experience captures the full transformation of a luxury modern residence — from site preparation and structural build-out to refined interior design and seamless indoor-outdoor living.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <article key={card.title} className="final-reveal rounded-[1.75rem] border border-white/12 bg-white/[0.055] p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:border-gold/40">
              <p className="font-display text-4xl text-gold/75">0{index + 1}</p>
              <h3 className="mt-8 text-xl font-semibold text-ivory">{card.title}</h3>
              <p className="mt-4 leading-7 text-stone">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
