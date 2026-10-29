import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, ChevronDown, Mail, Send, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import {
  MISS_FAQS,
  MISS_JOURNEY_STEPS,
  MISS_PILLARS,
  MISS_READINESS_CHECKLIST,
} from '@/data/missAcftaData';
import { sendFestivalEmail } from '@/lib/emailDispatch';

export function MissAboutSection() {
  return (
    <section className="ma-about-section" id="about-miss-acfta">
      <div className="ma-container">
        <div className="ma-about-grid">
          <div className="ma-about-copy">
            <span className="ma-eyebrow">CULTURE · LEADERSHIP · REPRESENTATION</span>
            <h2 className="ma-section-title">
              Where African Heritage Meets <em className="ma-italic-accent">Contemporary Leadership.</em>
            </h2>
            <p className="ma-lead-text">
              Miss ACFTA Fest is a signature cultural and ambassadorial showcase within the wider ACFTA Fest
              movement—created to celebrate the poise, intellect, creativity, and leadership of African women.
            </p>
            <p className="ma-body-text">
              Integrated into the festival’s cultural pillar alongside continental trade and innovation forums,
              Miss ACFTA Fest elevates cultural pride as a vital force in uniting Africa’s people and creative economy.
            </p>

            <div className="ma-highlight-callout">
              <Sparkles size={18} className="ma-callout-icon" />
              <p>
                More than a stage showcase, Miss ACFTA Fest honours women who embody cultural authenticity,
                purposeful voice, and pan-African ambition.
              </p>
            </div>
          </div>

          <div className="ma-about-visual">
            <div className="ma-visual-card">
              <img
                src="/images/register-volunteers.jpg"
                alt="Confident Black African women representing culture and leadership at ACFTA Fest"
                loading="lazy"
              />
              <div className="ma-visual-caption">
                <span>HERITAGE WAVES &amp; CULTURAL SHOWCASE</span>
                <strong>Celebrating the voice, grace, and leadership of African women.</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="ma-pillars-grid">
          {MISS_PILLARS.map((pillar) => (
            <article className="ma-pillar-card" key={pillar.number}>
              <div className="ma-pillar-top">
                <span className="ma-pillar-num">{pillar.number}</span>
                <span className="ma-pillar-sub">{pillar.subtitle}</span>
              </div>
              <h3 className="ma-pillar-title">{pillar.title}</h3>
              <p className="ma-pillar-desc">{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MissJourneySection() {
  return (
    <section className="ma-journey-section" id="miss-journey">
      <div className="ma-container">
        <div className="ma-section-header">
          <span className="ma-eyebrow ma-eyebrow-gold">THE JOURNEY · HOW TO PARTICIPATE</span>
          <h2 className="ma-section-title ma-text-white">
            Five Stages from Discovery to the <em className="ma-italic-gold">Festival Stage.</em>
          </h2>
          <p className="ma-lead-text ma-text-muted">
            Follow a clear, guided pathway designed to support prospective participants from initial expression of interest
            through official selection and live presentation at ACFTA Fest.
          </p>
        </div>

        <div className="ma-journey-grid">
          {MISS_JOURNEY_STEPS.map((step) => (
            <div className="ma-journey-step" key={step.code}>
              <div className="ma-journey-head">
                <span className="ma-journey-code">{step.code}</span>
                <span className="ma-journey-divider" />
              </div>
              <h3 className="ma-journey-stage">{step.stage}</h3>
              <p className="ma-journey-desc">{step.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MissEligibilityAndInterestSection() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [inquiryType, setInquiryType] = useState('Prospective Candidate — Expression of Interest');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInterestSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    setSubmitting(true);
    await sendFestivalEmail(email, {
      _subject: 'Miss ACFTA Fest — Expression of Interest Received',
      Programme: 'Miss ACFTA Fest — Cultural & Leadership Showcase',
      Applicant_or_Contact_Name: fullName,
      Email: email,
      Country: country || 'Not specified',
      Inquiry_Category: inquiryType,
      Statement_or_Notes: notes || 'Requested official Miss ACFTA Fest application updates.',
      Next_Steps:
        'Thank you for registering your interest in Miss ACFTA Fest. The ACFTA Fest Secretariat will notify you with official edition guidelines and application instructions.',
      Official_Contact: 'info@acftafest.com | +234 806 344 5195',
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="ma-apply-section" id="register-interest">
      <div className="ma-container">
        <div className="ma-apply-grid">
          <div className="ma-eligibility-box">
            <span className="ma-eyebrow">ELIGIBILITY &amp; APPLICATION STATUS</span>
            <h2 className="ma-section-title">
              Participant Readiness &amp; <em className="ma-italic-accent">Official Guidelines.</em>
            </h2>
            <p className="ma-body-text">
              Official edition-specific eligibility criteria, application windows, and delegate guidelines for the
              upcoming edition are issued directly by the ACFTA Fest Secretariat.
            </p>

            <div className="ma-checklist-card">
              <h3>Core Ambassadorial Qualities</h3>
              <ul className="ma-checklist">
                {MISS_READINESS_CHECKLIST.map((item) => (
                  <li key={item}>
                    <span className="ma-check-badge">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ma-secretariat-note">
              <strong>Official Secretariat Desk</strong>
              <p>
                For candidate inquiries, national cultural delegations, or fashion and brand collaborations, contact{' '}
                <a href="mailto:info@acftafest.com">info@acftafest.com</a> or explore{' '}
                <Link href="/partnership">Partnership Opportunities</Link>.
              </p>
            </div>
          </div>

          <div className="ma-interest-card">
            {submitted ? (
              <div className="ma-interest-success" role="status">
                <div className="ma-success-badge">
                  <Check size={28} />
                </div>
                <h3>Expression of Interest Received</h3>
                <p>
                  Thank you, <strong>{fullName}</strong>. Your interest in <strong>Miss ACFTA Fest</strong> has been
                  recorded, and a confirmation has been sent to <strong>{email}</strong>.
                </p>
                <button
                  type="button"
                  className="ma-btn ma-btn-gold"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setCountry('');
                    setNotes('');
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInterestSubmit} className="ma-interest-form">
                <span className="ma-eyebrow ma-eyebrow-gold">OFFICIAL APPLICATION &amp; UPDATES DESK</span>
                <h3>Register Your Interest</h3>
                <p>
                  Register to receive the official Miss ACFTA Fest application pack and edition briefing as soon as the Secretariat opens candidate submissions.
                </p>

                <div className="ma-form-field">
                  <label htmlFor="ma-name">Full Name *</label>
                  <input
                    id="ma-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="ma-form-row">
                  <div className="ma-form-field">
                    <label htmlFor="ma-email">Email Address *</label>
                    <input
                      id="ma-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="ma-form-field">
                    <label htmlFor="ma-country">Country *</label>
                    <input
                      id="ma-country"
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ma-form-field">
                  <label htmlFor="ma-type">Inquiry Category</label>
                  <select
                    id="ma-type"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                  >
                    <option value="Prospective Candidate — Expression of Interest">
                      Prospective Candidate — Expression of Interest
                    </option>
                    <option value="Cultural / Fashion Brand Collaboration">
                      Cultural / Fashion Brand Collaboration
                    </option>
                    <option value="Sponsorship & Media Partnership">
                      Sponsorship &amp; Media Partnership
                    </option>
                  </select>
                </div>

                <div className="ma-form-field">
                  <label htmlFor="ma-notes">Brief Introduction or Inquiry Notes</label>
                  <textarea
                    id="ma-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="ma-btn ma-btn-gold ma-btn-full"
                  data-testid="button-submit-miss-acfta-interest"
                >
                  <Send size={15} />
                  <span>{submitting ? 'Submitting...' : 'Register Interest'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MissFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="ma-faq-section" id="miss-faq">
      <div className="ma-container ma-faq-container">
        <div className="ma-section-header">
          <span className="ma-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="ma-section-title">
            Everything You Need to Know About <em className="ma-italic-accent">Miss ACFTA Fest.</em>
          </h2>
        </div>

        <div className="ma-faq-list">
          {MISS_FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div className={`ma-faq-item ${isOpen ? 'is-open' : ''}`} key={item.question}>
                <button
                  type="button"
                  className="ma-faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span>{item.question}</span>
                  <ChevronDown size={18} className={`ma-faq-chevron ${isOpen ? 'is-rotated' : ''}`} />
                </button>
                {isOpen && (
                  <div className="ma-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="ma-final-cta-banner">
          <div>
            <span className="ma-eyebrow ma-eyebrow-gold">JOIN THE MOVEMENT</span>
            <h3>Step Forward for Africa’s Cultural &amp; Leadership Showcase</h3>
            <p>
              Connect with the ACFTA Fest Secretariat for candidate updates, cultural showcases, or official sponsorship inquiries.
            </p>
          </div>
          <div className="ma-final-cta-actions">
            <a href="#register-interest" className="ma-btn ma-btn-gold">
              <span>Register Interest</span>
              <ArrowUpRight size={15} />
            </a>
            <a href="mailto:info@acftafest.com?subject=Miss%20ACFTA%20Fest%20Inquiry" className="ma-btn ma-btn-outline">
              <Mail size={15} />
              <span>Contact the Team</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
