import './landing.css';
import './register.css';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { getStreamBySlug } from '@/data/registerData';
import { RegisterPortal, type RegisterFormData } from '@/components/register/RegisterPortal';
import { RegisterSuccess } from '@/components/register/RegisterSuccess';
import { SiteNavigation } from '@/components/layout/SiteNavigation';
import { Footer } from '@/components/landing/LandingBottomSections';

export default function RegisterPathwayPage() {
  const [, params] = useRoute<{ pathwaySlug: string }>('/register/:pathwaySlug');
  const [submittedData, setSubmittedData] = useState<RegisterFormData | null>(null);

  const activeStream = params?.pathwaySlug ? getStreamBySlug(params.pathwaySlug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.pathwaySlug]);

  return (
    <div className="reg-page-shell">
      <SiteNavigation />

      <main>
        {!activeStream ? (
          <section className="reg-portal-section">
            <div className="reg-portal-container">
              <div className="reg-portal-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <h1 className="reg-form-heading" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                  Participation Pathway Not Found
                </h1>
                <p className="reg-form-caption" style={{ marginBottom: '1.75rem' }}>
                  Please select one of the official ACFTA Fest participation pathways to continue your registration.
                </p>
                <Link href="/register" className="reg-btn-primary">
                  <ArrowLeft size={15} />
                  <span>Go Back</span>
                </Link>
              </div>
            </div>
          </section>
        ) : submittedData ? (
          <RegisterSuccess
            data={submittedData}
            onReset={() => {
              setSubmittedData(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <RegisterPortal
            currentStream={activeStream}
            onSuccess={(data) => {
              setSubmittedData(data);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
