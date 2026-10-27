import { useState } from 'react';
import { ArrowUpRight, Crown, Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { REGISTRATION_STREAMS, type StreamKey } from '@/data/registerData';
import { RegisterHero } from '@/components/register/RegisterHero';
import { RegisterTracks } from '@/components/register/RegisterTracks';
import { RegisterPortal, type RegisterFormData } from '@/components/register/RegisterPortal';
import { RegisterSuccess } from '@/components/register/RegisterSuccess';
import './register.css';

export default function RegisterPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<StreamKey>('delegate');
  const [portalOpen, setPortalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegisterFormData | null>(null);

  const activeStream =
    REGISTRATION_STREAMS.find((s) => s.key === selectedKey) || REGISTRATION_STREAMS[0];

  const handleContinueWithStream = (key: StreamKey) => {
    setSelectedKey(key);
    setPortalOpen(true);
    setTimeout(() => {
      const portalEl = document.getElementById('registration-portal');
      if (portalEl) {
        portalEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 90);
  };

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
            <Link href="/tickets" onClick={() => setMenuOpen(false)}>
              <span className="reg-drawer-idx">02</span>
              <span>Tickets</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/partnership" onClick={() => setMenuOpen(false)}>
              <span className="reg-drawer-idx">03</span>
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
        {submittedData ? (
          <RegisterSuccess
            data={submittedData}
            onReset={() => {
              setSubmittedData(null);
              setPortalOpen(false);
            }}
          />
        ) : (
          <>
            {/* ── Atmospheric Hero with Underlay Picture ── */}
            <RegisterHero />

            {/* ── Editorial Alternating Streams (Ends at 04 General Attendees until Continue is clicked) ── */}
            <RegisterTracks
              selectedStream={selectedKey}
              portalOpen={portalOpen}
              onContinueWithStream={handleContinueWithStream}
            />

            {/* ── Hidden Until User Clicks "Continue with This Stream" ── */}
            {portalOpen && (
              <RegisterPortal
                currentStream={activeStream}
                onSelectStream={(key) => setSelectedKey(key)}
                onSuccess={(data) => {
                  setSubmittedData(data);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
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
