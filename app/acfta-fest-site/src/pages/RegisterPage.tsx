import { ArrowRight, Check, ChevronRight, Globe2, Map, Sparkles, UserRound } from 'lucide-react';
import { Link } from 'wouter';
import { useMemo, useState } from 'react';

type CategoryKey = 'delegate' | 'startup' | 'creative' | 'sport';

type FieldMap = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  organisation: string;
  role: string;
  interests: string;
  notes: string;
};

const categories: Array<{ key: CategoryKey; title: string; subtitle: string; summary: string; accent: string; image: string }> = [
  { key: 'delegate', title: 'Attendee / Delegate', subtitle: 'Festival access', summary: 'For people attending the festival and participating in its activities across trade, culture, and community.', accent: 'Forest', image: '/images/hero-cultural.webp' },
  { key: 'startup', title: 'Startup / Business Delegate', subtitle: 'Innovation and enterprise', summary: 'For founders, operators, and business leaders building the next chapter of African enterprise.', accent: 'Gold', image: '/images/startup-flames.webp' },
  { key: 'creative', title: 'Performer / Creative', subtitle: 'Culture and expression', summary: 'For artists, makers, creatives, and cultural contributors bringing African creative energy to life.', accent: 'Ivory', image: '/images/heritage-waves.webp' },
  { key: 'sport', title: 'Football / Sporting Delegate', subtitle: 'Sport and legacy', summary: 'For football stakeholders, sporting delegates, and people shaping the role of sport in African culture.', accent: 'Olive', image: '/images/african-legends.webp' },
];

const categoryLabels: Record<CategoryKey, string> = {
  delegate: 'Attendee / Delegate',
  startup: 'Startup / Business Delegate',
  creative: 'Performer / Creative',
  sport: 'Football / Sporting Delegate',
};

const initialForm: FieldMap = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  organisation: '',
  role: '',
  interests: '',
  notes: '',
};

