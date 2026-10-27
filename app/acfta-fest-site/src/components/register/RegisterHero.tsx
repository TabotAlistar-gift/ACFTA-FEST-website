import { motion } from 'framer-motion';
import { Calendar, Globe2, MapPin } from 'lucide-react';

export function RegisterHero() {
  return (
    <section className="reg-hero">
      {/* Authentic African Cultural Gathering Underlay Photograph */}
      <div className="reg-hero-underlay" aria-hidden="true">
        <img
          src="https://images.pexels.com/photos/37786275/pexels-photo-37786275/free-photo-of-group-portrait-in-vibrant-african-attire.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="reg-hero-underlay-img"
          onError={(e) => {
            e.currentTarget.src = '/images/heritage-waves.webp';
          }}
        />
        <div className="reg-hero-underlay-gradient" />
      </div>

      <div className="reg-hero-content">
        <div className="reg-hero-main">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="reg-hero-title"
          >
            Register for <br />
            <span className="reg-title-yellow">ACFTA Fest.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="reg-hero-subtitle"
          >
            Whether participating as a high-level investment delegate, reserving an artisan market stand,
            joining the frontline volunteer crew, or celebrating African heritage—explore the pathways
            below and select your stream to begin registration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="reg-hero-meta"
          >
            <div className="reg-meta-item">
              <Calendar size={15} className="text-[#ECDA62]" />
              <span>26–28 March 2026</span>
            </div>
            <div className="reg-meta-item">
              <MapPin size={15} className="text-[#ECDA62]" />
              <span>Banjul, The Gambia</span>
            </div>
            <div className="reg-meta-item">
              <Globe2 size={15} className="text-[#ECDA62]" />
              <span>54 Nations · One Single Market</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
