import './landing.css';
import './about.css';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutPillarsAndModel } from '@/components/about/AboutPillarsAndModel';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about', active: true },
  { label: 'The Event', href: '/#event' },
  { label: 'Buy a Stand', href: '/buy-a-stand' },
  { label: 'Partnerships', href: '/partnership' },
  { label: 'Register', href: '/register' },
];

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="ab-page-shell">
      {/* ── Responsive Header: Horizontal Navbar on Desktop, Hamburger Menu on Mobile ── */}
      <header className="ab-header">
        <div className="ab-header-inner">
          <Link href="/" className="ab-brand-link" aria-label="ACFTA Fest Home">
            <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
          </Link>

          {/* Desktop Horizontal Navigation Bar */}
          <nav className="ab-desktop-nav" aria-label="Main navigation">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.active ? 'is-active' : ''}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/tickets" className="ab-nav-ticket">
              <span>Get a Ticket</span>
              <ArrowUpRight size={14} />
            </Link>
          </nav>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            className="ab-menu-toggle"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Hamburger Drawer */}
        <div className={`ab-mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                <span className="ab-mobile-idx">0{idx + 1}</span>
                <span>{item.label}</span>
                <ArrowUpRight size={16} />
              </Link>
            ))}
            <Link
              href="/tickets"
              className="ab-mobile-ticket"
              onClick={() => setMenuOpen(false)}
            >
              <span>Get a Ticket</span>
              <ArrowUpRight size={16} />
            </Link>
          </nav>
          <p>One Africa. One market. One future.</p>
        </div>
      </header>

      <main>
        <AboutHero />
        <AboutStory />
        <AboutPillarsAndModel />
      </main>

      {/* ── Dedicated About Us Page Footer (Does Not Repeat "About Us") ── */}
      <footer className="ab-footer">
        <div className="ab-container ab-footer-inner">
          <div className="ab-footer-top">
            <div className="ab-footer-brand">
              <Link href="/" className="ab-brand-link" aria-label="ACFTA Fest Home">
                <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
              </Link>
              <p className="ab-footer-tagline">
                One Africa · One Market · One Future · Banjul, The Gambia
              </p>
            </div>

            <nav className="ab-footer-nav" aria-label="Footer navigation">
              <Link href="/">Festival Home</Link>
              <Link href="/register">Register</Link>
              <Link href="/tickets">Get Tickets</Link>
              <Link href="/buy-a-stand">Buy a Stand</Link>
              <Link href="/partnership">Partnerships</Link>
              <a href="mailto:info@acftafest.com">
                <span>info@acftafest.com</span>
                <ArrowUpRight size={13} />
              </a>
            </nav>
          </div>

          <div className="ab-footer-bottom">
            <span>&copy; {new Date().getFullYear()} ACFTA Fest. All rights reserved.</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ab-back-top"
            >
              <span>Back to top</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
