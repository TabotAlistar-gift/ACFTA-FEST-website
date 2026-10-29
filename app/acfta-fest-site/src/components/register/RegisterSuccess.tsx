import { useMemo } from 'react';
import { ArrowRight, Check, Home } from 'lucide-react';
import { Link } from 'wouter';
import { type RegisterFormData } from './RegisterPortal';
import { REGISTRATION_STREAMS } from '@/data/registerData';

interface SuccessProps {
  data: RegisterFormData;
  onReset: () => void;
}

export function RegisterSuccess({ data, onReset }: SuccessProps) {
  const stream =
    REGISTRATION_STREAMS.find((s) => s.key === data.streamKey) || REGISTRATION_STREAMS[0];

  const refCode = useMemo(() => {
    if (data.registrationId) return data.registrationId;
    const codePrefix =
      (data.country || 'AFR')
        .replace(/[^a-zA-Z]/g, '')
        .slice(0, 3)
        .toUpperCase() || 'AFR';
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `ACFTA-2026-${codePrefix}-${rand}`;
  }, [data.country, data.registrationId]);

  return (
    <div className="reg-success-wrapper">
      <div className="reg-success-card">
        <div className="reg-success-icon-badge">
          <Check size={30} strokeWidth={3} className="text-[#062319]" />
        </div>

        <span className="reg-success-eyebrow">Application Received</span>
        <h2 className="reg-success-title">Your Registration Dossier Has Been Registered</h2>
        <p className="reg-success-desc">
          Thank you, <strong>{data.fullName}</strong>. Your credential application for the{' '}
          <strong>{stream.title}</strong> stream has been logged in the ACFTA Fest central
          secretariat database.
        </p>

        <div className="reg-success-ref-box">
          <span className="reg-ref-label">Official Reference Dossier ID</span>
          <code className="reg-ref-code">{refCode}</code>
          <span className="reg-ref-sub">
            Keep this ID handy for credential issuance upon arrival in Banjul.
          </span>
        </div>

        <div className="reg-success-actions">
          <Link href="/tickets" className="reg-btn-primary">
            <span>Proceed to Festival Tickets</span>
            <ArrowRight size={15} />
          </Link>
          <button type="button" onClick={onReset} className="reg-btn-secondary">
            <span>Register Another Attendee</span>
          </button>
          <Link href="/" className="reg-btn-tertiary">
            <Home size={15} />
            <span>Return to Festival Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
