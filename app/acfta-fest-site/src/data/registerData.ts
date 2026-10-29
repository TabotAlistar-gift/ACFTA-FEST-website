export type StreamKey = 'delegate' | 'vendor' | 'volunteer' | 'attendee';

export interface RegistrationStream {
  key: StreamKey;
  slug: string;
  routePath: string;
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  accent: string;
  perks: string[];
  requirements: string[];
  feeLabel: string;
  ctaText: string;
}

export const REGISTRATION_STREAMS: RegistrationStream[] = [
  {
    key: 'delegate',
    slug: 'high-level-deal-making',
    routePath: '/register/high-level-deal-making',
    number: '01',
    badge: 'EXECUTIVE & INVESTMENT',
    title: 'Delegates & Institutional Investors',
    subtitle: 'High-Level Cross-Border Dealmaking',
    tagline:
      'Connect directly with sovereign wealth managers, African ministers, enterprise founders, and commercial bank syndicates.',
    image: '/images/register-delegates.jpg',
    accent: '#ECDA62',
    perks: [
      'Access to private Startup Flames Investor Pitch Arena',
      'Exclusive ACFTA 2026 Dealbook & B2B Directory',
      'Entry to VIP Delegate Networking Lounge & Executive Dining',
      'Reserved seating at inaugural presidential plenary',
    ],
    requirements: [
      'Accredited corporate entity, investment fund, or state institution',
      'Brief portfolio or investment scope summary',
    ],
    feeLabel: 'Pass Credential Required',
    ctaText: 'Register as Delegate',
  },
  {
    key: 'vendor',
    slug: 'vendors-and-traders',
    routePath: '/register/vendors-and-traders',
    number: '02',
    badge: 'EXHIBITOR & COMMERCE',
    title: 'Vendors & Pan-African Traders',
    subtitle: 'Market Stalls, Fashion, Gastronomy & Tech',
    tagline:
      'Place your brand, products, and African craftsmanship directly before 15,000+ continental delegates and buyers in Banjul.',
    image: '/images/register-vendors.jpg',
    accent: '#a6533b',
    perks: [
      'Official booth allocation (1m x 2m, 3m x 3m, or open food plaza)',
      'Listing in Official ACFTA Fest Trade Directory',
      'Continuous power supply, festival security & booth badge',
      'Direct B2C sales and wholesale trade opportunities',
    ],
    requirements: [
      'Locally made or Pan-African originated goods / services',
      'Health & safety compliance for food & beverage operators',
    ],
    feeLabel: 'Exhibition Stand Fee Applies',
    ctaText: 'Apply for Exhibition Stand',
  },
  {
    key: 'volunteer',
    slug: 'volunteers-and-crew',
    routePath: '/register/volunteers-and-crew',
    number: '03',
    badge: 'YOUTH & LOGISTICS CREW',
    title: 'Volunteers & Operations Crew',
    subtitle: 'Leadership, Protocol & Event Production',
    tagline:
      'Be at the vibrant heart of the festival. Gain hands-on international event experience, networking, and leadership credentials.',
    image: '/images/register-volunteers.jpg',
    accent: '#ECDA62',
    perks: [
      'Official ACFTA Fest Crew Uniform & accredited security badge',
      'Certificate of International Service signed by festival directors',
      'Daily meals, local transit stipend, and mentorship sessions',
      'Hands-on operational training across VIP, stages, or media',
    ],
    requirements: [
      'Aged 18–35 with strong passion for Pan-African development',
      'Availability in Banjul for training and full festival duration',
    ],
    feeLabel: 'Free Community Application',
    ctaText: 'Join Volunteer Crew',
  },
  {
    key: 'attendee',
    slug: 'general-attendees',
    routePath: '/register/general-attendees',
    number: '04',
    badge: 'CULTURE & SPORTS ENTHUSIAST',
    title: 'General Attendees & Observers',
    subtitle: 'Celebration, Music, Heritage & Football',
    tagline:
      'Immerse yourself in three extraordinary days of live music concerts, runway shows, traditional arts, and stadium football.',
    image: '/images/hero-cultural.webp',
    accent: '#123d2d',
    perks: [
      'Full access to Heritage Waves cultural stages & art domes',
      'Free entry to open innovation pavilions and food village',
      'Access to stadium seating for African Legends United football derby',
      'Commemorative festival wristband and digital guide',
    ],
    requirements: [
      'Open to all ages and African diaspora members worldwide',
      'Standard admission ticket or festival pass registration',
    ],
    feeLabel: 'Free Registration / Ticketed Entry',
    ctaText: 'Register as Attendee',
  },
];

export function getStreamBySlug(slugOrKey: string): RegistrationStream | undefined {
  const normalized = slugOrKey.trim().toLowerCase();
  return REGISTRATION_STREAMS.find(
    (s) => s.slug === normalized || s.key === normalized,
  );
}
