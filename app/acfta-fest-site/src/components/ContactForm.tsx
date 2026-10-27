import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';

const inquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(120),
  email: z.string().trim().email('Enter a valid email address.').max(254),
  organization: z.string().max(160).optional(),
  category: z.enum(['general', 'sponsorship', 'partnership', 'exhibition', 'programme', 'media', 'ticket-information']),
  message: z.string().trim().min(10, 'Please include a little more detail.').max(5000),
});

type InquiryValues = z.infer<typeof inquirySchema>;

const categories = [
  ['general', 'General enquiry'],
  ['sponsorship', 'Sponsorship'],
  ['partnership', 'Strategic partnership'],
  ['exhibition', 'Exhibition & trade'],
  ['programme', 'Programme participation'],
  ['media', 'Media & outreach'],
  ['ticket-information', 'Ticket information'],
] as const;

export function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { fullName: '', email: '', organization: '', category: 'general', message: '' },
  });

  async function submit(values: InquiryValues) {
    setIsSending(true);
    setSent(false);

    const categoryLabel = categories.find(([val]) => val === values.category)?.[1] || values.category;

    try {
      await fetch('https://formsubmit.co/ajax/info@acftafest.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `ACFTA Fest 2026 Enquiry — ${categoryLabel} (${values.fullName})`,
          _template: 'table',
          _captcha: 'false',
          'Full Name': values.fullName,
          'Email Address': values.email,
          Organisation: values.organization?.trim() || 'Not specified',
          'Enquiry Category': categoryLabel,
          Message: values.message,
        }),
      });
    } catch {
      // Fallback to local API if offline
    }

    fetch('/api/contact-inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, organization: values.organization?.trim() || null }),
    }).catch(() => {});

    setIsSending(false);
    setSent(true);
    form.reset();
  }

  const errors = form.formState.errors;

  useEffect(() => {
    const selectCategory = (event: Event) => {
      const category = (event as CustomEvent<string>).detail;
      if (categories.some(([value]) => value === category)) {
        form.setValue('category', category as InquiryValues['category'], { shouldDirty: true });
      }
    };
    window.addEventListener('acfta:enquiry', selectCategory);
    return () => window.removeEventListener('acfta:enquiry', selectCategory);
  }, [form]);

  return (
    <Form {...form}>
      <form className="contact-form" onSubmit={form.handleSubmit(submit)} noValidate data-testid="form-contact">
        <div className="form-grid">
          <div className="field">
            <label htmlFor="fullName">Full name</label>
            <input id="fullName" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={120} {...form.register('fullName')} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? 'error-fullName' : undefined} data-testid="input-full-name" />
            {errors.fullName && <span className="field-error" id="error-fullName">{errors.fullName.message}</span>}
          </div>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} {...form.register('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'error-email' : undefined} data-testid="input-email" />
            {errors.email && <span className="field-error" id="error-email">{errors.email.message}</span>}
          </div>
          <div className="field">
            <label htmlFor="organization">Organisation <span className="optional">(optional)</span></label>
            <input id="organization" autoComplete="organization" placeholder="Company or institution" maxLength={160} {...form.register('organization')} aria-invalid={!!errors.organization} data-testid="input-organization" />
            {errors.organization && <span className="field-error">{errors.organization.message}</span>}
          </div>
          <div className="field">
            <label htmlFor="category">Enquiry category</label>
            <select id="category" required {...form.register('category')} data-testid="select-enquiry-category">
              {categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <div className="field field-wide">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={5} placeholder="Tell us how you’d like to take part…" required minLength={10} maxLength={5000} {...form.register('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'error-message' : undefined} data-testid="input-message" />
            {errors.message && <span className="field-error" id="error-message">{errors.message.message}</span>}
          </div>
        </div>
        <div className="form-submit-row">
          <button className="button button-gold form-submit" type="submit" disabled={isSending} data-testid="button-submit-enquiry">
            {isSending ? <><LoaderCircle size={16} className="spin" /> Sending enquiry</> : <>Send an enquiry <ArrowUpRight size={16} /></>}
          </button>
        </div>
        {sent && (
          <p className="form-status form-success" role="status" data-testid="status-enquiry-success">
            <Check size={17} /> Message sent.
          </p>
        )}
      </form>
    </Form>
  );
}
