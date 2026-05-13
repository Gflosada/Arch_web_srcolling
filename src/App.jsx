import HeroVideoScroll from "./components/HeroVideoScroll.jsx";
import CinematicIntroTransition from "./components/CinematicIntroTransition.jsx";
import StoryScroll from "./components/StoryScroll.jsx";
import FinalSection from "./components/FinalSection.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-obsidian text-ivory">
      <HeroVideoScroll />
      <CinematicIntroTransition />
      <StoryScroll />
      <FinalSection />
      <Footer />
    </main>
  );
}
