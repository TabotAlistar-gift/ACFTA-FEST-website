import { type CheckoutTicket } from '@/components/checkout/types';

export interface FestivalPass extends CheckoutTicket {
  tierName: string;
  badgeType: string;
  accessDays?: string;
  tagline: string;
  highlights: string[];
}

export const FESTIVAL_PASSES: FestivalPass[] = [
  {
    number: '01',
    tierName: 'Single Day Access',
    title: 'Ticket 1 (26 March 2026)',
    badgeType: 'DAY 1 ACCESS',
    date: '26 March 2026',
    accessDays: 'Day 1 Full Access',
    price: 'NGN 150,000',
    priceRaw: 150000,
    tagline: 'A day of opening moments, business exchange, and evening celebration.',
    description: 'A day of opening moments, business exchange, and evening celebration.',
    image: '/images/startup-flames.webp',
    highlights: [
      'Inaugural ceremony and presidential presentations',
      'B2B pavilions, fireside chats and pitch sessions',
      'Pan-African music and live entertainment',
      'Gala night networking and executive buffet',
    ],
    benefits: [
      'Inaugural ceremony and presentations',
      'B2B pavilions and fireside chats',
      'Music and entertainment',
      'Gala night and buffet',
    ],
  },
  {
    number: '02',
    tierName: 'Complete Experience',
    title: 'Premium Pass (All Days)',
    badgeType: 'FULL 3-DAY ACCESS',
    date: 'Full 3-Day Access',
    price: 'NGN 250,000',
    priceRaw: 250000,
    featured: true,
    tagline: 'The complete festival experience, with premium access throughout.',
    description: 'The complete festival experience, with premium access throughout.',
    image: '/images/heritage-waves.webp',
    highlights: [
      'Conferences, workshops, exhibitions, concerts, and gala match',
      'Reserved VIP seating across all major sessions',
      'Exclusive networking receptions and gala dinner',
      'VIP Lounge and Investor Matchmaking zone',
      'Attendee database access and premium email support',
      'Festival swag pack and certificate of participation',
    ],
    benefits: [
      'Conferences, workshops, exhibitions, concerts, and gala match',
      'Reserved VIP seating across major sessions',
      'Networking receptions and gala dinner',
      'VIP Lounge and Investor Matchmaking zone',
      'Attendee database access and premium email support',
      'Festival swag pack and certificate of participation',
    ],
  },
  {
    number: '03',
    tierName: 'Single Day Access',
    title: 'Ticket 2 (28 March 2026)',
    badgeType: 'DAY 3 ACCESS',
    date: '28 March 2026',
    accessDays: 'Day 3 Full Access',
    price: 'NGN 150,000',
    priceRaw: 150000,
    tagline: 'A festival day focused on sport, live entertainment, and community.',
    description: 'A festival day focused on sport, live entertainment, and community.',
    image: '/images/african-legends.webp',
    highlights: [
      'African Legends United sports clinics',
      'Celebrity football match at the National Stadium',
      'Live music concerts & cultural entertainment',
      'Heritage Waves fashion runway & food market',
    ],
    benefits: [
      'Sports clinics',
      'Celebrity game',
      'Live entertainment',
    ],
  },
];

export const TICKET_FAQS = [
  {
    q: 'What is included in the ticket price?',
    a: 'Each ticket grants admission to the listed festival sessions, exhibitions, concerts, and matches for that day (or all three days with the Premium Pass). Passes also include accreditation and access to the digital networking portal.',
  },
  {
    q: 'Can I upgrade my 1-Day ticket to the Premium Pass later?',
    a: 'Yes. Upgrades can be requested directly via your confirmation email or on-site at the Delegate Registration Desk at the Banjul National Stadium, subject to availability.',
  },
  {
    q: 'Are corporate or delegation group bookings available?',
    a: 'Yes. For delegations and groups of 5 or more attendees, please reach out to delegations@acftafest.com for assistance and concierge coordination.',
  },
  {
    q: 'How will I receive my ticket?',
    a: 'Immediately upon checkout confirmation, you will receive your digital badge with a secure QR code via email for smooth check-in at the venue.',
  },
];
