import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Check, ChevronDown, Mail, Phone, Send, User, X } from 'lucide-react';
import { type PartnerTrack, type SponsorTier } from '@/data/partnershipData';
import { sendFestivalEmail } from '@/lib/emailDispatch';

interface PartnerModalProps {
  isOpen: boolean;
  initialTrack?: PartnerTrack | null;
  initialTier?: SponsorTier | null;
  onClose: () => void;
}

export function PartnerModal({ isOpen, initialTrack, initialTier, onClose }: PartnerModalProps) {
  const [orgName, setOrgName] = useState('');
  const [repName, setRepName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(initialTrack?.category || 'Corporate Sponsors');
  const [tier, setTier] = useState(initialTier?.name || '');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (initialTrack) setCategory(initialTrack.category);
    if (initialTier) setTier(initialTier.name);
  }, [initialTrack, initialTier]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await sendFestivalEmail(email, {
      _subject: 'Your ACFTA Fest Partnership Expression of Interest',
      Organization: orgName,
      Representative: repName,
      Email: email,
      Phone: phone,
      Partnership_Track: category,
      Sponsorship_Tier: tier || 'To be discussed with Secretariat',
      Proposal_Notes: message || 'Standard Partnership Inquiry',
      Support_Desk: 'partnerships@acftafest.com | info@acftafest.com',
    });
    setIsSubmitting(false);
    setIsSent(true);
  };

  const resetAndClose = () => {
    setIsSent(false);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="pt-modal-viewport" role="dialog" aria-modal="true">
        <motion.div
          className="pt-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
        />

        <div className="pt-modal-scroll" onClick={(e) => e.target === e.currentTarget && resetAndClose()}>
          <motion.div
            className="pt-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
          >
            <button type="button" onClick={resetAndClose} className="pt-modal-close" aria-label="Close">
              <X size={18} />
            </button>

            {isSent ? (
              <div className="pt-modal-success">
                <div className="pt-success-icon">
                  <Check size={32} />
                </div>
                <h2>Enquiry Submitted!</h2>
                <p>
                  Thank you, <strong>{repName}</strong>. The ACFTA Fest Partnerships Secretariat has
                  received your expression of interest for <strong>{orgName}</strong>.
                </p>
                <p className="text-xs text-[#657065]">
                  Our protocol liaison will connect with you via <strong>{email}</strong> within 24 hours.
                </p>
                <button type="button" onClick={resetAndClose} className="pt-btn pt-btn-gold mt-4">
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-modal-form">
                <div className="pt-modal-header">
                  <span className="pt-section-eyebrow">ACFTA FEST 2027</span>
                  <h2 className="pt-modal-title">Partnership Expression of Interest</h2>
                  <p className="pt-modal-desc">
                    Connect with our strategic alliances desk to co-create high-impact festival activations in Banjul.
                  </p>
                </div>

                <div className="pt-form-grid">
                  <div className="pt-field">
                    <label className="pt-label">Organization Name *</label>
                    <div className="pt-input-wrap">
                      <Building2 size={15} className="pt-icon" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. ECOWAS Commission or Standard Bank"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="pt-input"
                      />
                    </div>
                  </div>

                  <div className="pt-field">
                    <label className="pt-label">Representative Name *</label>
                    <div className="pt-input-wrap">
                      <User size={15} className="pt-icon" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Fatima Ndiaye"
                        value={repName}
                        onChange={(e) => setRepName(e.target.value)}
                        className="pt-input"
                      />
                    </div>
                  </div>

                  <div className="pt-field">
                    <label className="pt-label">Work Email Address *</label>
                    <div className="pt-input-wrap">
                      <Mail size={15} className="pt-icon" />
                      <input
                        type="email"
                        required
                        placeholder="f.ndiaye@organization.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pt-input"
                      />
                    </div>
                  </div>

                  <div className="pt-field">
                    <label className="pt-label">Phone / WhatsApp *</label>
                    <div className="pt-input-wrap">
                      <Phone size={15} className="pt-icon" />
                      <input
                        type="tel"
                        required
                        placeholder="+220 700 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pt-input"
                      />
                    </div>
                  </div>

                  <div className="pt-field">
                    <label className="pt-label">Partnership Track *</label>
                    <div className="pt-input-wrap">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="pt-input pt-select"
                      >
                        <option value="Government & Intergovernmental">Government & Intergovernmental</option>
                        <option value="Development Partners & DFIs">Development Partners & DFIs</option>
                        <option value="Private Sector / Corporate Sponsors">Private Sector / Corporate Sponsors</option>
                        <option value="Media Houses & Broadcasting">Media Houses & Broadcasting</option>
                      </select>
                      <ChevronDown size={15} className="pt-select-arrow" />
                    </div>
                  </div>

                  <div className="pt-field">
                    <label className="pt-label">Sponsorship Level (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Title ($250k), Platinum ($75k), Gold ($40k)"
                      value={tier}
                      onChange={(e) => setTier(e.target.value)}
                      className="pt-input pl-3"
                    />
                  </div>

                  <div className="pt-field pt-field-full">
                    <label className="pt-label">Strategic Objectives & Proposal</label>
                    <textarea
                      rows={3}
                      placeholder="Describe your organization's core interests (e.g. hosting a country pavilion, youth tech demo, concert stage branding)..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="pt-textarea"
                    />
                  </div>
                </div>

                <div className="pt-modal-actions">
                  <button type="submit" disabled={isSubmitting} className="pt-btn pt-btn-gold w-full">
                    {isSubmitting ? 'Transmitting Request...' : 'Submit Official Expression of Interest'}
                    <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
