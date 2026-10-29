import { motion } from 'framer-motion';
import { ArrowRight, Check, Crown } from 'lucide-react';
import { PARTNER_TRACKS, type PartnerTrack, type SponsorTier } from '@/data/partnershipData';

interface TracksProps {
  onSelectTrack: (track: PartnerTrack, tier?: SponsorTier) => void;
}

const TRACK_IMAGES: Record<string, { img: string; caption: string }> = {
  gov: { img: '/images/register-delegates.jpg', caption: 'High-Level Presidential Opening & Ministerial Accord' },
  dfi: { img: '/images/startup-flames.webp', caption: 'Pan-African Youth Incubation & Impact Roundtables' },
  corp: { img: '/images/register-vendors.jpg', caption: 'Headline Brand Placement & VIP Hospitality Suites' },
  media: { img: '/images/heritage-waves.webp', caption: 'Broadcast Studio Accreditation & Global Syndication' },
};

export function PartnerTracks({ onSelectTrack }: TracksProps) {
  return (
    <section className="pt-tracks-section" id="tracks">
      <div className="pt-tracks-inner">
        <div className="pt-section-header-left">
          <span className="pt-section-eyebrow">PARTNERSHIP OPPORTUNITIES &amp; CATEGORIES</span>
          <h2 className="pt-section-title">Four Tailored Partnership Tracks</h2>
          <p className="pt-section-subtitle">
            Designed without rigid boundaries. Each track creates bespoke bilateral value, direct diplomatic access,
            and unforgettable brand presence across the African continent.
          </p>
        </div>

        <div className="pt-editorial-tracks">
          {PARTNER_TRACKS.map((track, idx) => {
            const isEven = idx % 2 === 1;
            const media = TRACK_IMAGES[track.id] || TRACK_IMAGES.gov;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`pt-track-row ${isEven ? 'is-reversed' : ''}`}
              >
                <div className="pt-track-text-side">
                  <div className="pt-track-kicker">
                    <span className="pt-track-index">TRACK 0{idx + 1}</span>
                    <span className="pt-track-badge">{track.category}</span>
                  </div>

                  <h3 className="pt-track-heading">{track.title}</h3>
                  <p className="pt-track-lead">{track.summary}</p>

                  <div className="pt-track-deliverables">
                    <div className="pt-deliverables-title">
                      <span>Core Deliverables &amp; Bilateral Impact</span>
                    </div>
                    <ul className="pt-deliverables-list">
                      {track.deliverables.map((item) => (
                        <li key={item}>
                          <div className="pt-check-bullet">
                            <Check size={11} strokeWidth={3} />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {track.tiers && (
                    <div className="pt-corporate-tiers-strip">
                      <div className="pt-corporate-tiers-label">
                        <Crown size={14} className="text-[#ECDA62]" />
                        <span>Corporate Investment Packages</span>
                      </div>
                      <div className="pt-corporate-tiers-row">
                        {track.tiers.map((tier) => (
                          <button
                            type="button"
                            key={tier.name}
                            className="pt-tier-pill"
                            onClick={() => onSelectTrack(track, tier)}
                          >
                            <span className="pt-tier-pill-name">{tier.name}</span>
                            <span className="pt-tier-pill-price">{tier.investment}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-track-action">
                    <button
                      type="button"
                      onClick={() => onSelectTrack(track)}
                      className="pt-editorial-cta"
                    >
                      <span>Initiate Dialogue for Track {track.number}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                <div className="pt-track-visual-side">
                  <div className="pt-visual-frame">
                    <img src={media.img} alt={track.title} className="pt-visual-image" loading="lazy" />
                    <div className="pt-visual-gradient" />
                    <div className="pt-visual-accent-line" />
                    <span className="pt-visual-caption">{media.caption}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
