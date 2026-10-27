import { motion } from 'framer-motion';
import { Calendar, Globe2, MapPin } from 'lucide-react';

export function TicketHero() {
  return (
    <section className="tk-hero">
      {/* Background Image Underlay */}
      <div className="tk-hero-underlay" aria-hidden="true">
        <img
          src="/images/heritage-waves.webp"
          alt=""
          className="tk-hero-underlay-img"
        />
        <div className="tk-hero-underlay-gradient" />
      </div>

      <div className="tk-hero-content">
        <div className="tk-hero-left">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="tk-hero-title"
          >
            Your Gateway to <br />
            <span className="tk-title-yellow">Africa's Greatest Gathering.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="tk-hero-subtitle"
          >
            Move seamlessly from the rhythm and style of Heritage Waves to the innovation of Startup Flames
            and the excitement of African Legends United live at the National Stadium.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="tk-hero-meta-row"
          >
            <div className="tk-meta-badge">
              <Calendar size={14} className="text-[#ECDA62]" />
              <span>26–28 March 2026</span>
            </div>
            <div className="tk-meta-badge">
              <MapPin size={14} className="text-[#ECDA62]" />
              <span>Banjul, The Gambia</span>
            </div>
            <div className="tk-meta-badge">
              <Globe2 size={14} className="text-[#ECDA62]" />
              <span>One Africa · One Market</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Right: NO CARD! Just ACFTA Fest Logo at the Center with Rotating Text Surrounding It */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="tk-hero-orbit-container"
        >
          <div className="tk-orbit-stage">
            {/* Logo at the very center */}
            <div className="tk-orbit-center-logo">
              <img
                src="/images/acfta-fest-logo.png"
                alt="ACFTA Fest"
                className="tk-center-logo-img"
              />
            </div>

            {/* Rotatable text surrounding the logo */}
            <div className="tk-orbit-revolving-text" aria-hidden="true">
              <svg viewBox="0 0 240 240" className="tk-orbit-svg">
                <path
                  id="ticketOrbitPath"
                  d="M 120, 120 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0"
                  fill="none"
                />
                <text className="tk-orbit-text">
                  <textPath href="#ticketOrbitPath" startOffset="0%">
                    ★ OFFICIAL ADMISSION ★ BANJUL 2026 ★ ONE AFRICA ★ ONE MARKET ★ ACFTA FESTIVAL ★
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
