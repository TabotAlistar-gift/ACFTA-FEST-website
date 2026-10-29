import './site-navigation.css';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export interface SiteNavItem {
  label: string;
  href: string;
  matchPrefix?: string;
  showInDesktopBar?: boolean;
}

const SITE_NAV_ITEMS: readonly SiteNavItem[] = [
  { label: 'Home', href: '/', matchPrefix: '/', showInDesktopBar: true },
  { label: 'About Us', href: '/about', matchPrefix: '/about', showInDesktopBar: true },
  { label: 'Festival / Programme', href: '/#event', showInDesktopBar: true },
  { label: 'Tickets', href: '/tickets', matchPrefix: '/tickets', showInDesktopBar: true },
  { label: 'Register', href: '/register', matchPrefix: '/register', showInDesktopBar: true },
  { label: 'Buy a Stand', href: '/buy-a-stand', matchPrefix: '/buy-a-stand', showInDesktopBar: true },
  { label: 'Partner With Us', href: '/partnership', matchPrefix: '/partnership', showInDesktopBar: true },
  { label: 'Miss ACFTA Fest', href: '/miss-acfta-fest', matchPrefix: '/miss-acfta-fest', showInDesktopBar: true },
  { label: 'Contact', href: '/#contact', showInDesktopBar: false },
];

interface SiteNavigationProps {
  overlay?: boolean;
}

export function SiteNavigation({ overlay = false }: SiteNavigationProps) {
  const [location, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const isItemActive = (item: SiteNavItem): boolean => {
    if (!item.matchPrefix) return false;
    if (item.matchPrefix === '/') return location === '/';
    return location === item.matchPrefix || location.startsWith(`${item.matchPrefix}/`);
  };

  const handleHashOrRouteClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      const hashId = href.slice(2);
      if (location === '/') {
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      navigate('/');
      window.setTimeout(() => {
        document.getElementById(hashId)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };

  const desktopItems = SITE_NAV_ITEMS.filter((item) => item.showInDesktopBar);

  return (
    <>
      <div
        className={`snav-backdrop ${open ? 'is-open' : ''}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      <header className={`snav-header ${overlay ? 'snav-overlay' : ''}`}>
        <div className="snav-inner">
          <Link
            href="/"
            className="snav-brand"
            aria-label="ACFTA Fest home"
            data-testid="link-brand-home"
            onClick={() => setOpen(false)}
          >
            <img src="/images/acfta-fest-logo.png" alt="ACFTA Fest" />
          </Link>

          <nav className="snav-desktop" aria-label="Main navigation">
            {desktopItems.map((item) => {
              const active = isItemActive(item);
              const slug = item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              if (item.href.startsWith('/#')) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="snav-desktop-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleHashOrRouteClick(item.href);
                    }}
                    data-testid={`link-nav-${slug}`}
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`snav-desktop-link ${active ? 'is-active' : ''}`}
                  data-testid={`link-nav-${slug}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="snav-actions">
            <Link
              href="/tickets"
              className="snav-ticket-cta"
              onClick={() => setOpen(false)}
              data-testid="link-nav-get-a-ticket"
            >
              <span>Get a Ticket</span>
              <ArrowUpRight size={14} />
            </Link>

            <button
              ref={toggleBtnRef}
              type="button"
              className="snav-hamburger-btn"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setOpen((prev) => !prev)}
              data-testid="button-mobile-menu"
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={`snav-drawer ${open ? 'is-open' : ''}`}
          aria-hidden={!open}
        >
          <div className="snav-drawer-inner">
            <nav className="snav-drawer-nav" aria-label="Site navigation drawer">
              {SITE_NAV_ITEMS.map((item, index) => {
                const active = isItemActive(item);
                const idxLabel = String(index + 1).padStart(2, '0');
                if (item.href.startsWith('/#')) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      tabIndex={open ? 0 : -1}
                      className="snav-drawer-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleHashOrRouteClick(item.href);
                      }}
                      data-testid={`link-mobile-${index}`}
                    >
                      <span className="snav-drawer-idx">{idxLabel}</span>
                      <span className="snav-drawer-label">{item.label}</span>
                      <ArrowUpRight size={16} />
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? 'page' : undefined}
                    className={`snav-drawer-link ${active ? 'is-active' : ''}`}
                    onClick={() => setOpen(false)}
                    data-testid={`link-mobile-${index}`}
                  >
                    <span className="snav-drawer-idx">{idxLabel}</span>
                    <span className="snav-drawer-label">
                      <span>{item.label}</span>
                      {active && <span className="snav-active-pill">Current</span>}
                    </span>
                    <ArrowUpRight size={16} />
                  </Link>
                );
              })}
            </nav>

            <div className="snav-drawer-footer">
              <Link
                href="/tickets"
                tabIndex={open ? 0 : -1}
                className="snav-drawer-cta"
                onClick={() => setOpen(false)}
                data-testid="link-mobile-ticket"
              >
                <span>Get a Ticket</span>
                <ArrowUpRight size={16} />
              </Link>
              <p className="snav-drawer-motto">One Africa. One market. One future.</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
