import HeroVideoScroll from "./components/HeroVideoScroll.jsx";
import CinematicIntroTransition from "./components/CinematicIntroTransition.jsx";
import StoryScroll from "./components/StoryScroll.jsx";
import CompleteCaseStudyScroll from "./components/CompleteCaseStudyScroll.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-obsidian text-ivory">
      <HeroVideoScroll />
      <CinematicIntroTransition />
      <StoryScroll />
      <CompleteCaseStudyScroll />
      <Footer />
    </main>
  );
}
