import { type CheckoutTicket } from '@/components/checkout/types';

export interface ExhibitionStand extends CheckoutTicket {
  id: string;
  code: string;
  tierBadge: string;
  subtitle: string;
  dimensions: string;
  locationZone: string;
  altImage: string;
  visibilityNote: string;
  theme: 'theme-white' | 'theme-clay' | 'theme-forest';
}

export const EXHIBITION_STANDS: ExhibitionStand[] = [
  {
    id: 'ruby-1',
    code: 'R1',
    number: 'R1',
    tierBadge: 'THE RUBY 1 STAND · FLAGSHIP 18m²',
    title: 'Executive 18m² Exhibition/Retail Stand',
    subtitle: 'The Ruby 1 Stand Comes with Premium Event Access Package',
    date: 'Full Festival Exhibition · March 2026 / 2027',
    dimensions: '18 m² Island Pavilion',
    locationZone: 'High-Traffic Convergence Zone · B.A. Tinubu ICC & M. Abiola National Stadium',
    price: '$10,000',
    priceRaw: 10000,
    currency: 'USD',
    featured: true,
    image: '/images/stands/ruby-1-main.jpg',
    altImage: '/images/stands/ruby-1-alt.jpg',
    description:
      'Strategically positioned in the high-traffic zone between the B.A. Tinubu International Conference Center (ICC) and the M. Abiola National Stadium. This 18 square meter space offers maximum visibility and engagement with event attendees.',
    visibilityNote:
      'Capitalize on the convergence of conference delegates, sports fans, and concertgoers. Your stand is perfectly placed to capture diverse audiences from multiple major events.',
    benefits: [
      '18m² Executive Exhibition Booth with ACFTA Fest Overhead Fascia Placards & Roll-Up Banners',
      'Branded Reception Counter, Lounge Table & 4 Visitor Chairs',
      '10 VIP Tickets to the Mega Concert',
      '10 VIP Tickets to TINUBU’s CUP',
      '100 Premium Tickets for the Heritage Waves event (for client hospitality & giveaways)',
    ],
    theme: 'theme-white',
  },
  {
    id: 'ruby-2',
    code: 'R2',
    number: 'R2',
    tierBadge: 'THE RUBY 2 STAND · ESSENTIAL 9m²',
    title: 'Essential 9m² Exhibition Stand',
    subtitle: 'The Ruby 2 Stand Comes with Comprehensive Event Access Package',
    date: 'Full Festival Exhibition · March 2026 / 2027',
    dimensions: '9 m² Modular Arch Booth',
    locationZone: 'Vibrant Main Corridor · Connecting B.A. Tinubu ICC & M. Abiola National Stadium',
    price: '$7,500',
    priceRaw: 7500,
    currency: 'USD',
    featured: true,
    image: '/images/stands/ruby-2-main.jpg',
    altImage: '/images/stands/ruby-2-alt.jpg',
    description:
      'Perfectly positioned in the vibrant corridor connecting the B.A. Tinubu International Conference Center (ICC) and the M. Abiola National Stadium. This 9 square meter stand offers an exceptional balance of size and visibility in a key event area.',
    visibilityNote:
      'An exceptional entry point for businesses looking to engage diverse crowds, generate high-value B2B & B2C leads, and reward clients with exclusive event experiences.',
    benefits: [
      '9m² Architectural Arch Stand with ACFTA Fest Placards, Tall Roll-Up Wall & Podium Counter',
      '5 VIP Tickets to the Mega Concert',
      '5 VIP Tickets to the prestigious TINUBU’S CUP',
      '100 Premium Tickets for the Heritage Waves event',
    ],
    theme: 'theme-clay',
  },
  {
    id: 'emerald-1',
    code: 'E1',
    number: 'E1',
    tierBadge: 'EMERALD 1 STAND · STRATEGIC 9m²',
    title: 'Emerald 1: 9m² Exhibition Stand',
    subtitle: 'Maximum Foot Traffic & Hospitality Package',
    date: 'Full Festival Exhibition · March 2026 / 2027',
    dimensions: '9 m² Exhibition Space',
    locationZone: 'Primary Connector Corridor · B.A. Tinubu ICC & M. Abiola National Stadium',
    price: '$5,000',
    priceRaw: 5000,
    currency: 'USD',
    image: '/images/stands/emerald-1-main.jpg',
    altImage: '/images/stands/emerald-1-alt.jpg',
    description:
      'A strategically placed 9m² stand connecting the B.A. Tinubu International Conference Center and the M. Abiola National Stadium. Benefit from maximum foot traffic from conference attendees, sports fans, and concertgoers alike.',
    visibilityNote:
      'The ideal opportunity for emerging businesses looking for an affordable yet commanding presence with full ACFTA Fest roll-up backdrop and counter branding.',
    benefits: [
      '9m² Stand with ACFTA Fest Illuminated Roll-Up Backdrop Panels & Branded Reception Desk',
      'Exclusive Hospitality: 3 VIP Tickets to the Mega Concert',
      'Sports Access: 3 VIP Tickets to the TINUBU’S CUP',
      'Audience Engagement: 50 Premium Tickets for the Heritage Waves event (for giveaways & promos)',
    ],
    theme: 'theme-forest',
  },
  {
    id: 'emerald-2',
    code: 'E2',
    number: 'E2',
    tierBadge: 'EMERALD 2 STAND · COMPACT 3m²',
    title: 'Emerald 2: 3m² Exhibition Stand',
    subtitle: 'Micro 3m² Stand at B.A. Tinubu ICC & M. Abiola National Stadium – Lowest Cost Entry to Prime Real Estate',
    date: 'Full Festival Exhibition · March 2026 / 2027',
    dimensions: '3 m² Branded Pavilion',
    locationZone: 'High-Visibility Corridor · Between B.A. Tinubu ICC & M. Abiola National Stadium',
    price: '$2,500',
    priceRaw: 2500,
    currency: 'USD',
    image: '/images/stands/emerald-2-main.jpg',
    altImage: '/images/stands/emerald-2-alt.jpg',
    description:
      'Secure your compact 3 square meter stand located in the high-visibility area between the B.A. Tinubu International Conference Center and the M. Abiola National Stadium. Ideal for small businesses or focused product displays.',
    visibilityNote:
      'Get maximum exposure for minimum investment in the prime corridor and secure VIP access to key festival events.',
    benefits: [
      '3m² Branded Pavilion Booth with Overhead ACFTA Fest Valence Placard & Counter Walls',
      '1 VIP Ticket to the Mega Concert',
      '1 VIP Ticket to the TINUBU’S CUP',
      '25 Premium Tickets for the Heritage Waves event',
    ],
    theme: 'theme-white',
  },
  {
    id: 'sapphire-1',
    code: 'S1',
    number: 'S1',
    tierBadge: 'SAPPHIRE STAND · STADIUM 3m²',
    title: 'Budget 3m² Stand Inside M. Abiola National Stadium',
    subtitle: 'Direct Stadium Complex Exposure for Sports & Festival Enthusiasts',
    date: 'Full Festival Exhibition · March 2026 / 2027',
    dimensions: '3 m² Stadium Kiosk',
    locationZone: 'Inside M. Abiola National Stadium Complex',
    price: '$1,000',
    priceRaw: 1000,
    currency: 'USD',
    image: '/images/stands/sapphire-main.jpg',
    altImage: '/images/stands/sapphire-alt.jpg',
    description:
      'Secure your high-visibility 3 square meter stand located directly within the M. Abiola National Stadium complex. This is your most affordable way to engage a massive audience of sports and event enthusiasts.',
    visibilityNote:
      'Get direct stadium exposure and exclusive event access without the International Conference Center price tag.',
    benefits: [
      '3m² Sapphire Exhibition Kiosk with Overhead Header Placard & Branded Counter',
      '1 VIP Ticket to the TINUBU’S CUP (Ideal for networking or personal use)',
      '15 Premium Tickets for the Heritage Waves event (Perfect for promotional giveaways)',
    ],
    theme: 'theme-clay',
  },
  {
    id: 'regular-c1',
    code: 'C1',
    number: 'C1',
    tierBadge: 'REGULAR STAND · CANOPY AREA 3m²',
    title: 'Ultra-Budget 3m² Stand – Outside Canopy Area',
    subtitle: 'High-Volume Foot Traffic at Main Complex Entrances',
    date: 'Full Festival Exhibition · March 2026 / 2027',
    dimensions: '3 m² Exterior Canopy Space',
    locationZone: 'High-Traffic Canopy Zone · Outside Main Event Venues (ICC & National Stadium)',
    price: '$100',
    priceRaw: 100,
    currency: 'USD',
    image: '/images/stands/regular-main.jpg',
    altImage: '/images/stands/regular-alt.jpg',
    description:
      'Secure your basic 3 square meter display area located in the high-traffic canopy zone just outside all main event venues (B.A. Tinubu ICC and M. Abiola National Stadium). Provides maximum engagement with foot traffic entering and exiting the complex.',
    visibilityNote:
      'Please Note: This stand does not grant access to the main interior event areas (ICC, Stadium interior). Perfect for vendors, micro-businesses, or promotional teams needing low-cost, high-volume visibility.',
    benefits: [
      '3m² Display Space in the High-Traffic Exterior Canopy Zone',
      'Official ACFTA Fest Branded Exhibition Tablecloth & Display Table',
      'Direct engagement with general public & festival arrivals',
    ],
    theme: 'theme-white',
  },
];
