import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Globe2, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

export function AboutHero() {
  return (
    <section className="ab-hero">
      <div className="ab-hero-underlay" aria-hidden="true">
        <img
          src="/images/hero-cultural.webp"
          alt=""
          className="ab-hero-underlay-img"
        />
        <div className="ab-hero-underlay-shade" />
      </div>

      <div className="ab-container ab-hero-inner">
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="ab-hero-title"
        >
          Africa Connected Through <br />
          <em>Trade, Talent &amp; Culture.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="ab-hero-lead"
        >
          ACFTA Fest is a premier rotating Pan-African festival built around the forces that move
          our continent forward—and the entrepreneurs, creatives, athletes, policymakers, and
          institutions who make them possible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="ab-hero-actions"
        >
          <Link href="/register" className="ab-btn ab-btn-gold">
            <span>Register for the Festival</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/tickets" className="ab-btn ab-btn-outline">
            <span>Explore Festival Passes</span>
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26 }}
          className="ab-hero-metrics"
        >
          <div className="ab-metric-item">
            <Globe2 size={16} className="ab-metric-icon" />
            <div>
              <strong>54 Nations</strong>
              <span>Pan-African Single Market</span>
            </div>
          </div>
          <div className="ab-metric-item">
            <Sparkles size={16} className="ab-metric-icon" />
            <div>
              <strong>3 Core Pillars</strong>
              <span>Trade · Culture · Sport</span>
            </div>
          </div>
          <div className="ab-metric-item">
            <MapPin size={16} className="ab-metric-icon" />
            <div>
              <strong>Banjul, The Gambia</strong>
              <span>Host Destination</span>
            </div>
          </div>
          <div className="ab-metric-item">
            <Calendar size={16} className="ab-metric-icon" />
            <div>
              <strong>3 Full Days</strong>
              <span>Conferences, Exhibitions &amp; Concerts</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
