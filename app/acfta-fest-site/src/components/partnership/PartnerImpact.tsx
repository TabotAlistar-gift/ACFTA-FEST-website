import { motion } from 'framer-motion';
import { CheckCircle2, Compass, Layers, Sparkles } from 'lucide-react';
import { IMPACT_PILLARS, PROCESS_STEPS } from '@/data/partnershipData';

const PARTNER_CONTRIBUTIONS = [
  {
    title: 'Strategic & Financial Sponsorship',
    desc: 'Underwrite flagship arenas including Startup Flames, Heritage Waves, and the African Legends United Gala Match.',
  },
  {
    title: 'Country & Institutional Pavilions',
    desc: 'Host national export showcases, ministerial trade desks, and B2B investment dealrooms on the exhibition floor.',
  },
  {
    title: 'Technical Expertise & Policy Dialogue',
    desc: 'Co-convene policy roundtables, youth incubation clinics, and cross-border trade facilitation workshops.',
  },
  {
    title: 'Media Broadcast & Cultural Programming',
    desc: 'Provide continental media syndication, creative production support, or official hospitality and logistics partnerships.',
  },
];

const PARTNER_BENEFITS = [
  {
    icon: Compass,
    title: 'High-Level Diplomatic & B2B Access',
    desc: 'Direct engagement with government ministries, AfCFTA policy leaders, institutional investors, and enterprise founders.',
  },
  {
    icon: Sparkles,
    title: 'Pan-African Brand Authority',
    desc: 'Prominent brand integration across main stages, exhibition halls, international press, and digital broadcasts.',
  },
  {
    icon: Layers,
    title: 'Bespoke Activation & Hospitality',
    desc: 'Tailored pavilion spaces, VVIP protocol credentials, executive lounges, and curated bilateral matchmaking.',
  },
  {
    icon: CheckCircle2,
    title: 'Measurable Post-Summit Impact',
    desc: 'Comprehensive Monitoring & Evaluation (M&E) reporting aligned with continental trade and SDG milestones.',
  },
];

export function PartnerWhySection() {
  return (
    <section className="pt-white-manifesto-section" id="why-partner">
      <div className="pt-white-manifesto-container">
        <div className="pt-white-manifesto-header">
          <span className="pt-white-eyebrow">WHY PARTNER WITH ACFTA FEST</span>
          <h2 className="pt-white-manifesto-title">
            Why Africa’s Leading Institutions <br />
            <em className="text-[#a6533b] italic">Partner with ACFTA Fest.</em>
          </h2>
          <p className="pt-white-manifesto-subtitle">
            More than an expo — a catalytic platform accelerating intra-African trade, industrialization,
            cultural exportation, and youth economic inclusion across 54 nations.
          </p>
        </div>

        <div className="pt-white-manifesto-grid">
          {IMPACT_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="pt-white-column"
            >
              <span className="pt-white-num">0{i + 1}</span>
              <div className="pt-white-accent-bar" />
              <h3 className="pt-white-h3">{pillar.title}</h3>
              <p className="pt-white-p">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerImpact() {
  return (
    <>
      {/* ── What Partners Can Contribute & Partnership Benefits ── */}
      <section className="pt-value-exchange-section" id="benefits">
        <div className="pt-white-manifesto-container">
          <div className="pt-exchange-grid">
            <div className="pt-exchange-block">
              <span className="pt-white-eyebrow">COLLABORATIVE VALUE</span>
              <h2 className="pt-exchange-title">What Partners Can Contribute</h2>
              <p className="pt-exchange-lead">
                Partnerships at ACFTA Fest are structured for meaningful co-creation across public, private, and developmental mandates.
              </p>
              <div className="pt-contrib-list">
                {PARTNER_CONTRIBUTIONS.map((item, idx) => (
                  <div className="pt-contrib-item" key={item.title}>
                    <span className="pt-contrib-idx">0{idx + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-exchange-block pt-benefits-panel">
              <span className="pt-section-eyebrow">STRATEGIC RETURN</span>
              <h2 className="pt-exchange-title text-white">Partnership Benefits</h2>
              <p className="pt-exchange-lead text-[#f2eddf]/80">
                Every partner receives structured visibility, protocol support, and measurable continental engagement.
              </p>
              <div className="pt-benefits-grid">
                {PARTNER_BENEFITS.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div className="pt-benefit-card" key={benefit.title}>
                      <div className="pt-benefit-icon">
                        <Icon size={18} />
                      </div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Partner (5-Step Process) ── */}
      <section className="pt-process-section" id="how-to-partner">
        <div className="pt-white-manifesto-container">
          <div className="pt-white-manifesto-header">
            <span className="pt-white-eyebrow">HOW TO PARTNER</span>
            <h2 className="pt-white-manifesto-title">
              Five Steps from Inquiry to <em className="text-[#a6533b] italic">Continental Impact.</em>
            </h2>
            <p className="pt-white-manifesto-subtitle">
              Our Partnerships Secretariat guides your delegation from initial alignment through on-ground activation in Banjul.
            </p>
          </div>

          <div className="pt-process-grid">
            {PROCESS_STEPS.map((step) => (
              <div className="pt-process-step" key={step.num}>
                <span className="pt-process-num">{step.num}</span>
                <h3 className="pt-process-title">{step.title}</h3>
                <p className="pt-process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
