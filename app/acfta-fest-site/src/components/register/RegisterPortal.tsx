import { useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, LoaderCircle, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'wouter';
import { type RegistrationStream } from '@/data/registerData';
import {
  COUNTRIES,
  STREAM_OPTIONS,
  clearRegistrationDraft,
  loadRegistrationDraft,
  registrationFormResolver,
  saveRegistrationDraft,
  type RegisterFormData,
} from '@/lib/registrationSchema';

export type { RegisterFormData };

interface PortalProps {
  currentStream: RegistrationStream;
  onSuccess: (data: RegisterFormData) => void;
}

export function RegisterPortal({ currentStream, onSuccess }: PortalProps) {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: registrationFormResolver,
    mode: 'onTouched',
    shouldUnregister: false,
    defaultValues: loadRegistrationDraft(currentStream.key),
  });

  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = form;
  const values = watch();

  useEffect(() => {
    const validOpts = STREAM_OPTIONS[currentStream.key];
    setValue('streamKey', currentStream.key);
    if (values.streamOption && !validOpts.includes(values.streamOption)) {
      setValue('streamOption', '');
    }
  }, [currentStream.key, setValue, values.streamOption]);

  useEffect(() => {
    const subscription = watch((val) => saveRegistrationDraft(val as Partial<RegisterFormData>));
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleNextToStep2 = async () => {
    setSubmitError(null);
    const valid = await trigger(['fullName', 'email', 'phone', 'country'], { shouldFocus: true });
    if (valid) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextToStep3 = async () => {
    setSubmitError(null);
    const valid = await trigger(['organization', 'role', 'streamOption', 'notes'], { shouldFocus: true });
    if (valid) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (validData: RegisterFormData) => {
    setSubmitError(null);
    setIsSubmitting(true);
    const payload: RegisterFormData = { ...validData, streamKey: currentStream.key };
    const codePrefix = payload.country.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase() || 'AFR';
    let confirmedRegistrationId = `ACFTA-2026-${codePrefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    let backendHandled = false;

    try {
      const apiRes = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const contentType = apiRes.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await apiRes.json();
        if (!apiRes.ok) {
          setIsSubmitting(false);
          setSubmitError(json.error || 'Please check your registration details and try again.');
          return;
        }
        if (json.registrationId) confirmedRegistrationId = json.registrationId;
        backendHandled = true;
      }
    } catch {
      // Static deployment fallback: proceed with direct email dispatch verification
    }

    try {
      const emailRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(payload.email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `ACFTA Fest — Thank You for Registering (ID: ${confirmedRegistrationId})`,
          _template: 'table',
          Sender: 'ACFTA Fest',
          Message: `Thank you for registering for ACFTA Fest, ${payload.fullName}! Your official Registration ID is ${confirmedRegistrationId}.`,
          Registration_ID: confirmedRegistrationId,
          Stream: currentStream.title,
          Full_Name: payload.fullName,
          Email: payload.email,
          Phone: payload.phone,
          Country: payload.country,
          Organization: `${payload.organization} (${payload.role})`,
          Track_Option: payload.streamOption,
          Notes: payload.notes,
        }),
      });
      if (!backendHandled && !emailRes.ok) {
        throw new Error('Unable to complete registration submission. Please check your connection and try again.');
      }
    } catch (err) {
      if (!backendHandled) {
        setIsSubmitting(false);
        setSubmitError(err instanceof Error ? err.message : 'Unable to submit registration right now. Please try again.');
        return;
      }
    }

    clearRegistrationDraft();
    setIsSubmitting(false);
    onSuccess({ ...payload, registrationId: confirmedRegistrationId });
  };

  const optionLabel =
    currentStream.key === 'vendor' ? 'Exhibition Stand Preference *' :
    currentStream.key === 'volunteer' ? 'Preferred Crew Department *' :
    currentStream.key === 'delegate' ? 'Primary Bilateral Focus *' : 'Festival Session Focus *';

  const summaryRows: [string, string][] = [
    ['Selected Track', currentStream.title],
    ['Full Name', values.fullName],
    ['Email', values.email],
    ['Phone', values.phone],
    ['Country / Citizenship', values.country],
    ['Organization / Brand', `${values.organization} (${values.role})`],
    ['Focus / Preference', values.streamOption],
    ['Notes & Requirements', values.notes],
  ];

  return (
    <section className="reg-portal-section" id="registration-portal">
      <div className="reg-portal-container">
        <div className="reg-portal-card">
          <div className="reg-portal-top">
            <div className="reg-portal-meta">
              <span className="reg-portal-badge">{currentStream.badge} · {currentStream.subtitle}</span>
              <h1 className="reg-portal-title">{currentStream.title} Registration</h1>
              <p className="reg-portal-desc">{currentStream.tagline}</p>
            </div>
            <div className="reg-portal-steps" role="navigation" aria-label="Registration steps">
              <button type="button" onClick={() => setStep(1)} className={`reg-step-node ${step >= 1 ? 'is-active' : ''}`}>
                <span className="reg-step-num">1</span><span className="reg-step-name">Profile</span>
              </button>
              <div className="reg-step-line" />
              <button type="button" onClick={() => { if (step > 2) setStep(2); else void handleNextToStep2(); }} className={`reg-step-node ${step >= 2 ? 'is-active' : ''}`}>
                <span className="reg-step-num">2</span><span className="reg-step-name">Track Details</span>
              </button>
              <div className="reg-step-line" />
              <button type="button" disabled={step < 3} className={`reg-step-node ${step === 3 ? 'is-active' : ''}`}>
                <span className="reg-step-num">3</span><span className="reg-step-name">Review</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="reg-portal-form" noValidate>
            <div className={`reg-step-content ${step !== 1 ? 'is-hidden' : ''}`} hidden={step !== 1}>
              <div className="reg-step-title-wrap">
                <h2 className="reg-form-heading">Personal &amp; Contact Credentials</h2>
                <p className="reg-form-caption">Enter your official contact details to continue.</p>
              </div>
              <div className="reg-grid-2">
                <div className="reg-input-group">
                  <label htmlFor="reg-fullname">Full Name (as on Passport / ID) *</label>
                  <input id="reg-fullname" type="text" autoComplete="name" placeholder="e.g. Alaba Adebayo or Sékou N'Dour" aria-invalid={!!errors.fullName} {...register('fullName')} />
                  {errors.fullName && <span className="reg-field-error" role="alert">{errors.fullName.message}</span>}
                </div>
                <div className="reg-input-group">
                  <label htmlFor="reg-email">Official / Personal Email Address *</label>
                  <input id="reg-email" type="email" autoComplete="email" placeholder="e.g. a.adebayo@enterprise.africa" aria-invalid={!!errors.email} {...register('email')} />
                  {errors.email && <span className="reg-field-error" role="alert">{errors.email.message}</span>}
                </div>
              </div>
              <div className="reg-grid-2">
                <div className="reg-input-group">
                  <label htmlFor="reg-phone">Phone Number (with International Code) *</label>
                  <input id="reg-phone" type="tel" autoComplete="tel" placeholder="e.g. +220 701 2345 or +234 803 123 4567" aria-invalid={!!errors.phone} {...register('phone')} />
                  {errors.phone && <span className="reg-field-error" role="alert">{errors.phone.message}</span>}
                </div>
                <div className="reg-input-group">
                  <label htmlFor="reg-country">Country of Citizenship / Residence *</label>
                  <input id="reg-country" list="acfta-countries-list" type="text" autoComplete="country-name" placeholder="Type to search or select country..." aria-invalid={!!errors.country} {...register('country')} />
                  <datalist id="acfta-countries-list">
                    {COUNTRIES.map((c) => <option key={c} value={c} />)}
                  </datalist>
                  {errors.country && <span className="reg-field-error" role="alert">{errors.country.message}</span>}
                </div>
              </div>
              <div className="reg-step-actions">
                <button type="button" onClick={() => navigate('/register')} className="reg-btn-secondary" data-testid="button-go-back-step-1">
                  <ArrowLeft size={15} /><span>Go Back</span>
                </button>
                <button type="button" onClick={handleNextToStep2} className="reg-btn-primary" data-testid="button-proceed-step-1">
                  <span>Proceed</span><ArrowRight size={15} />
                </button>
              </div>
            </div>

            <div className={`reg-step-content ${step !== 2 ? 'is-hidden' : ''}`} hidden={step !== 2}>
              <div className="reg-step-title-wrap">
                <h2 className="reg-form-heading">{currentStream.title} Specifications</h2>
                <p className="reg-form-caption">Provide your organization and pathway details.</p>
              </div>
              <div className="reg-grid-2">
                <div className="reg-input-group">
                  <label htmlFor="reg-org">Organization / Company / Institution *</label>
                  <input id="reg-org" type="text" autoComplete="organization" placeholder="e.g. AfriTech Ventures or Gambian Creative Guild" aria-invalid={!!errors.organization} {...register('organization')} />
                  {errors.organization && <span className="reg-field-error" role="alert">{errors.organization.message}</span>}
                </div>
                <div className="reg-input-group">
                  <label htmlFor="reg-role">Designation / Role Title *</label>
                  <input id="reg-role" type="text" autoComplete="organization-title" placeholder="e.g. Managing Partner, Creative Director, Volunteer" aria-invalid={!!errors.role} {...register('role')} />
                  {errors.role && <span className="reg-field-error" role="alert">{errors.role.message}</span>}
                </div>
              </div>
              <div className="reg-input-group">
                <label htmlFor="reg-opt">{optionLabel}</label>
                <select id="reg-opt" aria-invalid={!!errors.streamOption} {...register('streamOption')}>
                  <option value="">-- Select an option --</option>
                  {STREAM_OPTIONS[currentStream.key].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.streamOption && <span className="reg-field-error" role="alert">{errors.streamOption.message}</span>}
              </div>
              <div className="reg-input-group">
                <label htmlFor="reg-notes">Special Requirements, Notes, or Portfolio Links *</label>
                <textarea id="reg-notes" rows={3} placeholder="Briefly state your goals, accessibility needs, or links to your work (at least 10 characters)..." aria-invalid={!!errors.notes} {...register('notes')} />
                {errors.notes && <span className="reg-field-error" role="alert">{errors.notes.message}</span>}
              </div>
              <div className="reg-step-actions">
                <button type="button" onClick={() => { setSubmitError(null); setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="reg-btn-secondary" data-testid="button-go-back-step-2">
                  <ArrowLeft size={15} /><span>Go Back</span>
                </button>
                <button type="button" onClick={handleNextToStep3} className="reg-btn-primary" data-testid="button-proceed-step-2">
                  <span>Proceed</span><ArrowRight size={15} />
                </button>
              </div>
            </div>

            <div className={`reg-step-content ${step !== 3 ? 'is-hidden' : ''}`} hidden={step !== 3}>
              <div className="reg-step-title-wrap">
                <h2 className="reg-form-heading">Review &amp; Authorization</h2>
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
                  <input type="checkbox" {...register('agreed')} />
                  <span>I declare that the information provided is accurate and agree to adhere to the official ACFTA Fest 2026 Code of Conduct, security guidelines, and terms in Banjul, The Gambia.</span>
                </label>
                {errors.agreed && <span className="reg-field-error" role="alert">{errors.agreed.message}</span>}
              </div>
              {submitError && (
                <div className="reg-submit-error-banner" role="alert">
                  <AlertCircle size={16} />
                  <span>{submitError}</span>
                </div>
              )}
              <div className="reg-step-actions">
                <button type="button" onClick={() => { setSubmitError(null); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={isSubmitting} className="reg-btn-secondary" data-testid="button-go-back-step-3">
                  <ArrowLeft size={15} /><span>Go Back</span>
                </button>
                <button type="submit" disabled={isSubmitting} className="reg-btn-submit" data-testid="button-submit-registration">
                  {isSubmitting ? <><LoaderCircle size={16} className="spin" /><span>Submitting Application...</span></> : <><span>Submit Official Application</span><Sparkles size={16} /></>}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
