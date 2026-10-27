import { useState } from 'react';
import { CalendarDays, Check, ChevronDown, ChevronUp, Lock, MapPin, Shield, Ticket } from 'lucide-react';
import { type CheckoutTicket, formatPrice } from './types';

interface OrderSummaryProps {
  ticket: CheckoutTicket;
  qty: number;
}

export function OrderSummary({ ticket, qty }: OrderSummaryProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const subtotal = ticket.priceRaw * qty;
  const fee = Math.round(subtotal * 0.015);
  const total = subtotal + fee;

  return (
    <aside className="co-summary" aria-label="Order Summary">
      {/* Mobile Accordion Toggle */}
      <button
        type="button"
        className="co-summary-mobile-toggle md:hidden"
        onClick={() => setMobileExpanded((prev) => !prev)}
        aria-expanded={mobileExpanded}
      >
        <span className="flex items-center gap-2 font-semibold">
          <Ticket size={16} />
          {mobileExpanded ? 'Hide order summary' : 'Show order summary'}
          {mobileExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
        <span className="font-bold text-amber-300">{formatPrice(total, ticket.currency)}</span>
      </button>

      {/* Summary Content (Always visible on desktop, toggled on mobile) */}
      <div className={`co-summary-inner ${mobileExpanded ? 'block' : 'hidden md:flex'}`}>
        <div className="co-summary-image-container">
          <img src={ticket.image} alt={ticket.title} className="co-summary-image" loading="lazy" />
          <div className="co-summary-image-gradient" />
          {ticket.featured && <span className="co-summary-badge">VIP EXPERIENCE</span>}
        </div>

        <div className="co-summary-content">
          <div className="co-summary-tag">
            <Ticket size={12} />
            <span>{ticket.currency === 'USD' ? `Package ${ticket.number}` : 'Official Festival Ticket'}</span>
          </div>

          <h3 className="co-summary-title">{ticket.title}</h3>

          <p className="co-summary-date">
            <CalendarDays size={13} />
            <span>{ticket.date}</span>
          </p>

          <p className="co-summary-desc">{ticket.description}</p>

          <div className="co-summary-location">
            <MapPin size={12} />
            <span>Banjul, The Gambia · 2027</span>
          </div>

          <div className="co-summary-benefits-wrapper">
            <p className="co-summary-benefits-title">Included Benefits</p>
            <ul className="co-summary-benefits">
              {ticket.benefits.map((benefit) => (
                <li key={benefit}>
                  <Check size={13} className="shrink-0 text-amber-300" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="co-pricing-table">
            <div className="co-pricing-row">
              <span>{ticket.title} × {qty}</span>
              <span>{formatPrice(subtotal, ticket.currency)}</span>
            </div>
            <div className="co-pricing-row">
              <span>Processing Fee (1.5%)</span>
              <span>{formatPrice(fee, ticket.currency)}</span>
            </div>
            <div className="co-pricing-divider" />
            <div className="co-pricing-row is-total">
              <span>Total Due</span>
              <strong>{formatPrice(total, ticket.currency)}</strong>
            </div>
          </div>

          <div className="co-trust-badges">
            <div className="co-trust-item">
              <Lock size={12} />
              <span>256-Bit SSL Secured</span>
            </div>
            <div className="co-trust-item">
              <Shield size={12} />
              <span>Official ACFTA Pass</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
