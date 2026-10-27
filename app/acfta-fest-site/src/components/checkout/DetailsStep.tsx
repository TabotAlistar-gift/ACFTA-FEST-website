import { ArrowRight, ChevronDown, Globe, Mail, Minus, Phone, Plus, User } from 'lucide-react';
import { type DetailsForm, NATIONALITIES } from './types';

interface DetailsStepProps {
  form: DetailsForm;
  onChange: (patch: Partial<DetailsForm>) => void;
  onNext: () => void;
}

export function DetailsStep({ form, onChange, onNext }: DetailsStepProps) {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isValid =
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    isValidEmail &&
    form.phone.trim().length > 0 &&
    form.nationality.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="co-step-form">
      <div className="co-step-header">
        <h2 className="co-step-title">Attendee Details</h2>
        <p className="co-step-subtitle">
          Please provide the details for your festival badge registration.
        </p>
      </div>

      <div className="co-form-grid">
        <div className="co-field">
          <label htmlFor="co-first-name" className="co-label">
            First Name <span className="co-req">*</span>
          </label>
          <div className="co-input-wrapper">
            <User size={16} className="co-input-icon" />
            <input
              id="co-first-name"
              type="text"
              required
              placeholder="e.g. Kwame"
              value={form.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              className="co-input"
            />
          </div>
        </div>

        <div className="co-field">
          <label htmlFor="co-last-name" className="co-label">
            Last Name <span className="co-req">*</span>
          </label>
          <div className="co-input-wrapper">
            <User size={16} className="co-input-icon" />
            <input
              id="co-last-name"
              type="text"
              required
              placeholder="e.g. Mensah"
              value={form.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              className="co-input"
            />
          </div>
        </div>

        <div className="co-field co-field-full">
          <label htmlFor="co-email" className="co-label">
            Email Address <span className="co-req">*</span>
          </label>
          <div className="co-input-wrapper">
            <Mail size={16} className="co-input-icon" />
            <input
              id="co-email"
              type="email"
              required
              placeholder="e.g. kwame@example.com"
              value={form.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className="co-input"
            />
          </div>
        </div>

        <div className="co-field">
          <label htmlFor="co-phone" className="co-label">
            Phone Number <span className="co-req">*</span>
          </label>
          <div className="co-input-wrapper">
            <Phone size={16} className="co-input-icon" />
            <input
              id="co-phone"
              type="tel"
              required
              placeholder="+234 801 234 5678"
              value={form.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="co-input"
            />
          </div>
        </div>

        <div className="co-field">
          <label htmlFor="co-nationality" className="co-label">
            Nationality <span className="co-req">*</span>
          </label>
          <div className="co-input-wrapper">
            <Globe size={16} className="co-input-icon" />
            <select
              id="co-nationality"
              required
              value={form.nationality}
              onChange={(e) => onChange({ nationality: e.target.value })}
              className="co-input co-select"
            >
              <option value="">Select nationality</option>
              {NATIONALITIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="co-select-arrow" />
          </div>
        </div>

        <div className="co-field co-field-full">
          <label htmlFor="co-organization" className="co-label">
            Organization / Company <span className="co-optional">(Optional)</span>
          </label>
          <input
            id="co-organization"
            type="text"
            placeholder="e.g. Pan-African Chamber of Commerce"
            value={form.organization}
            onChange={(e) => onChange({ organization: e.target.value })}
            className="co-input pl-4"
          />
        </div>

        <div className="co-field co-field-full">
          <label className="co-label">Pass Quantity</label>
          <div className="co-qty-box">
            <div className="co-qty-controls">
              <button
                type="button"
                className="co-qty-btn"
                onClick={() => onChange({ qty: Math.max(1, form.qty - 1) })}
                aria-label="Decrease quantity"
                disabled={form.qty <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="co-qty-val">{form.qty}</span>
              <button
                type="button"
                className="co-qty-btn"
                onClick={() => onChange({ qty: Math.min(10, form.qty + 1) })}
                aria-label="Increase quantity"
                disabled={form.qty >= 10}
              >
                <Plus size={14} />
              </button>
            </div>
            <span className="co-qty-hint">Maximum 10 passes per registration</span>
          </div>
        </div>
      </div>

      <div className="co-step-actions">
        <button type="submit" disabled={!isValid} className="co-btn co-btn-primary">
          <span>Continue to Payment</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
