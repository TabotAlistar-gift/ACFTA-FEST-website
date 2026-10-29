import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { pillars, programmeSnapshots } from '@/data/festival';

const ROTATION_STEPS = [
  {
    title: 'Host a Nation',
    text: 'Each edition brings continental attention, diplomatic delegations, investment capital, and tourism visibility to its African host country.',
  },
  {
    title: 'Connect People & Industries',
    text: 'Founders, creatives, football legends, policymakers, financial institutions, and exhibitors meet face-to-face to forge cross-border deals.',
  },
  {
    title: 'Build a Lasting Legacy',
    text: 'Beyond the three festival days, ACFTA Fest leaves behind trade networks, youth mentorship pathways, and pan-African commercial partnerships.',
  },
];

export function AboutPillarsAndModel() {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && pillars.some((p) => p.id === hash)) {
      setExpandedPillar(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const togglePillar = (id: string) => {
    setExpandedPillar((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* ── Section 3: The Three Signature Pillars + Expandable "See More" Programme Snapshot ── */}
      <section className="ab-pillars-section" id="pillars">
        <div className="ab-container">
          <div className="ab-pillars-head">
            <div>
              <p className="ab-section-label">
                THE THREE PILLARS OF ACFTA FEST
              </p>
              <h2 className="ab-display-heading">
                THREE DISTINCT WORLDS. <br />
                <em>ONE SHARED PLATFORM.</em>
              </h2>
            </div>
            <p className="ab-pillars-intro">
              Every edition of ACFTA Fest is structured around three interconnected arenas—uniting
              boardroom dealmaking, cultural expression, and sporting legacy.
            </p>
          </div>

          <div className="ab-pillars-list">
            {pillars.map((pillar, idx) => {
              const snapshot = programmeSnapshots[idx];
              const isReversed = idx % 2 === 1;
              const isExpanded = expandedPillar === pillar.id;

              return (
                <div key={pillar.id} id={pillar.id} className="ab-pillar-block">
                  <motion.article
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className={`ab-pillar-row ${isReversed ? 'is-reversed' : ''}`}
                  >
                    <div className="ab-pillar-media">
                      <img src={pillar.image} alt={pillar.alt} loading="lazy" />
                    </div>

                    <div className="ab-pillar-copy">
                      <p className="ab-pillar-desc-tag">{pillar.descriptor}</p>
                      <h3>{pillar.name}</h3>
                      <p className="ab-pillar-text">{pillar.copy}</p>

                      {snapshot && (
                        <p className="ab-pillar-summary-note">{snapshot.summary}</p>
                      )}

                      <div className="ab-pillar-bottom-right">
                        <button
                          type="button"
                          onClick={() => togglePillar(pillar.id)}
                          className={`ab-see-more-text-btn ${isExpanded ? 'is-open' : ''}`}
                          aria-expanded={isExpanded}
                        >
                          <span>See more</span>
                          <ArrowDown
                            size={15}
                            className={`ab-see-more-arrow ${isExpanded ? 'is-rotated' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.article>

                  {/* Expandable Programme Snapshot Details for this Pillar */}
                  {isExpanded && snapshot && (
                    <div className="ab-snapshot-drawer">
                      <div className="ab-snapshot-header">
                        <div>
                          <span className="ab-snapshot-kicker">PROGRAMME SNAPSHOT</span>
                          <h4>{snapshot.title}</h4>
                        </div>
                        <span className="ab-snapshot-count">{snapshot.items.length} Featured Sessions</span>
                      </div>

                      <div className="ab-snapshot-grid">
                        {snapshot.items.map((item) => (
                          <article key={item.title} className="ab-snapshot-item">
                            <div className="ab-snapshot-img-wrap">
                              <img src={item.image} alt={item.alt} loading="lazy" />
                            </div>
                            <div className="ab-snapshot-item-copy">
                              <h5>{item.title}</h5>
                              <p>{item.description}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4: Rotational Host Model with Globe & Route Graphic (Ochre Editorial Section) ── */}
      <section className="ab-rotation-section">
        <div className="ab-container">
          <div className="ab-rotation-top">
            <div>
              <p className="ab-section-label">
                A FESTIVAL ON THE MOVE
              </p>
              <h2 className="ab-display-heading">
                ONE FESTIVAL. <br />
                <em>MANY NATIONS.</em>
              </h2>
            </div>
            <p className="ab-rotation-lead">
              ACFTA Fest’s rotational host model is designed to travel across African nations—sharing
              economic spotlight, infrastructure momentum, and continental solidarity from West to
              East, North to South.
            </p>
          </div>

          {/* Rotational Host Model Visual Map & Route Nodes */}
          <div className="rotation-route ab-rotation-route" aria-hidden="true">
            <div className="route-globe">
              <span className="globe-lines" />
              <img
                className="route-map-mark"
                src="/images/africa-map-mark.png"
                alt=""
                style={{ position: 'absolute', width: '78%', height: '78%', objectFit: 'contain', opacity: 0.36 }}
              />
              <b>AFRICA</b>
              <i>ROTATIONAL<br />HOST MODEL</i>
            </div>
            <span className="route-line" />
            <span className="route-node node-a">HOST</span>
            <span className="route-node node-b">CONNECT</span>
            <span className="route-node node-c">LEGACY</span>
          </div>

          <div className="ab-rotation-steps">
            {ROTATION_STEPS.map((step) => (
              <div key={step.title} className="ab-rotation-step">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Be Part of Africa's Next Chapter CTA Section (Refined Deep Forest & Gold Palette) ── */}
      <section className="ab-next-chapter-section">
        <div className="ab-container">
          <div className="ab-cta-banner">
            <div className="ab-cta-copy">
              <span className="ab-cta-kicker">BE PART OF AFRICA’S NEXT CHAPTER</span>
              <h3>Join Us at ACFTA Fest</h3>
              <p>
                Whether you are an entrepreneur, investor, exhibitor, creative artist, athlete,
                policymaker, or festival attendee—secure your place today.
              </p>
            </div>
            <div className="ab-cta-buttons">
              <Link href="/register" className="ab-btn ab-btn-gold">
                <span>Register Now</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/buy-a-stand" className="ab-btn ab-btn-outline">
                <span>Book a Stand</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/partnership" className="ab-btn ab-btn-outline">
                <span>Become a Partner</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
