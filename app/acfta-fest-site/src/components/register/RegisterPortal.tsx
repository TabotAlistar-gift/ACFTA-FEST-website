import { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { REGISTRATION_STREAMS, type RegistrationStream, type StreamKey } from '@/data/registerData';

export interface RegisterFormData {
  streamKey: StreamKey;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  organization: string;
  role: string;
  streamOption: string;
  notes: string;
  agreed: boolean;
}

interface PortalProps {
  currentStream: RegistrationStream;
  onSelectStream: (key: StreamKey) => void;
  onSuccess: (data: RegisterFormData) => void;
}

const STREAM_OPTIONS: Record<StreamKey, string[]> = {
  vendor: ['Standard Artisan Stand (1m x 2m)', 'Premium Pavilion Booth (3m x 3m)', 'Culinary & Food Court Stall', 'Tech & Innovation Showcase Bay'],
  volunteer: ['Guest Relations & VIP Protocol', 'Media, Press & Social Broadcast', 'Stage Management & Artist Liaison', 'Language Translation & Interpretation'],
  delegate: ['Venture Capital & Dealroom Matchmaking', 'Cross-Border Trade Policy & Tariff Advisory', 'Agribusiness & Renewable Energy Synergies', 'Creative Economy & Digital Intellectual Property'],
  attendee: ['Heritage Waves Cultural Spectacle & Concerts', 'African Legends United Football Gala Match', 'Startup Flames Innovation & Pitch Arena', 'Full 3-Day Festival Observer Access'],
};

export function RegisterPortal({ currentStream, onSelectStream, onSuccess }: PortalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<RegisterFormData>({
    streamKey: currentStream.key, fullName: '', email: '', phone: '', country: '',
    organization: '', role: '', streamOption: '', notes: '', agreed: false,
  });

  const update = (key: keyof RegisterFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isStep1Valid = Boolean(form.fullName.trim() && form.email.trim() && form.phone.trim() && form.country.trim());
  const isStep2Valid = Boolean(form.organization.trim() && form.role.trim() && form.streamOption.trim() && form.notes.trim());
  const canSubmit = Boolean(isStep1Valid && isStep2Valid && form.agreed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSuccess({ ...form, streamKey: currentStream.key });
  };

  const optionLabel =
    currentStream.key === 'vendor' ? 'Exhibition Stand Preference *' :
    currentStream.key === 'volunteer' ? 'Preferred Crew Department *' :
    currentStream.key === 'delegate' ? 'Primary Bilateral Focus *' : 'Festival Session Focus *';

  const summaryRows: [string, string][] = [
    ['Selected Track', currentStream.title],
    ['Full Name', form.fullName],
    ['Email', form.email],
    ['Phone', form.phone],
    ['Country', form.country],
    ['Organization / Brand', `${form.organization} (${form.role})`],
    ['Focus / Preference', form.streamOption],
    ['Notes', form.notes],
  ];

  return (
    <section className="reg-portal-section" id="registration-portal">
      <div className="reg-portal-container">
        <div className="reg-portal-stream-bar">
          <span className="reg-bar-label">Current Pathway:</span>
          <div className="reg-bar-pills">
            {REGISTRATION_STREAMS.map((s) => (
              <button
                key={s.key}
                type="button"
                className={`reg-bar-pill ${currentStream.key === s.key ? 'is-active' : ''}`}
                onClick={() => {
                  onSelectStream(s.key);
                  update('streamKey', s.key);
                  update('streamOption', '');
                  if (step === 3) setStep(2);
                }}
              >
                <span>{s.number}. {s.title.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="reg-portal-card">
          <div className="reg-portal-top">
            <div className="reg-portal-meta">
              <span className="reg-portal-badge">{currentStream.badge}</span>
              <h3 className="reg-portal-title">{currentStream.title} Application</h3>
              <p className="reg-portal-desc">{currentStream.tagline}</p>
            </div>
            <div className="reg-portal-steps">
              <div className={`reg-step-node ${step >= 1 ? 'is-active' : ''}`}><span className="reg-step-num">1</span><span className="reg-step-name">Profile</span></div>
              <div className="reg-step-line" />
              <div className={`reg-step-node ${step >= 2 ? 'is-active' : ''}`}><span className="reg-step-num">2</span><span className="reg-step-name">Track Details</span></div>
              <div className="reg-step-line" />
              <div className={`reg-step-node ${step === 3 ? 'is-active' : ''}`}><span className="reg-step-num">3</span><span className="reg-step-name">Review</span></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="reg-portal-form">
            {step === 1 && (
              <div className="reg-step-content">
                <div className="reg-step-title-wrap">
                  <h4 className="reg-form-heading">Personal & Contact Credentials</h4>
                  <p className="reg-form-caption">Please complete all required fields to continue to Track Details.</p>
                </div>
                <div className="reg-grid-2">
                  <div className="reg-input-group">
                    <label htmlFor="reg-fullname">Full Name (as on Passport / ID) *</label>
                    <input id="reg-fullname" type="text" placeholder="e.g. Alaba Adebayo" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} required />
                  </div>
                  <div className="reg-input-group">
                    <label htmlFor="reg-email">Official / Corporate Email *</label>
                    <input id="reg-email" type="email" placeholder="e.g. a.adebayo@enterprise.africa" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                  </div>
                </div>
                <div className="reg-grid-2">
                  <div className="reg-input-group">
                    <label htmlFor="reg-phone">Phone Number (with Country Code) *</label>
                    <input id="reg-phone" type="tel" placeholder="+220 ... or +234 ..." value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
                  </div>
                  <div className="reg-input-group">
                    <label htmlFor="reg-country">Country of Citizenship / Residence *</label>
                    <input id="reg-country" type="text" placeholder="e.g. Gambia, Nigeria, Ghana, Kenya..." value={form.country} onChange={(e) => update('country', e.target.value)} required />
                  </div>
                </div>
                <div className="reg-step-actions">
                  <div />
                  <button type="button" disabled={!isStep1Valid} onClick={() => { if (isStep1Valid) setStep(2); }} className="reg-btn-primary">
                    <span>Proceed to Track Details</span><ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="reg-step-content">
                <div className="reg-step-title-wrap">
                  <h4 className="reg-form-heading">{currentStream.title} Specifications</h4>
                  <p className="reg-form-caption">All fields below are required before proceeding to review.</p>
                </div>
                <div className="reg-grid-2">
                  <div className="reg-input-group">
                    <label htmlFor="reg-org">Organization / Company / Brand Name *</label>
                    <input id="reg-org" type="text" placeholder="e.g. AfriTech Ventures or Gambian Creative Guild" value={form.organization} onChange={(e) => update('organization', e.target.value)} required />
                  </div>
                  <div className="reg-input-group">
                    <label htmlFor="reg-role">Designation / Role Title *</label>
                    <input id="reg-role" type="text" placeholder="e.g. Managing Partner, Creative Director, Volunteer" value={form.role} onChange={(e) => update('role', e.target.value)} required />
                  </div>
                </div>
                <div className="reg-input-group">
                  <label htmlFor="reg-opt">{optionLabel}</label>
                  <select id="reg-opt" value={form.streamOption} onChange={(e) => update('streamOption', e.target.value)} required>
                    <option value="">-- Select an option --</option>
                    {STREAM_OPTIONS[currentStream.key].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="reg-input-group">
                  <label htmlFor="reg-notes">Special Requirements, Notes, or Portfolio Links *</label>
                  <textarea id="reg-notes" rows={3} placeholder="Briefly state your goals, accessibility needs, or links to your work..." value={form.notes} onChange={(e) => update('notes', e.target.value)} required />
                </div>
                <div className="reg-step-actions">
                  <button type="button" onClick={() => setStep(1)} className="reg-btn-secondary">
                    <ArrowLeft size={15} /><span>Back to Profile</span>
                  </button>
                  <button type="button" disabled={!isStep2Valid} onClick={() => { if (isStep2Valid) setStep(3); }} className="reg-btn-primary">
                    <span>Proceed to Review</span><ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="reg-step-content">
                <div className="reg-step-title-wrap">
                  <h4 className="reg-form-heading">Review & Authorization</h4>
                  <p className="reg-form-caption">Verify your registration credentials prior to submission.</p>
                </div>
                <div className="reg-review-summary">
                  {summaryRows.map(([k, v]) => (
                    <div className="reg-summary-row" key={k}>
                      <span className="reg-summary-k">{k}</span>
                      <strong className="reg-summary-v">{v}</strong>
                    </div>
                  ))}
                </div>
                <div className="reg-consent-box">
                  <label className="reg-consent-label">
                    <input type="checkbox" checked={form.agreed} onChange={(e) => update('agreed', e.target.checked)} required />
                    <span>I declare that the information provided is accurate and agree to adhere to the official ACFTA Fest 2026 Code of Conduct, security guidelines, and terms in Banjul, The Gambia.</span>
                  </label>
                </div>
                <div className="reg-step-actions">
                  <button type="button" onClick={() => setStep(2)} className="reg-btn-secondary">
                    <ArrowLeft size={15} /><span>Back to Track Details</span>
                  </button>
                  <button type="submit" disabled={!canSubmit} className="reg-btn-submit">
                    <span>Submit Official Application</span><Sparkles size={16} />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
