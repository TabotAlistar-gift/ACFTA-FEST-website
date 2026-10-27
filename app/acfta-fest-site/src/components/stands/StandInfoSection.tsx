import { Link } from 'wouter';
import { ArrowUpRight, CreditCard, Mail, MessageCircle, Truck } from 'lucide-react';

export function StandInfoSection() {
  return (
    <section className="st-info-section">
      <div className="st-container">
        <div className="st-info-grid">
          {/* Shipping & Payments Block */}
          <div className="st-info-col">
            <span className="st-info-kicker">LOGISTICS &amp; SETTLEMENT</span>
            <h2 className="st-info-title">Shipping &amp; Payments</h2>

            <div className="st-info-item">
              <div className="st-info-icon">
                <Truck size={18} />
              </div>
              <div>
                <h3>Global Shipping &amp; Booth Allocation</h3>
                <p>
                  We ship exhibitor kits and festival collateral to{' '}
                  <strong>40+ countries worldwide</strong>. Estimated delivery:{' '}
                  <strong>5–10 working days within Africa</strong>,{' '}
                  <strong>7–14 days globally</strong>.
                </p>
              </div>
            </div>

            <div className="st-info-item">
              <div className="st-info-icon">
                <CreditCard size={18} />
              </div>
              <div>
                <h3>Payment Options</h3>
                <p>
                  PayPal, Credit/Debit Card, Mobile Money (MoMo), and Tangento Pay.
                </p>
              </div>
            </div>
          </div>

          {/* Custom Orders & Bulk Inquiries Block */}
          <div className="st-info-col st-info-col-custom">
            <span className="st-info-kicker">BESPOKE EXHIBITION PAVILIONS</span>
            <h2 className="st-info-title">Custom Orders</h2>
            <p className="st-info-lead">
              For bulk orders, custom branding, or corporate gifts &amp; country pavilions, reach
              out directly to our Exhibition Desk:
            </p>

            <div className="st-contact-links">
              <a href="mailto:shop@acftafest.africa" className="st-contact-card">
                <Mail size={18} />
                <div>
                  <span>Official Exhibition Desk</span>
                  <strong>shop@acftafest.africa</strong>
                </div>
              </a>
              <a
                href="https://wa.me/237656392763"
                target="_blank"
                rel="noreferrer"
                className="st-contact-card"
              >
                <MessageCircle size={18} />
                <div>
                  <span>WhatsApp Concierge</span>
                  <strong>+237 656 392 763</strong>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Join Us in Banjul, Gambia Banner */}
        <div className="st-banjul-banner">
          <div className="st-banjul-copy">
            <span className="st-banjul-tag">ONE AFRICA, ONE MARKET, ONE FUTURE</span>
            <h2>Join Us in Banjul, Gambia!</h2>
            <p>
              ACFTA Fest will take place in Banjul, Gambia, in March 2027, under the theme:{' '}
              <strong>One Africa, One Market, One Future</strong>. Wear your pride, showcase your
              enterprise, and be part of the movement before you even arrive!
            </p>
          </div>
          <Link href="/tickets" className="st-banjul-cta">
            <span>Book Your Festival Pass</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
