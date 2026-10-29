import './landing.css';
import './register.css';
import { useEffect } from 'react';
import { RegisterHero } from '@/components/register/RegisterHero';
import { RegisterTracks } from '@/components/register/RegisterTracks';
import { SiteNavigation } from '@/components/layout/SiteNavigation';
import { Footer } from '@/components/landing/LandingBottomSections';

export default function RegisterPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="reg-page-shell">
      <SiteNavigation />

      <main>
        <RegisterHero />
        <RegisterTracks />
      </main>

      <Footer />
    </div>
  );
}
