import { motion } from 'framer-motion';
import { ArrowRight, Check, Crown } from 'lucide-react';
import { FESTIVAL_PASSES, type FestivalPass } from '@/data/ticketData';

interface ShowcaseProps {
  onSelectPass: (pass: FestivalPass) => void;
}

export function TicketShowcase({ onSelectPass }: ShowcaseProps) {
  const vipPass = FESTIVAL_PASSES.find((p) => p.featured) || FESTIVAL_PASSES[1];
  const day1Pass = FESTIVAL_PASSES.find((p) => p.number === '01') || FESTIVAL_PASSES[0];
  const day3Pass = FESTIVAL_PASSES.find((p) => p.number === '03') || FESTIVAL_PASSES[2];

  return (
    <section className="tk-showcase-section" id="passes">
      <div className="tk-section-header-left">
        <h2 className="tk-section-title">Select your festival credential</h2>
        <p className="tk-section-subtitle">
          From a single day to the complete three-day programme, find the pass that fits your festival plans.
        </p>
      </div>

      <div className="tk-showcase-flow">
        {/* ── 1. Premium Pass (All Days) ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="tk-master-vip-credential"
        >
          <div className="tk-vip-underlay" aria-hidden="true">
            <img src="/images/hero-cultural.webp" alt="" className="tk-vip-underlay-img" />
            <div className="tk-vip-underlay-tint" />
          </div>

          <div className="tk-vip-content">
            <div className="tk-vip-grid">
              <div className="tk-vip-details">
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={18} className="text-[#ECDA62]" />
                  <span className="text-xs uppercase tracking-wider font-bold text-[#ECDA62]">
                    Complete 3-Day Experience
                  </span>
                </div>

                <h3 className="tk-vip-title">{vipPass.title}</h3>
                <p className="tk-vip-date text-[#ECDA62]">{vipPass.date}</p>
                <p className="tk-vip-desc">{vipPass.tagline}</p>

                <div className="tk-vip-perks-heading">
                  <span className="text-xs uppercase font-bold text-[#ECDA62] tracking-wider">
                    Access & Benefits
                  </span>
                </div>
                <ul className="tk-vip-perks-list">
                  {vipPass.highlights.map((h) => (
                    <li key={h}>
                      <div className="tk-vip-check">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* VIP Price & CTA Column */}
              <div className="tk-vip-cta-col">
                <div className="tk-vip-price-box">
                  <span className="tk-vip-price-label">Listed Ticket Price</span>
                  <span className="tk-vip-price-val">{vipPass.price}</span>
                  <span className="tk-vip-price-sub">Conferences, concerts, workshops & gala match</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPass(vipPass)}
                  className="tk-vip-btn"
                >
                  <span>Get Ticket</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 2. Single-Day Pass Stubs (Ticket 1 & Ticket 2) ── */}
        <div className="tk-stubs-row">
          {/* Ticket 1 */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="tk-stub-ticket"
          >
            <div className="tk-stub-underlay" aria-hidden="true">
              <img src="/images/startup-flames.webp" alt="" className="tk-stub-underlay-img" />
              <div className="tk-stub-tint" />
            </div>

            <div className="tk-stub-body">
              <h3 className="tk-stub-title">{day1Pass.title}</h3>
              <p className="tk-stub-date text-[#ECDA62]">{day1Pass.date}</p>
              <p className="tk-stub-desc">{day1Pass.tagline}</p>

              <ul className="tk-stub-highlights">
                {day1Pass.highlights.map((item) => (
                  <li key={item}>
                    <Check size={11} className="text-[#ECDA62] shrink-0" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="tk-stub-footer">
                <div className="tk-stub-price">
                  <span>Ticket Price</span>
                  <strong>{day1Pass.price}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectPass(day1Pass)}
                  className="tk-stub-btn"
                >
                  <span>Get Ticket</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Ticket 2 */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="tk-stub-ticket"
          >
            <div className="tk-stub-underlay" aria-hidden="true">
              <img src="/images/african-legends.webp" alt="" className="tk-stub-underlay-img" />
              <div className="tk-stub-tint" />
            </div>

            <div className="tk-stub-body">
              <h3 className="tk-stub-title">{day3Pass.title}</h3>
              <p className="tk-stub-date text-[#ECDA62]">{day3Pass.date}</p>
              <p className="tk-stub-desc">{day3Pass.tagline}</p>

              <ul className="tk-stub-highlights">
                {day3Pass.highlights.map((item) => (
                  <li key={item}>
                    <Check size={11} className="text-[#ECDA62] shrink-0" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="tk-stub-footer">
                <div className="tk-stub-price">
                  <span>Ticket Price</span>
                  <strong>{day3Pass.price}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectPass(day3Pass)}
                  className="tk-stub-btn"
                >
                  <span>Get Ticket</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
