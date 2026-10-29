import './landing.css';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { SiteNavigation } from '@/components/layout/SiteNavigation';
import { Footer } from '@/components/landing/LandingBottomSections';

export default function NotFound() {
  return (
    <div>
      <SiteNavigation />
      <div className="not-found-page">
        <div className="not-found-card">
          <div className="not-found-logo-wrap">
            <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" className="not-found-logo" />
          </div>

          <div className="not-found-content">
            <span className="not-found-kicker">404</span>
            <h1>Sorry! This page isn’t available.</h1>
            <p>The page you were looking for could not be found.</p>

            <div className="not-found-actions">
              <Link href="/" className="not-found-primary">
                Back to home <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
