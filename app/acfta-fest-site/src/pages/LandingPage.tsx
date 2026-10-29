import './landing.css';
import { useEffect } from 'react';
import { Link } from 'wouter';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight,
} from 'lucide-react';
import { pillars } from '@/data/festival';
import { SiteNavigation } from '@/components/layout/SiteNavigation';
import {
  ContactSection,
  Footer,
  SpeakersSection,
} from '@/components/landing/LandingBottomSections';

const ticketUrl = '/tickets';
const registrationUrl = '/register';
const standUrl = '/buy-a-stand';
const sponsorUrl = '/partnership';
const partnerUrl = '/partnership';
const missAcftaUrl = '/miss-acfta-fest';

function requestCategory(category: string) {
  window.dispatchEvent(new CustomEvent('acfta:enquiry', { detail: category }));
}

function Hero() {
  return (
    <section className="hero site-grain" id="home" aria-labelledby="hero-title">
      <div className="hero-image" role="img" aria-label="Festival dancers in vivid red and gold costumes celebrating together" />
      <div className="hero-shade" />
      <SiteNavigation overlay />
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
          <Link className="button button-gold" href={registrationUrl} data-testid="button-hero-register">Register <ArrowUpRight size={16} /></Link>
          <Link className="button button-outline-light" href={ticketUrl} data-testid="button-hero-ticket">Get a Ticket <ArrowDownRight size={16} /></Link>
        </div>
      </div>
      <div className="hero-bottom">
        <p>ACFTA FEST / GAMBIA 2027</p>
        <a className="scroll-cue" href="#event" aria-label="Scroll to The Event" data-testid="link-scroll-about"><span>Scroll to discover</span><ArrowDown size={14} /></a>
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
              <Link className="text-link text-link-light" href={`/about#${pillar.id}`} data-testid={`link-pillar-${pillar.id}`}>Explore this experience <ArrowRight size={16} /></Link>
            </div>
          </article>
        ))}
      </div>
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
    { label: 'Miss ACFTA Fest', detail: 'Celebrate African women, leadership & culture', href: missAcftaUrl, internal: true },
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
      <PartnerMarquee />
      <PillarsSection />
      <ProjectionSection />
      <ParticipateSection />
      <SpeakersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
