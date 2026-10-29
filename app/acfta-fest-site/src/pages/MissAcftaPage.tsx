import './landing.css';
import './miss-acfta.css';
import { useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Crown } from 'lucide-react';
import { SiteNavigation } from '@/components/layout/SiteNavigation';
import { Footer } from '@/components/landing/LandingBottomSections';
import {
  MissAboutSection,
  MissEligibilityAndInterestSection,
  MissFaqSection,
  MissJourneySection,
} from '@/components/miss-acfta/MissAcftaSections';

export default function MissAcftaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ma-page">
      <SiteNavigation />

      <main>
        {/* ── A. Hero Section ── */}
        <section className="ma-hero" aria-labelledby="miss-acfta-hero-title">
          <div className="ma-hero-underlay" aria-hidden="true">
            <img
              src="/images/heritage-waves.webp"
              alt="Black African women celebrating cultural heritage and leadership at ACFTA Fest"
              className="ma-hero-underlay-img"
            />
            <div className="ma-hero-underlay-gradient" />
          </div>

          <div className="ma-container ma-hero-content">
            <div className="ma-hero-copy">
              <div className="ma-hero-badge">
                <Crown size={14} />
                <span>CULTURAL &amp; LEADERSHIP SHOWCASE · ACFTA FEST</span>
              </div>

              <h1 id="miss-acfta-hero-title" className="ma-hero-title">
                Miss <span className="ma-title-gold">ACFTA Fest.</span>
              </h1>

              <p className="ma-hero-subtitle">
                Celebrating the elegance, confidence, talent, cultural pride, and visionary leadership of
                African women—representing one continent, one voice, and one shared future on the ACFTA Fest stage.
              </p>

              <div className="ma-hero-actions">
                <a
                  href="#register-interest"
                  className="ma-btn ma-btn-gold"
                  data-testid="button-miss-hero-register"
                >
                  <span>Register Interest</span>
                  <ArrowUpRight size={15} />
                </a>
                <a
                  href="#miss-journey"
                  className="ma-btn ma-btn-outline"
                  data-testid="button-miss-hero-journey"
                >
                  <span>Discover the Journey</span>
                  <ArrowDown size={15} />
                </a>
              </div>
            </div>

            <div className="ma-hero-feature-card">
              <span className="ma-feature-kicker">THE CONTINENTAL STAGE</span>
              <h2>Culture, Confidence &amp; Continental Representation</h2>
              <p>
                Anchored within ACFTA Fest’s cultural programming, Miss ACFTA Fest brings together heritage,
                purpose-driven leadership, and creative excellence in one unforgettable celebration.
              </p>
              <div className="ma-feature-tags">
                <span>African Identity</span>
                <span>Women’s Leadership</span>
                <span>Cultural Diplomacy</span>
                <span>Talent &amp; Poise</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── B. About Miss ACFTA Fest ── */}
        <MissAboutSection />

        {/* ── C. The Journey: How to Participate (01 – 05) ── */}
        <MissJourneySection />

        {/* ── D & E. Eligibility, Application Status & Expression of Interest ── */}
        <MissEligibilityAndInterestSection />

        {/* ── F & G. FAQ Accordion & Final CTA ── */}
        <MissFaqSection />
      </main>

      <Footer />
    </div>
  );
}
