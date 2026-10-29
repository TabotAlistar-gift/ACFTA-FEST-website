import './stand.css';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { StandHero } from '@/components/stands/StandHero';
import { StandShowcase } from '@/components/stands/StandShowcase';
import { StandInfoSection } from '@/components/stands/StandInfoSection';
import CheckoutModal, { type CheckoutTicket } from '@/pages/CheckoutModal';

export default function BuyStandPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStand, setSelectedStand] = useState<CheckoutTicket | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="st-page-root">
      {/* Top Bar with Hamburger Menu Drawer */}
      <header className="st-topbar">
        <div className="st-topbar-inner">
          <Link href="/" className="st-brand-link" aria-label="ACFTA Fest Home">
            <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" className="st-brand-logo" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="st-hamburger-btn"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <div className="st-menu-drawer">
            <nav className="st-menu-drawer-nav" aria-label="Buy a Stand Navigation">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Festival Home
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                About Us
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
              <Link href="/tickets" onClick={() => setMenuOpen(false)}>
                Tickets
              </Link>
              <Link href="/partnership" onClick={() => setMenuOpen(false)}>
                Partnerships
              </Link>
              <Link href="/tickets" className="st-drawer-cta" onClick={() => setMenuOpen(false)}>
                Get Tickets
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main>
        <StandHero />
        <StandShowcase onSelectStand={(stand) => setSelectedStand(stand)} />
        <StandInfoSection />
      </main>

      <footer className="st-footer-min">
        <div className="st-footer-inner">
          <Link href="/" className="st-footer-brand">
            <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
          </Link>
          <p className="st-footer-copy">
            &copy; {new Date().getFullYear()} ACFTA Fest · Banjul, The Gambia. Exhibition Desk:{' '}
            <a href="mailto:shop@acftafest.africa">shop@acftafest.africa</a> &amp;{' '}
            <a href="mailto:vendors@acftafest.com">vendors@acftafest.com</a>
          </p>
        </div>
      </footer>

      <CheckoutModal
        ticket={selectedStand}
        onClose={() => setSelectedStand(null)}
      />
    </div>
  );
}