export default function RegisterPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('delegate');
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FieldMap>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const categoryMeta = useMemo(
    () => categories.find((category) => category.key === selectedCategory) ?? categories[0],
    [selectedCategory],
  );

  const updateField = (key: keyof FieldMap, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const nextStep = () => setStep((current) => Math.min(current + 1, 4));
  const previousStep = () => setStep((current) => Math.max(current - 1, 1));

  const canSubmit = [form.fullName, form.email, form.phone, form.country].every(Boolean);

  const handleCategorySelect = (key: CategoryKey) => {
    setSelectedCategory(key);
    setTimeout(() => {
      const formPanel = document.getElementById('register-form-panel');
      if (formPanel) {
        formPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const summaryItems = [
    { label: 'Selected category', value: categoryLabels[selectedCategory] },
    { label: 'Name', value: form.fullName || 'Not provided yet' },
    { label: 'Email', value: form.email || 'Not provided yet' },
    { label: 'Country', value: form.country || 'Not provided yet' },
  ];

  if (submitted) {
    return (
      <div className="register-page-shell">
        <header className="register-header">
          <Link href="/" className="brand-link" aria-label="ACFTA Fest home">
            <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
          </Link>
          <nav className="register-header-nav" aria-label="Secondary navigation">
            <Link href="/">Back to festival</Link>
          </nav>
        </header>

        <main className="register-page success-screen">
          <div className="success-card">
            <div className="success-badge"><Check size={18} /></div>
            <p className="eyebrow">Registration form prepared</p>
            <h1>Your details are ready for the next step.</h1>
            <p>
              This interface has been built and styled for the ACFTA Fest registration flow. Your selected category,
              personal information, and participation details are captured in the browser and can be connected to a live
              API endpoint when the backend is ready.
            </p>
            <div className="success-summary">
              {summaryItems.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className="success-actions">
              <Link href="/" className="primary-button">Return home</Link>
              <button type="button" className="secondary-button" onClick={() => setSubmitted(false)}>Edit details</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="register-page-shell">
      <header className="register-header">
        <Link href="/" className="brand-link" aria-label="ACFTA Fest home">
          <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
        </Link>
        <nav className="register-header-nav" aria-label="Secondary navigation">
          <Link href="/">Festival home</Link>
          <a href="https://acftafest.com/buy-tickets/" target="_blank" rel="noreferrer">Get tickets</a>
        </nav>
      </header>

      <main className="register-page">
        <section className="register-hero">
          <div className="register-hero-overlay" />
          <div className="register-hero-content">
            <p className="eyebrow">ACFTA FEST · GAMBIA 2027</p>
            <h1>Your Place in Africa’s Next Chapter.</h1>
            <p>
              Join the people shaping Africa’s future through culture, creativity, entrepreneurship, trade, and collaboration.
            </p>
            <div className="register-hero-actions">
              <Link href="/#participate" className="primary-button">Explore the festival <ArrowRight size={16} /></Link>
              <Link href="/" className="secondary-button">Back home</Link>
            </div>
          </div>
        </section>

        <section className="register-pathways">
          <div className="section-head">
            <h2>Choose your registration pathway.</h2>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category.key}
                type="button"
                className={`category-card${selectedCategory === category.key ? ' active' : ''}`}
                onClick={() => handleCategorySelect(category.key)}
              >
                <div className="category-thumb" style={{ backgroundImage: `linear-gradient(135deg, rgba(12, 43, 33, 0.28), rgba(12, 43, 33, 0.6)), url(${category.image})` }} />
                <div className="category-copy">
                  <span>{category.subtitle}</span>
                  <h3>{category.title}</h3>
                  <p>{category.summary}</p>
                </div>
                <span className="category-arrow" aria-hidden="true"><ChevronRight size={18} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="register-form-panel" id="register-form-panel">
          <div className="form-panel-head">
            <div>
              <p className="eyebrow">Registration form</p>
              <h2>{categoryLabels[selectedCategory]}</h2>
            </div>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-step">
                <div className="step-heading">
                  <div>
                    <h3>Your category</h3>
                    <p>Choose the registration pathway that best reflects how you will join the festival.</p>
                  </div>
                </div>
                <div className="selected-pill-box">
                  <strong>{categoryMeta.title}</strong>
                  <small>{categoryMeta.summary}</small>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <div className="step-heading">
                  <div>
                    <h3>Personal details</h3>
                    <p>Tell us who you are and how we can reach you.</p>
                  </div>
                </div>
                <div className="field-grid">
                  <label className="field">
                    <span>Full name</span>
                    <input value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} placeholder="Your full name" required />
                  </label>
                  <label className="field">
                    <span>Email address</span>
                    <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="name@email.com" required />
                  </label>
                  <label className="field">
                    <span>Phone number</span>
                    <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="+234 800 000 0000" required />
                  </label>
                  <label className="field">
                    <span>Country of residence</span>
                    <input value={form.country} onChange={(event) => updateField('country', event.target.value)} placeholder="Nigeria" required />
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <div className="step-heading">
                  <div>
                    <h3>Your participation</h3>
                    <p>Share the details that help us understand your role and interests.</p>
                  </div>
                </div>
                <div className="field-grid">
                  <label className="field">
                    <span>Organisation or company</span>
                    <input value={form.organisation} onChange={(event) => updateField('organisation', event.target.value)} placeholder="Company, startup, studio, or institution" />
                  </label>
                  <label className="field">
                    <span>Role or title</span>
                    <input value={form.role} onChange={(event) => updateField('role', event.target.value)} placeholder="Founder, artist, athlete, delegate, etc." />
                  </label>
                  <label className="field field-full">
                    <span>Participation interests</span>
                    <textarea value={form.interests} onChange={(event) => updateField('interests', event.target.value)} placeholder="Tell us what interests you most about ACFTA Fest, the activities you want to take part in, or the kind of engagement you are seeking." rows={4} />
                  </label>
                  <label className="field field-full">
                    <span>Additional notes</span>
                    <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Optional context, goals, or any details that may help us understand your participation." rows={4} />
                  </label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="form-step">
                <div className="step-heading">
                  <div>
                    <h3>Review your registration</h3>
                    <p>Confirm your category and details before continuing.</p>
                  </div>
                </div>
                <div className="review-box">
                  <div className="review-row">
                    <span>Category</span>
                    <strong>{categoryLabels[selectedCategory]}</strong>
                  </div>
                  <div className="review-row">
                    <span>Full name</span>
                    <strong>{form.fullName}</strong>
                  </div>
                  <div className="review-row">
                    <span>Email</span>
                    <strong>{form.email}</strong>
                  </div>
                  <div className="review-row">
                    <span>Phone</span>
                    <strong>{form.phone}</strong>
                  </div>
                  <div className="review-row">
                    <span>Country</span>
                    <strong>{form.country}</strong>
                  </div>
                  <div className="review-row">
                    <span>Organisation</span>
                    <strong>{form.organisation || 'Not provided'}</strong>
                  </div>
                  <div className="review-row">
                    <span>Role</span>
                    <strong>{form.role || 'Not provided'}</strong>
                  </div>
                  <div className="review-row review-caption">
                    <span>Participation interests</span>
                    <strong>{form.interests || 'Not provided'}</strong>
                  </div>
                </div>
              </div>
            )}

            <div className="form-actions">
              {step > 1 && (
                <button type="button" className="secondary-button" onClick={previousStep}>Previous</button>
              )}
              {step < 4 ? (
                <button type="button" className="primary-button" onClick={nextStep}>Continue <ChevronRight size={16} /></button>
              ) : (
                <button type="submit" className="primary-button" disabled={!canSubmit}>Submit registration</button>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
