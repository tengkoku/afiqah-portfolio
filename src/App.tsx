import { PullCord } from 'pullcord';
import Hero from './components/site/Hero';
import TechStack from './components/site/TechStack';
import Experience from './components/site/Experience';
import Education from './components/site/Education';
import Footer from './components/site/Footer';
import SectionMark from './components/site/SectionMark';
import Lamp from './components/site/Lamp';
import { toggleTheme, useIsDark } from './hooks/useTheme';

export default function App() {
  const dark = useIsDark();

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Fixed to the viewport top; placed via --pullcord-* in index.css */}
      <PullCord onPull={toggleTheme} pulled={!dark} ariaLabel="Toggle theme" />
      <Lamp on={!dark} />
      <Hero />
      <main>
        <SectionMark />
        <TechStack />
        <SectionMark />
        <Experience />
        <SectionMark />
        <Education />
      </main>
      <SectionMark />
      <Footer />
    </div>
  );
}
