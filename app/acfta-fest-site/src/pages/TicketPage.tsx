import './landing.css';
import './ticket.css';
import { useState } from 'react';
import CheckoutModal, { type CheckoutTicket } from '@/pages/CheckoutModal';
import { TicketFaq } from '@/components/tickets/TicketFaq';
import { TicketHero } from '@/components/tickets/TicketHero';
import { TicketShowcase } from '@/components/tickets/TicketShowcase';
import { SiteNavigation } from '@/components/layout/SiteNavigation';
import { Footer } from '@/components/landing/LandingBottomSections';

export default function TicketPage() {
  const [selectedPass, setSelectedPass] = useState<CheckoutTicket | null>(null);

  return (
    <div className="tk-page">
      <SiteNavigation />

      <main>
        <TicketHero />
        <TicketShowcase onSelectPass={(pass) => setSelectedPass(pass)} />
        <TicketFaq />
      </main>

      <Footer />

      <CheckoutModal
        ticket={selectedPass}
        onClose={() => setSelectedPass(null)}
      />
    </div>
  );
}
