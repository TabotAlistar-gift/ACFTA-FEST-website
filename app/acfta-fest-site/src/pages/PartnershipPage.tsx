import './landing.css';
import './partnership.css';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Handshake, Mail, Phone } from 'lucide-react';
import { PartnerImpact, PartnerWhySection } from '@/components/partnership/PartnerImpact';
import { PartnerModal } from '@/components/partnership/PartnerModal';
import { PartnerTracks } from '@/components/partnership/PartnerTracks';
import { PartnershipHero } from '@/components/partnership/PartnershipHero';
import { SiteNavigation } from '@/components/layout/SiteNavigation';
import { Footer } from '@/components/landing/LandingBottomSections';
import { type PartnerTrack, type SponsorTier } from '@/data/partnershipData';

export default function PartnershipPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<PartnerTrack | null>(null);
  const [selectedTier, setSelectedTier] = useState<SponsorTier | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openEnquiry = (track?: PartnerTrack, tier?: SponsorTier) => {
    setSelectedTrack(track || null);
    setSelectedTier(tier || null);
    setModalOpen(true);
  };

  return (
    <div className="pt-page">
      <SiteNavigation />

      <main>
        {/* 1. Hero */}
        <PartnershipHero onOpenEnquiry={() => openEnquiry()} />

        {/* 2. Why Partner with ACFTA Fest */}
        <PartnerWhySection />

        {/* 3. Partnership Opportunities / Categories */}
        <PartnerTracks onSelectTrack={(track, tier) => openEnquiry(track, tier)} />

        {/* 4. What Partners Can Contribute, 5. Partnership Benefits & 6. How to Partner */}
        <PartnerImpact />

        {/* 7. Partnership Inquiry / Contact Section */}
        <section className="pt-inquiry-section" id="partnership-inquiry">
          <div className="pt-inquiry-container">
            <div className="pt-inquiry-copy">
              <span className="pt-white-eyebrow">PARTNERSHIP INQUIRY &amp; SECRETARIAT DESK</span>
              <h2 className="pt-white-manifesto-title">
                Start a Partnership <em className="text-[#a6533b] italic">Conversation.</em>
              </h2>
              <p className="pt-white-manifesto-subtitle">
                Whether your institution is planning a sovereign country pavilion, development impact roundtable,
                corporate headline sponsorship, or continental broadcast alliance, our Partnerships Desk is ready to assist.
              </p>

              <div className="pt-contact-cards">
                <a href="mailto:partnerships@acftafest.com" className="pt-contact-card">
                  <span className="pt-contact-label">PARTNERSHIPS DESK</span>
                  <strong>partnerships@acftafest.com <ArrowUpRight size={14} /></strong>
                </a>
                <a href="mailto:info@acftafest.com" className="pt-contact-card">
                  <span className="pt-contact-label">GENERAL SECRETARIAT</span>
                  <strong>info@acftafest.com <ArrowUpRight size={14} /></strong>
                </a>
                <a href="tel:+2348063445195" className="pt-contact-card">
                  <span className="pt-contact-label">TELEPHONE / WHATSAPP</span>
                  <strong><Phone size={13} /> +234 806 344 5195</strong>
                </a>
              </div>
            </div>

            <div className="pt-inquiry-action-card">
              <span className="pt-section-eyebrow">DIRECT EXPRESSION OF INTEREST</span>
              <h3>Submit Your Organization’s Partnership Brief</h3>
              <p>
                Select your preferred partnership track or sponsorship tier and our protocol liaison will respond with a tailored activation dossier.
              </p>
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="pt-btn pt-btn-yellow w-full"
                data-testid="button-open-partnership-modal"
              >
                <Handshake size={16} />
                <span>Open Partnership Inquiry Form</span>
              </button>
            </div>
          </div>
        </section>

        {/* 8. Final CTA */}
        <section className="pt-editorial-cta-strip">
          <div className="pt-editorial-cta-inner">
            <div className="pt-editorial-cta-text">
              <span className="pt-section-eyebrow text-[#ECDA62]">STRATEGIC ALLIANCES DESK</span>
              <h2 className="pt-editorial-cta-title">
                Ready to Partner with the Future of Africa?
              </h2>
              <p className="pt-editorial-cta-desc">
                Country pavilions, speaking keynotes, and executive branding allocations in Banjul are curated in close coordination with our Secretariat.
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
                className="pt-btn pt-btn-outline-gold"
              >
                <Mail size={16} />
                <span>Email Partnerships Desk</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <PartnerModal
        isOpen={modalOpen}
        initialTrack={selectedTrack}
        initialTier={selectedTier}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
