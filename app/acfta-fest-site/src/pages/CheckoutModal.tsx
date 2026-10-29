import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ConfirmStep } from '@/components/checkout/ConfirmStep';
import { DetailsStep } from '@/components/checkout/DetailsStep';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { PaymentStep } from '@/components/checkout/PaymentStep';
import { StepIndicator } from '@/components/checkout/StepIndicator';
import { SuccessScreen } from '@/components/checkout/SuccessScreen';
import {
  type CheckoutStep,
  type CheckoutTicket,
  type DetailsForm,
  formatPrice,
} from '@/components/checkout/types';
import { sendFestivalEmail } from '@/lib/emailDispatch';
import './checkout.css';

export type { CheckoutTicket };

interface CheckoutModalProps {
  ticket: CheckoutTicket | null;
  onClose: () => void;
}

const INITIAL_FORM: DetailsForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',
  organization: '',
  qty: 1,
};

export default function CheckoutModal({ ticket, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('details');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState<DetailsForm>(INITIAL_FORM);

  useEffect(() => {
    if (ticket) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [ticket]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (ticket) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ticket]);

  const handleClose = () => {
    setStep('details');
    setIsSuccess(false);
    setIsSubmitting(false);
    setForm(INITIAL_FORM);
    onClose();
  };

  const updateForm = (patch: Partial<DetailsForm>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const handleAuthorize = () => {
    if (!ticket) return;
    setIsSubmitting(true);

    const subtotal = ticket.priceRaw * form.qty;
    const total = subtotal + Math.round(subtotal * 0.015);
    const formattedTotal = formatPrice(total, ticket.currency);

    // Silently dispatch confirmation email via ACFTA Fest proxy (never exposing localhost)
    void sendFestivalEmail(form.email, {
      _subject: `ACFTA Fest — Booking Confirmed: ${ticket.title}`,
      Festival: 'ACFTA Fest — Banjul, The Gambia',
      Attendee: `${form.firstName} ${form.lastName}`.trim(),
      Pass_or_Package: ticket.title,
      Quantity: String(form.qty),
      Amount_Paid: formattedTotal,
      Event_Date: ticket.date,
      Venue: ticket.location,
      Status: 'Confirmed',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (!ticket) return null;

  return (
    <AnimatePresence>
      <div className="co-viewport" role="dialog" aria-modal="true" aria-label="Pass Checkout">
        <motion.div
          className="co-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          aria-hidden="true"
        />

        <div className="co-scroll-wrapper" onClick={(e) => e.target === e.currentTarget && handleClose()}>
          <motion.div
            className="co-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              className="co-close-btn"
              onClick={handleClose}
              aria-label="Close checkout"
            >
              <X size={18} />
            </button>

            {isSuccess ? (
              <SuccessScreen ticket={ticket} form={form} onClose={handleClose} />
            ) : (
              <div className="co-layout">
                <div className="co-flow-col">
                  <div className="co-flow-header">
                    <div className="co-logo-badge">
                      <img
                        src="/images/acfta-fest-logo.png"
                        alt="ACFTA Fest"
                        className="co-flow-logo"
                      />
                    </div>
                    <StepIndicator current={step} />
                  </div>

                  <div className="co-flow-body">
                    {step === 'details' && (
                      <DetailsStep
                        form={form}
                        onChange={updateForm}
                        onNext={() => setStep('payment')}
                      />
                    )}
                    {step === 'payment' && (
                      <PaymentStep
                        method={paymentMethod}
                        onMethodChange={setPaymentMethod}
                        onBack={() => setStep('details')}
                        onNext={() => setStep('confirm')}
                      />
                    )}
                    {step === 'confirm' && (
                      <ConfirmStep
                        form={form}
                        ticket={ticket}
                        method={paymentMethod}
                        isSubmitting={isSubmitting}
                        onBack={() => setStep('payment')}
                        onSubmit={handleAuthorize}
                      />
                    )}
                  </div>
                </div>

                <div className="co-summary-col">
                  <OrderSummary ticket={ticket} qty={form.qty} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
