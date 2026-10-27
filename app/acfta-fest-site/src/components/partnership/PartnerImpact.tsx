import { motion } from 'framer-motion';
import { IMPACT_PILLARS } from '@/data/partnershipData';

export function PartnerImpact() {
  return (
    <section className="pt-white-manifesto-section">
      <div className="pt-white-manifesto-container">
        <div className="pt-white-manifesto-header">
          <span className="pt-white-eyebrow">THE CONTINENTAL PROPOSITION</span>
          <h2 className="pt-white-manifesto-title">
            Why the World’s Leading Institutions <br />
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
