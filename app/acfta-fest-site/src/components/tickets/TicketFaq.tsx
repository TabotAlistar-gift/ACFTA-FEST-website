import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TICKET_FAQS } from '@/data/ticketData';

export function TicketFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="tk-faq-white-section">
      <div className="tk-faq-white-container">
        <h2 className="tk-faq-white-title">Frequently Asked Questions</h2>

        <div className="tk-faq-white-list">
          {TICKET_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q} className={`tk-faq-white-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="tk-faq-white-trigger"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[#123d2d]">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 text-[#a6533b] shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="tk-faq-white-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
