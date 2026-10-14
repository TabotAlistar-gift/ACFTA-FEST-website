import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateContactInquiry } from '@workspace/api-client-react';
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
  const [receipt, setReceipt] = useState('');
  const inquiry = useCreateContactInquiry();
  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { fullName: '', email: '', organization: '', category: 'general', message: '' },
  });

  function submit(values: InquiryValues) {
    setReceipt('');
    inquiry.mutate(
      { data: { ...values, organization: values.organization?.trim() || null } },
      {
        onSuccess: (result) => {
          setReceipt(result.message || 'Your enquiry has been received.');
          form.reset();
        },
        onError: () => setReceipt(''),
      },
    );
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
          <button className="button button-gold form-submit" type="submit" disabled={inquiry.isPending} data-testid="button-submit-enquiry">
            {inquiry.isPending ? <><LoaderCircle size={16} className="spin" /> Sending enquiry</> : <>Send an enquiry <ArrowUpRight size={16} /></>}
          </button>
          <p className="form-privacy">Your message is saved for the ACFTA Fest team to review. For a direct reply, email <a href="mailto:info@acftafest.com">info@acftafest.com</a>.</p>
        </div>
        {inquiry.isPending && <p className="form-status" role="status" data-testid="status-enquiry-pending">Sending your message…</p>}
        {inquiry.isError && <p className="form-status form-error" role="alert" data-testid="status-enquiry-error">We couldn’t send your enquiry just now. Please try again, or email <a href="mailto:info@acftafest.com" data-testid="link-error-email">info@acftafest.com</a>.</p>}
        {receipt && <p className="form-status form-success" role="status" data-testid="status-enquiry-success"><Check size={17} /> {receipt}</p>}
      </form>
    </Form>
  );
}
