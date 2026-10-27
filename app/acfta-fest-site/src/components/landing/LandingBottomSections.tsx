import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { programmeSnapshots, speakers } from '@/data/festival';

const ticketUrl = '/tickets';
const registrationUrl = '/register';
const standUrl = '/buy-a-stand';
const sponsorUrl = '/not-found';
const partnerUrl = '/partnership';

function requestCategory(category: string) {
  window.dispatchEvent(new CustomEvent('acfta:enquiry', { detail: category }));
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

export function SpeakersSection() {
  return (
    <section className="speakers-section" id="speakers" aria-labelledby="speakers-title">
      <div className="speakers-heading">
        <div><SectionLabel>People & ideas</SectionLabel><h2 className="display-heading" id="speakers-title">FEATURED<br /><em>SPEAKERS.</em></h2></div>
        <div className="speakers-context"><p>A distinguished lineup of leaders, visionaries and changemakers.</p><span>Published for the 2026 edition; participation has not been reconfirmed for a future edition.</span></div>
      </div>
      <div className="speakers-grid">
        {speakers.map((speaker, index) => (
          <article className="speaker-card" key={speaker.name} data-testid={`card-speaker-${index}`}>
            <div className="speaker-portrait">
              {speaker.image ? <img src={`/images/speakers/${speaker.image}`} alt={`Portrait of ${speaker.name}`} loading="lazy" /> : <div className="portrait-pending" aria-label={`Portrait pending for ${speaker.name}`}><span>{speaker.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('')}</span><small>PORTRAIT<br />PENDING</small></div>}
              <span className="speaker-index">2026 / {String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3>{speaker.name}</h3><p>{speaker.role}</p>
          </article>
        ))}
      </div>
      <p className="speaker-footnote">Names and roles are reproduced as published on the current ACFTA Fest website. Please confirm current titles and participation before publishing future-edition materials.</p>
    </section>
  );
}

export function ProgrammeSection() {
  const [openGroup, setOpenGroup] = useState('Startup Flames Arena');

  return (
    <section className="programme-section" id="programme" aria-labelledby="programme-title">
      <div className="programme-heading">
        <div><SectionLabel light>Programme snapshot</SectionLabel><h2 className="display-heading light-heading" id="programme-title">GAMBIA<br /><em>2027.</em></h2></div>
        <div className="programme-context"><span className="provisional-stamp">PROVISIONAL / SUBJECT TO CONFIRMATION</span><p>Three signature experiences. One continental celebration.</p><p className="programme-small">The current site positions Gambia as the host for 2027; all programme elements remain provisional until confirmed.</p></div>
      </div>

      <div className="programme-accordion" aria-label="Programme snapshot accordion">
        {programmeSnapshots.map((snapshot) => {
          const isOpen = openGroup === snapshot.title;
          return (
            <div className={`programme-accordion-item programme-${snapshot.tone} ${isOpen ? 'is-open' : ''}`} key={snapshot.title}>
              <button
                type="button"
                className="programme-accordion-trigger"
                aria-expanded={isOpen}
                onClick={() => setOpenGroup(isOpen ? '' : snapshot.title)}
              >
                <span>{snapshot.title}</span>
                <span className="programme-accordion-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="programme-accordion-panel">
                  <div className="programme-feature">
                    <img src={snapshot.image} alt={snapshot.alt} loading="lazy" />
                    <div className="programme-feature-copy">
                      <p className="programme-feature-label">Experience focus</p>
                      <p>{snapshot.summary}</p>
                    </div>
                  </div>

                  <div className="programme-detail-list">
                    {snapshot.items.map((item) => (
                      <article className="programme-detail" key={item.title}>
                        <img src={item.image} alt={item.alt} loading="lazy" />
                        <div className="programme-detail-copy">
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <a className="text-link text-link-light programme-contact-link" href="#contact" onClick={() => requestCategory('programme')} data-testid="link-programme-enquiry">Ask about the programme <ArrowUpRight size={16} /></a>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-heading">
        <SectionLabel>Contact & partnership enquiries</SectionLabel>
        <h2 className="display-heading" id="contact-title">LET’S BUILD<br />AFRICA’S FUTURE<br /><em>TOGETHER.</em></h2>
        <p>For general enquiries, sponsorship, partnerships, exhibitions, programme participation, media or ticket information, start a conversation.</p>
        <div className="contact-details">
          <a href="mailto:info@acftafest.com" onClick={(event) => { event.preventDefault(); window.location.href = 'mailto:info@acftafest.com'; }} data-testid="link-contact-email"><span>EMAIL</span>info@acftafest.com<ArrowUpRight size={15} /></a>
          <a href="tel:+2348063445195" data-testid="link-contact-phone"><span>PHONE</span>+234 806 344 5195<ArrowUpRight size={15} /></a>
        </div>
        <p className="contact-address-note">Contact details as currently published. The Abuja address and edition information require confirmation.</p>
      </div>
      <div className="contact-form-wrap"><div className="form-kicker">WRITE TO THE FESTIVAL TEAM</div><ContactForm /></div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block"><a className="brand-link brand-link-footer" href="#home" aria-label="ACFTA Fest home" data-testid="link-footer-home"><img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" /></a><p>A Pan-African festival bringing trade, talent and culture into one conversation.</p><div className="footer-theme">ONE AFRICA.<br /><em>ONE MARKET.</em><br />ONE FUTURE.</div></div>
        <div className="footer-column"><span>EXPLORE</span><a href="#about" data-testid="link-footer-about">About us</a><a href="#event" data-testid="link-footer-event">The event</a><a href="#speakers" data-testid="link-footer-speakers">Featured speakers</a><a href="#programme" data-testid="link-footer-programme">Programme snapshot</a></div>
        <div className="footer-column"><span>TAKE PART</span><a href={registrationUrl} data-testid="link-footer-register">Register <ArrowUpRight size={12} /></a><a href={ticketUrl} data-testid="link-footer-ticket">Get a ticket <ArrowUpRight size={12} /></a><a href={standUrl} data-testid="link-footer-stand">Buy a stand <ArrowUpRight size={12} /></a><a href={partnerUrl} data-testid="link-footer-partner">Become a partner <ArrowUpRight size={12} /></a><a href={sponsorUrl} target="_blank" rel="noreferrer" data-testid="link-footer-sponsor">Become a sponsor <ArrowUpRight size={12} /></a></div>
        <div className="footer-column footer-contact"><span>GET IN TOUCH</span><a href="mailto:info@acftafest.com" onClick={(event) => { event.preventDefault(); window.location.href = 'mailto:info@acftafest.com'; }} data-testid="link-footer-email">info@acftafest.com</a><a href="tel:+2348063445195" data-testid="link-footer-phone">+234 806 344 5195</a><a href="#contact" data-testid="link-footer-contact">Send an enquiry <ArrowUpRight size={12} /></a></div>
        <div className="footer-column footer-social"><span>FOLLOW THE FESTIVAL</span><a href="https://www.facebook.com/acftafest" target="_blank" rel="noreferrer" data-testid="link-footer-facebook">Facebook <ArrowUpRight size={12} /></a><a href="https://www.instagram.com/acftafest/reels" target="_blank" rel="noreferrer" data-testid="link-footer-instagram">Instagram <ArrowUpRight size={12} /></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ACFTA Fest. All rights reserved.</span><span>Published theme and edition details remain subject to confirmation.</span><a href="#home" data-testid="link-back-to-top">Back to top <ArrowUpRight size={13} /></a></div>
      <div className="footer-endline">ONE AFRICA. ONE MARKET. ONE FUTURE.</div>
    </footer>
  );
}
