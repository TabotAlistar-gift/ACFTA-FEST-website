import { useState } from 'react';
import { ArrowUpRight, Crown, Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import CheckoutModal, { type CheckoutTicket } from '@/pages/CheckoutModal';
import { TicketFaq } from '@/components/tickets/TicketFaq';
import { TicketHero } from '@/components/tickets/TicketHero';
import { TicketShowcase } from '@/components/tickets/TicketShowcase';
import './ticket.css';

export default function TicketPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPass, setSelectedPass] = useState<CheckoutTicket | null>(null);

  return (
    <div className="tk-page">
      {/* ── Top Navigation Bar ── */}
      <header className="tk-topbar">
        <Link href="/" className="tk-brand" aria-label="ACFTA Fest Home">
          <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
        </Link>

        <nav className={`tk-nav ${menuOpen ? 'is-open' : ''}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Festival Home</Link>
          <a href="#passes" onClick={() => setMenuOpen(false)}>Ticket Options</a>
          <Link href="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          <Link href="/partnership" onClick={() => setMenuOpen(false)}>Partnerships</Link>
          <a
            className="tk-nav-cta"
            href="#passes"
            onClick={() => setMenuOpen(false)}
          >
            <span>Get Tickets</span>
            <Crown size={14} />
          </a>
        </nav>

        <button
          type="button"
          className="tk-menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        {/* ── Left-Aligned Atmospheric Hero with Logo & Rotatable Surrounding Text (No Card Box) ── */}
        <TicketHero />

        {/* ── Credential Showcase (Flagship VIP + Ticket 1 & Ticket 2) ── */}
        <TicketShowcase onSelectPass={(pass) => setSelectedPass(pass)} />

        {/* ── White Background FAQ ── */}
        <TicketFaq />
      </main>

      {/* ── Minimal Ticket Page Footer ── */}
      <footer className="tk-footer">
        <div className="tk-footer-inner">
          <Link href="/" className="tk-footer-logo">
            <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
          </Link>
          <p className="tk-footer-motto">One Africa. One Market. One Future.</p>
          <div className="tk-footer-links">
            <a href="mailto:info@acftafest.com">
              <span>info@acftafest.com</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </footer>

      {/* ── Responsive Checkout Modal ── */}
      <CheckoutModal
        ticket={selectedPass}
        onClose={() => setSelectedPass(null)}
      />
    </div>
  );
}
