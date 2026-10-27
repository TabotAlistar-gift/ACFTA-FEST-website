import { motion } from 'framer-motion';

export function StandHero() {
  return (
    <section className="st-hero">
      {/* Visible African Exhibition Underlay Picture (Black African Traders & Buyers) */}
      <div className="st-hero-underlay" aria-hidden="true">
        <img
          src="/images/register-vendors.jpg"
          alt=""
          className="st-hero-underlay-img"
        />
        <div className="st-hero-underlay-gradient" />
      </div>

      <div className="st-hero-content">
        <div className="st-hero-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="st-hero-eyebrow"
          >
            Festival Stands · Exhibition &amp; Retail Showcase
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="st-hero-title"
          >
            Buy A <span className="st-title-yellow">Stand.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="st-hero-subtitle"
          >
            Choose your ideal exhibition platform, strategically located at the convergence of the
            B.A. Tinubu International Conference Center (ICC) and the M. Abiola National Stadium to
            ensure engagement with business delegates, sports fans, and concertgoers. From the
            expansive <strong>18m² R1 package ($10,000)</strong> to the{' '}
            <strong>3m² C1 canopy option ($100)</strong>, premium tiers include VIP &amp; Premium
            tickets to the Mega Concert, TINUBU’s CUP, and Heritage Waves.
          </motion.p>
        </div>

        {/* Hero Right: Official ACFTA Fest 3D Booth Mockup Preview with Placards & Roll-Up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.18 }}
          className="st-hero-showcase"
        >
          <div className="st-hero-booth-frame">
            <img
              src="/images/stands/ruby-1-main.jpg"
              alt="Official ACFTA Fest Exhibition Booth with Fascia Placards and Roll-Up Banners"
              className="st-hero-booth-img"
            />
            <div className="st-hero-booth-caption">
              <span className="st-caption-code">OFFICIAL BOOTH ARCHITECTURE</span>
              <strong>ACFTA Fest Branded Fascia Placards, Roll-Up Banners &amp; Reception Counters</strong>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
