import { ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { type CheckoutTicket, type DetailsForm, formatPrice } from './types';

interface ConfirmStepProps {
  form: DetailsForm;
  ticket: CheckoutTicket;
  method: string;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export function ConfirmStep({
  form,
  ticket,
  method,
  isSubmitting,
  onBack,
  onSubmit,
}: ConfirmStepProps) {
  const subtotal = ticket.priceRaw * form.qty;
  const fee = Math.round(subtotal * 0.015);
  const total = subtotal + fee;

  const methodNames: Record<string, string> = {
    card: 'Credit / Debit Card',
    flutterwave: 'Flutterwave',
    paystack: 'Paystack',
    transfer: 'Direct Bank Wire',
  };

  return (
    <div className="co-step-form">
      <div className="co-step-header">
        <h2 className="co-step-title">Review & Confirm</h2>
        <p className="co-step-subtitle">Please verify your pass details before final payment.</p>
      </div>

      <div className="co-review-card">
        <div className="co-review-section">
          <span className="co-review-section-title">Attendee Information</span>
          <div className="co-review-grid">
            <div>
              <span className="co-review-label">Full Name</span>
              <p className="co-review-val">{form.firstName} {form.lastName}</p>
            </div>
            <div>
              <span className="co-review-label">Email Address</span>
              <p className="co-review-val">{form.email}</p>
            </div>
            <div>
              <span className="co-review-label">Phone</span>
              <p className="co-review-val">{form.phone}</p>
            </div>
            <div>
              <span className="co-review-label">Nationality</span>
              <p className="co-review-val">{form.nationality}</p>
            </div>
            {form.organization && (
              <div className="col-span-2">
                <span className="co-review-label">Organization</span>
                <p className="co-review-val">{form.organization}</p>
              </div>
            )}
          </div>
        </div>

        <div className="co-review-section border-t border-[#123d2d]/15">
          <span className="co-review-section-title">Ticket & Payment</span>
          <div className="co-review-grid">
            <div>
              <span className="co-review-label">Selected Tier</span>
              <p className="co-review-val">{ticket.title}</p>
            </div>
            <div>
              <span className="co-review-label">Quantity</span>
              <p className="co-review-val">{form.qty} {form.qty === 1 ? 'Pass' : 'Passes'}</p>
            </div>
            <div>
              <span className="co-review-label">Payment Gateway</span>
              <p className="co-review-val">{methodNames[method] || method}</p>
            </div>
            <div>
              <span className="co-review-label">Final Amount</span>
              <p className="co-review-val font-bold text-[#123d2d]">{formatPrice(total, ticket.currency)}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="co-legal-text">
        By clicking "Authorize & Pay", you agree to the ACFTA Fest 2027 Terms of Admission and Delegate Guidelines.
      </p>

      <div className="co-step-actions-split">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="co-btn co-btn-ghost"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="co-btn co-btn-pay"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="co-spinner" />
              <span>Processing...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Lock size={15} />
              <span>Authorize & Pay {formatPrice(total, ticket.currency)}</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
