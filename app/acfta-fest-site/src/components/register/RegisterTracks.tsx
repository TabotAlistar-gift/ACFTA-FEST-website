import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'wouter';
import { REGISTRATION_STREAMS, type StreamKey } from '@/data/registerData';

const STREAM_THEMES: Record<StreamKey, 'theme-white' | 'theme-clay' | 'theme-forest'> = {
  delegate: 'theme-white',
  vendor: 'theme-clay',
  volunteer: 'theme-forest',
  attendee: 'theme-white',
};

export function RegisterTracks() {
  return (
    <div className="reg-tracks-wrapper">
      {/* Intro Header on Crisp White Background */}
      <div className="reg-tracks-intro-band">
        <div className="reg-tracks-container">
          <div className="reg-tracks-header">
            <p className="reg-tracks-eyebrow">PARTICIPATION PATHWAYS</p>
            <h2 className="reg-tracks-title">
              Choose How You Shape <em>ACFTA Fest.</em>
            </h2>
            <p className="reg-tracks-lead">
              Explore the four accredited festival pathways below. Select{' '}
              <strong>Continue with This Stream</strong> on your chosen category to open its
              dedicated registration page.
            </p>
          </div>
        </div>
      </div>

      {/* Alternating Color-Blocked Editorial Streams (White, Clay Orange, Forest Green, White) */}
      <div className="reg-tracks-editorial-list">
        {REGISTRATION_STREAMS.map((stream, idx) => {
          const isReversed = idx % 2 === 1;
          const themeClass = STREAM_THEMES[stream.key];

          return (
            <section
              key={stream.key}
              id={`stream-${stream.key}`}
              className={`reg-stream-band ${themeClass}`}
            >
              <div className="reg-tracks-container">
                <div className={`reg-editorial-track ${isReversed ? 'is-reversed' : ''}`}>
                  {/* Visual Editorial Frame with Authentic Black African Photography */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65 }}
                    className="reg-track-media"
                  >
                    <div className="reg-media-frame">
                      <img
                        src={stream.image}
                        alt={stream.title}
                        className="reg-media-img"
                        loading="lazy"
                      />
                      <div className="reg-media-overlay" />
                      <div className="reg-media-badge-tag">
                        <span className="reg-media-num">{stream.number}</span>
                        <span className="reg-media-badge-txt">{stream.badge}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Editorial Typography Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="reg-track-content"
                  >
                    <div className="reg-track-subhead">
                      <span className="reg-track-num-display">{stream.number}</span>
                      <span className="reg-track-subtitle">{stream.subtitle}</span>
                    </div>

                    <h3 className="reg-track-title">{stream.title}</h3>
                    <p className="reg-track-tagline">{stream.tagline}</p>

                    <div className="reg-track-deliverables">
                      <h4 className="reg-deliverables-title">What is Included:</h4>
                      <ul className="reg-deliverables-list">
                        {stream.perks.map((perk) => (
                          <li key={perk} className="reg-deliverable-item">
                            <span className="reg-item-check">
                              <Check size={12} strokeWidth={3} />
                            </span>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="reg-track-requirements">
                      <span className="reg-req-label">Eligibility &amp; Scope:</span>
                      <p className="reg-req-text">{stream.requirements.join(' · ')}</p>
                    </div>

                    <div className="reg-track-action-row">
                      <div className="reg-track-fee">
                        <span className="reg-fee-sub">Registration Status</span>
                        <strong className="reg-fee-val">{stream.feeLabel}</strong>
                      </div>

                      <Link
                        href={stream.routePath}
                        className="reg-track-btn"
                        data-testid={`button-pathway-${stream.key}`}
                      >
                        <span>Continue with This Stream · {stream.ctaText}</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
