import './landing.css';
import './about.css';
import { useEffect } from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutPillarsAndModel } from '@/components/about/AboutPillarsAndModel';
import { SiteNavigation } from '@/components/layout/SiteNavigation';
import { Footer } from '@/components/landing/LandingBottomSections';

export default function AboutPage() {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="ab-page-shell">
      <SiteNavigation />

      <main>
        <AboutHero />
        <AboutStory />
        <AboutPillarsAndModel />
      </main>

      <Footer />
    </div>
  );
}
