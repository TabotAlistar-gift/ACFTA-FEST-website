import './landing.css';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X,
} from 'lucide-react';
import { pillars } from '@/data/festival';
import {
  ContactSection,
  Footer,
  ProgrammeSection,
  SpeakersSection,
} from '@/components/landing/LandingBottomSections';

const ticketUrl = '/tickets';
const registrationUrl = '/register';
const standUrl = '/buy-a-stand';
const sponsorUrl = '/not-found';
const partnerUrl = '/partnership';

const navItems = [
  ['Home', '#home'],
  ['About Us', '#about'],
  ['The Event', '#event'],
  ['Partnerships & Registration', '#participate'],
  ['Contact', '#contact'],
];

function requestCategory(category: string) {
  window.dispatchEvent(new CustomEvent('acfta:enquiry', { detail: category }));
}

function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand-link${footer ? ' brand-link-footer' : ''}`} href="#home" aria-label="ACFTA Fest home" data-testid={footer ? 'link-footer-home' : 'link-brand-home'}>
      <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
    </a>
  );
}
function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
          <a className="nav-ticket" href={ticketUrl} data-testid="link-nav-get-a-ticket">Get a Ticket <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className={`mobile-nav${open ? ' is-open' : ''}`} id="mobile-navigation" aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, href], index) => (
            <a key={href} href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} data-testid={`link-mobile-${index}`}>
              <span className="mobile-index">0{index + 1}</span>{label}<ArrowUpRight size={16} />
            </a>
          ))}
          <a className="mobile-ticket" href={ticketUrl} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} data-testid="link-mobile-ticket">Get a Ticket <ArrowUpRight size={16} /></a>
        </nav>
        <p>One Africa. One market. One future.</p>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero site-grain" id="home" aria-labelledby="hero-title">
      <div className="hero-image" role="img" aria-label="Festival dancers in vivid red and gold costumes celebrating together" />
      <div className="hero-shade" />
      <Navigation />
      <div className="hero-content">
        <div className="hero-edition reveal" aria-label="ACFTA Fest Gambia 2027">
          <span className="edition-dot" aria-hidden="true" />
          <span>ACFTA FEST · GAMBIA 2027</span>
        </div>
        <p className="hero-event-details reveal reveal-delay-1">
          <span className="hero-location">Banjul, Gambia</span>
        </p>
        <h1 id="hero-title" className="reveal reveal-delay-1">ONE AFRICA.<br /><em>ONE MARKET.</em><br />ONE FUTURE.</h1>
        <p className="hero-description reveal reveal-delay-2">Where Africa’s trade, culture and talent unite.</p>
        <div className="hero-actions reveal reveal-delay-3">
          <a className="button button-gold" href={registrationUrl} data-testid="button-hero-register">Register <ArrowUpRight size={16} /></a>
          <a className="button button-outline-light" href={ticketUrl} data-testid="button-hero-ticket">Get a Ticket <ArrowDownRight size={16} /></a>
        </div>
      </div>
      <div className="hero-bottom">
        <p>ACFTA FEST / GAMBIA 2027</p>
        <a className="scroll-cue" href="#about" aria-label="Scroll to About ACFTA Fest" data-testid="link-scroll-about"><span>Scroll to discover</span><ArrowDown size={14} /></a>
      </div>
    </section>
  );
}

function SectionLabel({ number, children, light = false }: { number?: string; children: string; light?: boolean }) {
  return (
    <p className={`section-label${light ? ' section-label-light' : ''}`}>
      {number ? <span>{number}</span> : null}
      {number ? <i /> : null}
      {children}
    </p>
  );
}

function AboutSection() {
  return (
    <>
      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-copy">
          <SectionLabel>About ACFTA Fest</SectionLabel>
          <h2 id="about-title" className="display-heading">AFRICA CONNECTED<br />THROUGH <em>TRADE,</em><br /><em>TALENT & CULTURE.</em></h2>
          <p className="lead-copy">A rotating Pan-African festival built around the things that move us forward—and the people who make them possible.</p>
          <p>ACFTA Fest brings startups, creatives, athletes, business leaders and institutions together to celebrate Africa, build connections and create opportunities for shared economic growth. Its purpose sits alongside the African Continental Free Trade Area: making continental collaboration tangible through enterprise, cultural exchange and sport.</p>
          <p>From youth empowerment and innovation to cultural preservation and cross-border business, the festival imagines a more connected African future—one relationship at a time.</p>
          <a className="text-link" href="#pillars" data-testid="link-about-pillars">Meet the three pillars <ArrowRight size={16} /></a>
        </div>
        <div className="about-visual">
          <div className="about-photo-wrap">
            <img src="/images/hero-cultural.webp" alt="Dancers in bright red traditional dress perform at a street celebration" />
            <span className="photo-caption">A continent in motion</span>
          </div>
          <div className="about-graphic" aria-hidden="true"><span>AFRICA</span><b>◎</b><span>CONNECTED</span></div>
        </div>
      </section>
      <PartnerMarquee />
    </>
  );
}

function PartnerMarquee() {
  const partners = [
    { name: 'PCNSLP', logo: '/images/partners/pcnslp.svg' },
    { name: 'D Farm Ventures', logo: '/images/partners/d-farm-ventures.svg' },
    { name: 'Crowngrid Engineering', logo: '/images/partners/crowngrid-engineering.svg' },
    { name: 'FIFPRO Africa', logo: '/images/partners/fifpro-africa.svg' },
    { name: 'MINADER', logo: '/images/partners/minader.svg' },
    { name: 'Energy Commission of Nigeria', logo: '/images/partners/energy-commission-nigeria.svg' },
  ];
  return (
    <section className="partners" aria-label="Partner logo showcase" data-testid="section-provisional-partners">
      <div className="marquee" aria-label="Moving strip of partner logos or marks">
        <div className="marquee-track">
          {[...partners, ...partners].map((partner, index) => (
            <div className="logo-slot" key={`${partner.name}-${index}`} aria-label={`Partner ${partner.name}`}>
              <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="pillars-section" id="event" aria-labelledby="pillars-title">
      <div className="section-topline" id="pillars">
        <div><SectionLabel light>The festival</SectionLabel><h2 className="display-heading light-heading" id="pillars-title">THREE PILLARS.<br /><em>ONE AFRICAN FUTURE.</em></h2></div>
        <p className="section-intro light-copy">Three distinct worlds. One shared platform for the people shaping Africa’s next chapter.</p>
      </div>
      <div className="pillars-list">
        {pillars.map((pillar, index) => (
          <article className={`pillar-row${index % 2 ? ' pillar-row-reverse' : ''}`} key={pillar.id} id={pillar.id}>
            <div className="pillar-image"><img src={pillar.image} alt={pillar.alt} loading="lazy" /><span className="pillar-image-count">{pillar.number} / 03</span></div>
            <div className="pillar-copy">
              <span className="pillar-number">{pillar.number}</span>
              <p className="pillar-descriptor">{pillar.descriptor}</p>
              <h3 className="serif">{pillar.name}</h3>
              <p>{pillar.copy}</p>
              <a className="text-link text-link-light" href="#programme" data-testid={`link-pillar-${pillar.id}`}>Explore this experience <ArrowRight size={16} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RotationSection() {
  const steps = [
    ['01', 'Host a nation', 'Each edition brings continental attention and new possibilities to its host country.'],
    ['02', 'Connect people & industries', 'Entrepreneurs, creatives, athletes, policymakers, investors and institutions meet across borders.'],
    ['03', 'Build a lasting legacy', 'The ambition continues beyond the event: relationships, opportunity, cultural exchange and stronger networks.'],
  ];
  return (
    <section className="rotation-section" aria-labelledby="rotation-title">
      <div className="rotation-heading">
        <SectionLabel>A festival on the move</SectionLabel>
        <h2 className="display-heading" id="rotation-title">ONE FESTIVAL.<br /><em>MANY NATIONS.</em></h2>
        <p>ACFTA Fest’s model is designed to travel—sharing the platform across African host countries and building connections that endure.</p>
      </div>
      <div className="rotation-route" aria-hidden="true">
        <div className="route-globe"><span className="globe-lines" /><img className="route-map-mark" src="/images/africa-map-mark.png" alt="" style={{ position: 'absolute', width: '78%', height: '78%', objectFit: 'contain', opacity: 0.36 }} /><b>AFRICA</b><i>ROTATIONAL<br />HOST MODEL</i></div>
        <span className="route-line" /><span className="route-node node-a">HOST</span><span className="route-node node-b">CONNECT</span><span className="route-node node-c">LEGACY</span>
      </div>
      <div className="rotation-steps">
        {steps.map(([num, title, text]) => <article className="rotation-step" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="vision-section">
      <div className="vision-top">
        <SectionLabel light>Why we gather</SectionLabel>
        <p className="vision-quote serif">“A future where African connection is not an idea, but a lived experience.”</p>
      </div>
      <div className="vision-grid">
        <article><span className="vision-kicker">OUR VISION</span><h2>Culture united.<br />Opportunity shared.</h2><p>To be a leading African festival that unites cultures, showcases African heritage, and drives trade, innovation and sport across the continent.</p></article>
        <article><span className="vision-kicker">OUR MISSION</span><h2>Make room<br />for possibility.</h2><p>Create platforms for African startups and entrepreneurs. Celebrate culture through music, fashion, art and story. Promote sport as a tool for unity, diplomacy and youth inspiration. Connect people, industries and opportunities across borders.</p></article>
        <article className="vision-why"><span className="vision-kicker">WHY IT MATTERS</span><p>Trade needs trust. Culture makes connection human. Talent needs a stage. Bringing them together can help policy meet real people, give businesses room to grow and invite the next generation to see what is possible.</p><a className="text-link text-link-light" href="#participate" data-testid="link-vision-participate">Find your place in it <ArrowRight size={16} /></a></article>
      </div>
      <div className="vision-baseline"><span>ONE CONTINENT</span><i /><span>MANY VOICES</span><i /><span>A SHARED FUTURE</span></div>
    </section>
  );
}

function ProjectionSection() {
  const values = ['Unity', 'Innovation', 'Inclusion', 'Excellence', 'Sustainable impact', 'Long-term legacy'];
  return (
    <section className="projection-section" aria-labelledby="projection-title">
      <div className="projection-image"><img src="/images/what-we-project.jpg" alt="An ACFTA Fest flag standing above the coast at a beach" loading="lazy" /><span className="image-label">THE IDEA IN ACTION</span></div>
      <div className="projection-copy">
        <SectionLabel>Beyond the gathering</SectionLabel>
        <h2 className="display-heading" id="projection-title">WHAT WE<br /><em>PROJECT.</em></h2>
        <p className="lead-copy">A festival can be a moment. Its value is what people carry forward.</p>
        <p>ACFTA Fest aims to create value that extends beyond the event itself—through relationships formed, ideas exchanged, culture honoured and possibilities opened.</p>
        <div className="value-list">{values.map((value, i) => <span key={value}><i>0{i + 1}</i>{value}</span>)}</div>
      </div>
    </section>
  );
}

function ParticipateSection() {
  const links = [
    { label: 'Register for the festival', detail: 'Join the community', href: registrationUrl, internal: true },
    { label: 'Get ticket information', detail: 'Visit the official ticket page', href: ticketUrl, internal: true },
    { label: 'Book an exhibition stand', detail: 'Bring your work to the floor', href: standUrl, internal: true },
    { label: 'Become a sponsor', detail: 'Explore sponsorship enquiries', href: sponsorUrl, internal: true },
    { label: 'Become a partner', detail: 'Explore partnership enquiries', href: partnerUrl, internal: true },
    { label: 'Join the programme', detail: 'Ask about programme participation', href: '#contact', category: 'programme' },
  ];
  return (
    <section className="participate-section" id="participate" aria-labelledby="participate-title">
      <div className="participate-backdrop" aria-hidden="true">AFRICA</div>
      <div className="participate-copy">
        <SectionLabel light>Make your mark</SectionLabel>
        <h2 className="display-heading light-heading" id="participate-title">BE PART OF<br />AFRICA’S <em>NEXT<br />CHAPTER.</em></h2>
        <p>Entrepreneur, investor, exhibitor, creative, athlete, institution or curious traveller—there is room to take part.</p>
      </div>
      <div className="participation-links">
        {links.map((link, index) => link.category ? (
          <a key={link.label} href={link.href} className="participation-link" onClick={() => requestCategory(link.category!)} data-testid={`link-participate-${index}`}>
            <span className="participation-text"><strong>{link.label}</strong><small>{link.detail}</small></span><ArrowUpRight size={18} />
          </a>
        ) : link.internal ? (
          <Link key={link.label} href={link.href} className="participation-link" data-testid={`link-participate-${index}`}>
            <span className="participation-text"><strong>{link.label}</strong><small>{link.detail}</small></span><ArrowUpRight size={18} />
          </Link>
        ) : (
          <a key={link.label} href={link.href} className="participation-link" data-testid={`link-participate-${index}`}>
            <span className="participation-text"><strong>{link.label}</strong><small>{link.detail}</small></span><ArrowUpRight size={18} />
          </a>
        ))}
        <p className="destination-note">Links lead to currently published official ACFTA Fest destinations. No ticket prices, deadlines or package details are stated here.</p>
      </div>
    </section>
  );
}

export default function LandingPage() {
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <main>
      <Hero />
      <AboutSection />
      <PillarsSection />
      <RotationSection />
      <VisionSection />
      <ProjectionSection />
      <ParticipateSection />
      <SpeakersSection />
      <ProgrammeSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
