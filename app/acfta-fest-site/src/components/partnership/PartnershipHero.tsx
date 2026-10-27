import { motion } from 'framer-motion';
import { ArrowDown, Handshake } from 'lucide-react';

interface HeroProps {
  onOpenEnquiry: () => void;
}

export function PartnershipHero({ onOpenEnquiry }: HeroProps) {
  return (
    <section className="pt-hero">
      {/* Background Image Underlay */}
      <div className="pt-hero-underlay" aria-hidden="true">
        <img
          src="/images/what-we-project.webp"
          alt=""
          className="pt-hero-underlay-img"
        />
        <div className="pt-hero-underlay-gradient" />
      </div>

      <div className="pt-hero-content">
        <div className="pt-hero-left">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="pt-hero-title"
          >
            Shape the Future of <br />
            <span className="pt-title-highlight">African Trade</span> & Culture.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="pt-hero-subtitle"
          >
            ACFTA Fest 2027 converges leadership from 54 African economies, institutional funders,
            leading brands, and cultural visionaries in Banjul. Co-create Africa's most transformative free-trade festival.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="pt-hero-actions"
          >
            <a href="#tracks" className="pt-btn pt-btn-yellow">
              <span>Explore Partnership Tracks</span>
              <ArrowDown size={15} />
            </a>
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="pt-btn pt-btn-outline-gold"
            >
              <Handshake size={15} />
              <span>Partner With Us</span>
            </button>
          </motion.div>
        </div>

        {/* Hero Right Metrics Panel - Responsive mobile stack with no text overlap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="pt-hero-metrics-panel"
        >
          <div className="pt-metric-row">
            <span className="pt-metric-num text-[#ECDA62]">$3.4T+</span>
            <div className="pt-metric-text">
              <strong>Combined Continental GDP</strong>
              <p>One unified market under the AfCFTA framework.</p>
            </div>
          </div>

          <div className="pt-metric-sep" />

          <div className="pt-metric-row">
            <span className="pt-metric-num text-[#ECDA62]">54</span>
            <div className="pt-metric-text">
              <strong>African Nations</strong>
              <p>Government ministries, export agencies, and official delegations.</p>
            </div>
          </div>

          <div className="pt-metric-sep" />

          <div className="pt-metric-row">
            <span className="pt-metric-num text-[#ECDA62]">50,000+</span>
            <div className="pt-metric-text">
              <strong>Delegates & Founders</strong>
              <p>B2B investors, creative entrepreneurs, and high-impact leaders.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
