import { ArrowRight, Check, Crown, Sparkles, Star } from 'lucide-react';
import { type FestivalPass } from '@/data/ticketData';

interface TicketCardProps {
  pass: FestivalPass;
  onSelect: (pass: FestivalPass) => void;
}

export function TicketCard({ pass, onSelect }: TicketCardProps) {
  const isVip = !!pass.featured;

  return (
    <div className={`tk-pass-card ${isVip ? 'is-vip' : ''}`}>
      {/* VIP Badge Header */}
      {isVip && (
        <div className="tk-pass-vip-ribbon">
          <Crown size={13} className="text-[#092b20]" />
          <span>OFFICIAL ALL-ACCESS VIP PATRON</span>
        </div>
      )}

      {/* Pass Header */}
      <div className="tk-pass-header">
        <div className="tk-pass-meta">
          <span className="tk-pass-num">PASS #{pass.number}</span>
          <span className="tk-pass-badge">{pass.badgeType}</span>
        </div>

        <h3 className="tk-pass-title">{pass.title}</h3>
        <p className="tk-pass-date">{pass.date}</p>
        <p className="tk-pass-tagline">{pass.tagline}</p>
      </div>

      {/* Perforation / Notches */}
      <div className="tk-pass-perforation">
        <div className="tk-pass-notch tk-pass-notch-left" aria-hidden="true" />
        <div className="tk-pass-line" aria-hidden="true" />
        <div className="tk-pass-notch tk-pass-notch-right" aria-hidden="true" />
      </div>

      {/* Pass Body (Perks & Inclusions) */}
      <div className="tk-pass-body">
        <div className="tk-pass-section-label">
          <Sparkles size={13} className="text-[#dfc85b]" />
          <span>Pass Privileges & Access</span>
        </div>

        <ul className="tk-pass-highlights">
          {pass.highlights.map((highlight) => (
            <li key={highlight}>
              <div className="tk-check-circle">
                <Check size={11} strokeWidth={2.5} />
              </div>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Pricing & CTA */}
        <div className="tk-pass-footer">
          <div className="tk-pass-price-box">
            <span className="tk-price-label">Price per pass</span>
            <span className="tk-price-val">{pass.price}</span>
            <span className="tk-price-note">VAT & accreditation inclusive</span>
          </div>

          <button
            type="button"
            className={`tk-pass-btn ${isVip ? 'is-vip-btn' : ''}`}
            onClick={() => onSelect(pass)}
            aria-label={`Get ${pass.title}`}
          >
            <span>Reserve Pass</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
