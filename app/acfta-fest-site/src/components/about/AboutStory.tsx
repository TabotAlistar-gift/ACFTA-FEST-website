import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export function AboutStory() {
  return (
    <>
      {/* ── Section 1: Who We Are & The AfCFTA Mandate (Crisp White Editorial Split) ── */}
      <section className="ab-story-section">
        <div className="ab-container ab-story-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="ab-story-copy"
          >
            <h2 className="ab-display-heading">
              MAKING CONTINENTAL <br />
              COLLABORATION <em>TANGIBLE.</em>
            </h2>
            <p className="ab-lead-paragraph">
              A rotating Pan-African gathering where policy meets real people, businesses find
              cross-border markets, and African heritage takes centre stage.
            </p>
            <p className="ab-body-text">
              ACFTA Fest brings startups, creatives, athletes, business leaders, and public
              institutions together to celebrate Africa, build enduring relationships, and unlock
              opportunities for shared economic growth. Its purpose sits directly alongside the{' '}
              <strong>African Continental Free Trade Area (AfCFTA)</strong>: translating the vision
              of a single African market into lived experience through enterprise, cultural
              exchange, and sport.
            </p>
            <p className="ab-body-text">
              From youth empowerment, venture funding, and industrial trade exhibitions to fashion,
              live music, visual arts, and football diplomacy, ACFTA Fest creates a high-trust arena
              where 54 nations connect without barriers.
            </p>

            <div className="ab-story-highlights">
              <div className="ab-highlight-point">
                <strong>Cross-Border Enterprise</strong>
                <span>Connecting founders, SMEs, and exhibitors with continental investors and buyers.</span>
              </div>
              <div className="ab-highlight-point">
                <strong>Living Cultural Heritage</strong>
                <span>Showcasing African music, fashion, culinary arts, and contemporary storytelling.</span>
              </div>
              <div className="ab-highlight-point">
                <strong>Sporting Diplomacy</strong>
                <span>Uniting African sporting legends and youth talent to inspire continental unity.</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="ab-story-visuals"
          >
            <div className="ab-primary-photo">
              <img
                src="/images/hero-cultural.webp"
                alt="African performers in vibrant traditional attire celebrating at ACFTA Fest"
              />
              <span className="ab-photo-caption">A continent in motion · Trade, Culture &amp; Talent</span>
            </div>
            <div className="ab-secondary-photo">
              <img
                src="/images/what-we-project.jpg"
                alt="Official ACFTA Fest flag on the Atlantic coast"
              />
              <div className="ab-seal-badge">
                <span>ONE AFRICA</span>
                <b>◎</b>
                <span>ONE MARKET</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Vision, Mission & Why We Gather (Deep Forest Green Band) ── */}
      <section className="ab-vision-section">
        <div className="ab-container">
          <div className="ab-vision-header">
            <p className="ab-section-label ab-label-light">
              OUR PURPOSE
            </p>
            <blockquote className="ab-vision-quote">
              “A future where African connection is not an abstract policy idea, but a lived
              continental experience.”
            </blockquote>
          </div>

          <div className="ab-vision-columns">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="ab-vision-col"
            >
              <span className="ab-col-kicker">OUR VISION</span>
              <h3>
                Culture united. <br />
                Opportunity shared.
              </h3>
              <p>
                To be the leading African festival that unites cultures from across Africa,
                showcases African heritage, and drives the future of trade, innovation, and sport
                across the continent.
              </p>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="ab-vision-col"
            >
              <span className="ab-col-kicker">OUR MISSION</span>
              <h3>
                Make room <br />
                for possibility.
              </h3>
              <p>
                To create sustainable platforms for African startups and entrepreneurs that foster
                cross-border connections, celebrate culture through music, fashion, art, and story,
                promote sport as a tool for unity and youth inspiration, and showcase the best of
                the continent’s talent and potential.
              </p>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="ab-vision-col ab-vision-col-accent"
            >
              <span className="ab-col-kicker">WHY IT MATTERS</span>
              <h3>
                Where policy <br />
                meets people.
              </h3>
              <p>
                Trade needs trust. Culture makes connection human. Talent needs a stage. Bringing
                them together under one roof gives African businesses room to scale across borders
                and invites the next generation to lead.
              </p>
              <Link href="/register" className="ab-inline-link">
                <span>Take your place at the festival</span>
                <ArrowRight size={15} />
              </Link>
            </motion.article>
          </div>
        </div>
      </section>
    </>
  );
}
