import { motion } from 'framer-motion';
import { Check, Eye, MapPin, ShoppingBag } from 'lucide-react';
import { EXHIBITION_STANDS, type ExhibitionStand } from '@/data/standData';

interface StandShowcaseProps {
  onSelectStand: (stand: ExhibitionStand) => void;
}

export function StandShowcase({ onSelectStand }: StandShowcaseProps) {
  return (
    <div className="st-showcase-wrapper">
      {EXHIBITION_STANDS.map((stand, index) => {
        const isReversed = index % 2 === 1;

        return (
          <section
            key={stand.id}
            id={`stand-${stand.id}`}
            className={`st-stand-band ${stand.theme}`}
          >
            <div className="st-container">
              <div className={`st-editorial-row ${isReversed ? 'is-reversed' : ''}`}>
                {/* Single Official 3D Booth Mockup View with ACFTA Fest Placards & Roll-Up Banners */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="st-media-col"
                >
                  <div className="st-mockup-stage">
                    <img
                      src={stand.image}
                      alt={stand.title}
                      className="st-mockup-main-img"
                      loading="lazy"
                    />
                    <div className="st-mockup-top-tags">
                      <span className="st-code-badge">PACKAGE {stand.code}</span>
                      <span className="st-dim-badge">{stand.dimensions}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Editorial Package Details & Buy Now Action */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="st-copy-col"
                >
                  <div className="st-copy-kicker">
                    <span className="st-kicker-code">{stand.code}</span>
                    <span className="st-kicker-tier">{stand.tierBadge}</span>
                  </div>

                  <h2 className="st-stand-title">{stand.title}</h2>
                  <p className="st-stand-subtitle">{stand.subtitle}</p>

                  <div className="st-location-row">
                    <MapPin size={15} className="shrink-0" />
                    <span>{stand.locationZone}</span>
                  </div>

                  <p className="st-stand-desc">{stand.description}</p>

                  <div className="st-visibility-box">
                    <span className="st-vis-label">
                      <Eye size={13} />
                      <span>Visibility &amp; Reach</span>
                    </span>
                    <p className="st-vis-text">{stand.visibilityNote}</p>
                  </div>

                  <div className="st-inclusions-block">
                    <h3 className="st-inc-heading">Package Includes:</h3>
                    <ul className="st-inc-list">
                      {stand.benefits.map((item) => (
                        <li key={item} className="st-inc-item">
                          <span className="st-inc-check">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="st-buy-row">
                    <div className="st-price-stack">
                      <span className="st-price-label">Official Stand Price</span>
                      <strong className="st-price-amount">{stand.price} <small>USD</small></strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectStand(stand)}
                      className="st-buy-btn"
                    >
                      <ShoppingBag size={16} />
                      <span>Buy Now | {stand.price}</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
