import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Crown, Menu, X } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { getStreamBySlug } from '@/data/registerData';
import { RegisterPortal, type RegisterFormData } from '@/components/register/RegisterPortal';
import { RegisterSuccess } from '@/components/register/RegisterSuccess';
import './register.css';

export default function RegisterPathwayPage() {
  const [, params] = useRoute<{ pathwaySlug: string }>('/register/:pathwaySlug');
  const [menuOpen, setMenuOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegisterFormData | null>(null);

  const activeStream = params?.pathwaySlug ? getStreamBySlug(params.pathwaySlug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.pathwaySlug]);

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
            <Link href="/register" onClick={() => setMenuOpen(false)}>
              <span className="reg-drawer-idx">03</span>
              <span>Participation Pathways</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/tickets" onClick={() => setMenuOpen(false)}>
              <span className="reg-drawer-idx">04</span>
              <span>Tickets</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/partnership" onClick={() => setMenuOpen(false)}>
              <span className="reg-drawer-idx">05</span>
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
        {!activeStream ? (
          <section className="reg-portal-section">
            <div className="reg-portal-container">
              <div className="reg-portal-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <h1 className="reg-form-heading" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                  Participation Pathway Not Found
                </h1>
                <p className="reg-form-caption" style={{ marginBottom: '1.75rem' }}>
                  Please select one of the official ACFTA Fest participation pathways to continue your registration.
                </p>
                <Link href="/register" className="reg-btn-primary">
                  <ArrowLeft size={15} />
                  <span>Go Back</span>
                </Link>
              </div>
            </div>
          </section>
        ) : submittedData ? (
          <RegisterSuccess
            data={submittedData}
            onReset={() => {
              setSubmittedData(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <RegisterPortal
            currentStream={activeStream}
            onSuccess={(data) => {
              setSubmittedData(data);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
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
