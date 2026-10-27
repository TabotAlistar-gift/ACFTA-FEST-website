import { useMemo } from 'react';
import { CalendarDays, Check, MapPin, ShieldCheck } from 'lucide-react';
import { type CheckoutTicket, type DetailsForm, formatPrice } from './types';

interface SuccessScreenProps {
  ticket: CheckoutTicket;
  form: DetailsForm;
  onClose: () => void;
}

export function SuccessScreen({ ticket, form, onClose }: SuccessScreenProps) {
  const bookingId = useMemo(() => {
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `ACFTA-${ticket.number || '27'}-${rand}`;
  }, [ticket.number]);

  const subtotal = ticket.priceRaw * form.qty;
  const total = subtotal + Math.round(subtotal * 0.015);

  return (
    <div className="co-success-container">
      <div className="co-success-badge">
        <Check size={36} strokeWidth={2.5} />
      </div>

      <h2 className="co-success-heading">Payment Confirmed!</h2>
      <p className="co-success-subheading">
        Welcome to ACFTA Fest, <strong>{form.firstName} {form.lastName}</strong>. Your booking for{' '}
        <strong>{ticket.title}</strong> (×{form.qty}) is officially confirmed.
      </p>

      <div className="co-success-card">
        <div className="flex items-center justify-between border-b border-[#123d2d]/10 pb-2 text-xs">
          <span className="text-[#657065] uppercase tracking-wider font-semibold">Reference ID</span>
          <strong className="font-mono text-[#123d2d] text-sm">{bookingId}</strong>
        </div>
        <div className="flex items-center justify-between border-b border-[#123d2d]/10 pb-2 text-xs">
          <span className="text-[#657065] uppercase tracking-wider font-semibold">Amount Paid</span>
          <strong className="text-[#123d2d]">{formatPrice(total, ticket.currency)}</strong>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#123d2d] uppercase tracking-wider pt-1">
          <CalendarDays size={14} className="text-[#a68e4d]" />
          <span>{ticket.date}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#657065]">
          <MapPin size={14} className="text-[#a68e4d]" />
          <span>Banjul, The Gambia · National Stadium &amp; Grounds</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#123d2d] font-medium pt-1">
          <ShieldCheck size={14} className="text-[#123d2d]" />
          <span>Verified Official ACFTA Fest Accreditation</span>
        </div>
      </div>

      <button type="button" onClick={onClose} className="co-btn co-btn-primary w-full max-w-xs">
        Return to Festival Site
      </button>

      <p className="text-[11px] text-[#657065] mt-4">
        Need assistance with your booking? Contact{' '}
        <a href="mailto:registration@acftafest.com" className="font-semibold text-[#123d2d] underline">
          registration@acftafest.com
        </a>
      </p>
    </div>
  );
}
