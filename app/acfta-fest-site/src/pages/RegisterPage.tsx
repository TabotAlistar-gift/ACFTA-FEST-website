import { useEffect, useState } from 'react';
import { ArrowUpRight, Crown, Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { RegisterHero } from '@/components/register/RegisterHero';
import { RegisterTracks } from '@/components/register/RegisterTracks';
import './register.css';

export default function RegisterPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="reg-page-shell">
      {/* ── Top Bar with Hamburger Menu ── */}
      <header className="reg-topbar">
        <div className="reg-topbar-inner">
          <Link href="/" className="reg-brand" aria-label="ACFTA Fest Home">
            <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
          </Link>

          <button
            type="button"
            className="reg-hamburger-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span>Menu</span>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Hamburger Navigation Drawer */}
        <div className={`reg-hamburger-drawer ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
          <nav className="reg-drawer-nav" aria-label="Register page navigation">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <span className="reg-drawer-idx">01</span>
              <span>Festival Home</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              <span className="reg-drawer-idx">02</span>
              <span>About Us</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/tickets" onClick={() => setMenuOpen(false)}>
              <span className="reg-drawer-idx">03</span>
              <span>Tickets</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/partnership" onClick={() => setMenuOpen(false)}>
              <span className="reg-drawer-idx">04</span>
              <span>Partnerships</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/tickets"
              className="reg-drawer-cta"
              onClick={() => setMenuOpen(false)}
            >
              <span>Get Tickets</span>
              <Crown size={15} />
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Atmospheric Hero with Underlay Picture ── */}
        <RegisterHero />

        {/* ── Pathway Selection List (Navigates to Dedicated Pathway Subpages) ── */}
        <RegisterTracks />
      </main>

      {/* ── Minimal Footer ── */}
      <footer className="reg-footer">
        <div className="reg-footer-inner">
          <Link href="/" className="reg-footer-logo">
            <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
          </Link>
          <p className="reg-footer-motto">One Africa · One Market · One Future · Banjul 2026</p>
          <a href="mailto:registration@acftafest.com" className="reg-footer-email">
            <span>registration@acftafest.com</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}
