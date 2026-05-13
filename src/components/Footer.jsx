const links = ["Overview", "Process", "Interiors", "Contact"];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-12 text-ivory sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-medium tracking-[-0.03em]">Luxury Home Construction Experience</h2>
          <p className="mt-3 text-sm leading-6 text-stone">Designed as an immersive scroll-driven real estate story.</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-5 text-sm uppercase tracking-[0.22em] text-white/66">
            {links.map((link) => (
              <li key={link}>
                <a className="transition hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-4 focus:ring-offset-black" href={link === "Overview" ? "#" : "#story"}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-white/40">
        © 2026 Luxury Build Experience. All rights reserved.
      </div>
    </footer>
  );
}
