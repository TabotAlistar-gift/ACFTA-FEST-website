import { useState } from 'react';
import { ArrowUpRight, Handshake, Mail, Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { PartnerImpact } from '@/components/partnership/PartnerImpact';
import { PartnerModal } from '@/components/partnership/PartnerModal';
import { PartnerTracks } from '@/components/partnership/PartnerTracks';
import { PartnershipHero } from '@/components/partnership/PartnershipHero';
import { type PartnerTrack, type SponsorTier } from '@/data/partnershipData';
import './partnership.css';

export default function PartnershipPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<PartnerTrack | null>(null);
  const [selectedTier, setSelectedTier] = useState<SponsorTier | null>(null);

  const openEnquiry = (track?: PartnerTrack, tier?: SponsorTier) => {
    setSelectedTrack(track || null);
    setSelectedTier(tier || null);
    setModalOpen(true);
  };

  return (
    <div className="pt-page">
      {/* ── Top Navigation Bar ── */}
      <header className="pt-topbar">
        <Link href="/" className="pt-brand" aria-label="ACFTA Fest Home">
          <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
        </Link>

        <nav className={`pt-nav ${menuOpen ? 'is-open' : ''}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Festival Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <a href="#tracks" onClick={() => setMenuOpen(false)}>Partnership Tracks</a>
          <Link href="/tickets" onClick={() => setMenuOpen(false)}>Tickets</Link>
          <button
            type="button"
            className="pt-nav-cta"
            onClick={() => {
              setMenuOpen(false);
              openEnquiry();
            }}
          >
            <span>Partner With Us</span>
            <Handshake size={14} />
          </button>
        </nav>

        <button
          type="button"
          className="pt-menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        {/* ── Hero with Underlay Image & Metrics ── */}
        <PartnershipHero onOpenEnquiry={() => openEnquiry()} />

        {/* ── Editorial Alternating Tracks (Zero Card Boxes) ── */}
        <PartnerTracks onSelectTrack={(track, tier) => openEnquiry(track, tier)} />

        {/* ── Continental Proposition Manifesto ── */}
        <PartnerImpact />

        {/* ── Seamless Full-Width Editorial Closing Strip ── */}
        <section className="pt-editorial-cta-strip">
          <div className="pt-editorial-cta-inner">
            <div className="pt-editorial-cta-text">
              <span className="pt-section-eyebrow text-[#facc15]">STRATEGIC ALLIANCES DESK</span>
              <h2 className="pt-editorial-cta-title">
                Ready to Join Africa’s Most Historic Convergence?
              </h2>
              <p className="pt-editorial-cta-desc">
                Country pavilions, speaking keynotes, and executive branding allocations in Banjul are strictly limited.
                Initiate your organization's formal expression of interest today.
              </p>
            </div>
            <div className="pt-editorial-cta-btns">
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="pt-btn pt-btn-yellow"
              >
                <Handshake size={16} />
                <span>Submit Expression of Interest</span>
              </button>
              <a
                href="mailto:partnerships@acftafest.com?subject=Strategic%20Partnership%20Consultation"
                className="pt-btn pt-btn-lemon"
              >
                <Mail size={16} />
                <span>Email Protocol Desk</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="pt-footer">
        <div className="pt-footer-inner">
          <Link href="/" className="pt-footer-logo">
            <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
          </Link>
          <p className="pt-footer-motto">One Africa. One Market. One Future.</p>
          <div className="pt-footer-links">
            <Link href="/tickets">Tickets & Passes</Link>
            <a href="mailto:partnerships@acftafest.com">
              <span>partnerships@acftafest.com</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </footer>

      {/* ── Interactive Enquiry Modal ── */}
      <PartnerModal
        isOpen={modalOpen}
        initialTrack={selectedTrack}
        initialTier={selectedTier}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
