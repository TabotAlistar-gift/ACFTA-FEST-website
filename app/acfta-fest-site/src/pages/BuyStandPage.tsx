import './landing.css';
import './stand.css';
import { useEffect, useState } from 'react';
import { StandHero } from '@/components/stands/StandHero';
import { StandShowcase } from '@/components/stands/StandShowcase';
import { StandInfoSection } from '@/components/stands/StandInfoSection';
import CheckoutModal, { type CheckoutTicket } from '@/pages/CheckoutModal';
import { SiteNavigation } from '@/components/layout/SiteNavigation';
import { Footer } from '@/components/landing/LandingBottomSections';

export default function BuyStandPage() {
  const [selectedStand, setSelectedStand] = useState<CheckoutTicket | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="st-page-root">
      <SiteNavigation />

      <main>
        <StandHero />
        <StandShowcase onSelectStand={(stand) => setSelectedStand(stand)} />
        <StandInfoSection />
      </main>

      <Footer />

      <CheckoutModal
        ticket={selectedStand}
        onClose={() => setSelectedStand(null)}
      />
    </div>
  );
}
