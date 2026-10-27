import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CreditCard, Globe, Lock, ShieldCheck, Zap } from 'lucide-react';

interface PaymentStepProps {
  method: string;
  onMethodChange: (m: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const METHODS = [
  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, subtitle: 'Visa, Mastercard, Verve' },
  { id: 'flutterwave', name: 'Flutterwave', icon: Zap, subtitle: 'Mobile Money, USSD, Barter' },
  { id: 'paystack', name: 'Paystack', icon: Globe, subtitle: 'Bank, Card, Apple Pay' },
  { id: 'transfer', name: 'Direct Bank Wire', icon: ShieldCheck, subtitle: 'Official ACFTA Fest Escrow' },
];

export function PaymentStep({ method, onMethodChange, onBack, onNext }: PaymentStepProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExp = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    return raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw;
  };

  const isCardValid =
    method !== 'card' ||
    (cardNumber.replace(/\s/g, '').length === 16 &&
      cardHolder.trim().length > 2 &&
      expiry.length === 5 &&
      cvv.length >= 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCardValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="co-step-form">
      <div className="co-step-header">
        <h2 className="co-step-title">Payment Method</h2>
        <p className="co-step-subtitle">Select how you would like to complete your pass purchase.</p>
      </div>

      <div className="co-payment-methods">
        {METHODS.map((m) => {
          const Icon = m.icon;
          const isSelected = method === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onMethodChange(m.id)}
              className={`co-method-card ${isSelected ? 'is-selected' : ''}`}
            >
              <div className="co-method-top">
                <div className="co-method-icon-box">
                  <Icon size={18} />
                </div>
                {isSelected && (
                  <span className="co-method-check">
                    <Check size={14} />
                  </span>
                )}
              </div>
              <div className="co-method-text">
                <span className="co-method-name">{m.name}</span>
                <span className="co-method-sub">{m.subtitle}</span>
              </div>
            </button>
          );
        })}
      </div>

      {method === 'card' && (
        <div className="co-card-fields">
          <div className="co-field">
            <label htmlFor="co-card-name" className="co-label">
              Cardholder Name
            </label>
            <input
              id="co-card-name"
              type="text"
              required
              placeholder="NAME AS PRINTED ON CARD"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
              className="co-input pl-4 uppercase"
            />
          </div>

          <div className="co-field">
            <label htmlFor="co-card-number" className="co-label">
              Card Number
            </label>
            <div className="co-input-wrapper">
              <CreditCard size={16} className="co-input-icon" />
              <input
                id="co-card-number"
                type="text"
                inputMode="numeric"
                required
                placeholder="4000 1234 5678 9010"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCard(e.target.value))}
                className="co-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="co-field">
              <label htmlFor="co-exp" className="co-label">
                Expiry (MM/YY)
              </label>
              <input
                id="co-exp"
                type="text"
                inputMode="numeric"
                required
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExp(e.target.value))}
                className="co-input pl-4"
              />
            </div>
            <div className="co-field">
              <label htmlFor="co-cvv" className="co-label">
                Security Code (CVV)
              </label>
              <div className="co-input-wrapper">
                <Lock size={15} className="co-input-icon" />
                <input
                  id="co-cvv"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  required
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="co-input"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {method !== 'card' && (
        <div className="co-notice-box">
          <div className="co-notice-icon">
            <Lock size={18} />
          </div>
          <p className="co-notice-text">
            {method === 'flutterwave' &&
              'You will be securely routed through Flutterwave Gateway to complete your local payment.'}
            {method === 'paystack' &&
              'You will be securely connected with Paystack to authorize your payment.'}
            {method === 'transfer' &&
              'Official ACFTA Fest designated bank accounts will be provided for official electronic transfer.'}
          </p>
        </div>
      )}

      <div className="co-step-actions-split">
        <button type="button" onClick={onBack} className="co-btn co-btn-ghost">
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <button type="submit" disabled={!isCardValid} className="co-btn co-btn-primary">
          <span>Review Order</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
