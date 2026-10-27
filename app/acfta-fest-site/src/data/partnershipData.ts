import { Building2, Globe2, Landmark, Lightbulb, Radio, Shield, TrendingUp, Users } from 'lucide-react';

export interface SponsorTier {
  name: string;
  investment: string;
  highlight: string;
  features: string[];
}

export interface PartnerTrack {
  id: string;
  number: string;
  title: string;
  category: string;
  icon: typeof Landmark;
  summary: string;
  deliverables: string[];
  tiers?: SponsorTier[];
}

export const PARTNER_TRACKS: PartnerTrack[] = [
  {
    id: 'gov',
    number: '01',
    category: 'Public Institutions',
    title: 'Government & Intergovernmental Partners',
    icon: Landmark,
    summary:
      'For Trade Ministries, the AfCFTA Secretariat, Regional Blocs (ECOWAS, EAC, SADC), and National Export Promotion Agencies.',
    deliverables: [
      'Official representation at Presidential Opening & Closing Ceremonies',
      'Country Pavilions in the Pan-African Exhibition Hall',
      'Hosting of Bilateral Trade Agreements & Ministerial Roundtables',
      'Full Diplomatic Protocol & Delegation VVIP Access passes',
      'Joint Policy Communiqué releases distributed across 54 AU member states',
    ],
  },
  {
    id: 'dfi',
    number: '02',
    category: 'Development Partners',
    title: 'Development Agencies, Donors & DFIs',
    icon: Lightbulb,
    summary:
      'For UN Agencies, Multilateral Banks (AfDB, Afreximbank), Bilateral Donors, and Impact Foundations.',
    deliverables: [
      'Measurable alignment with UN SDGs 1, 5, 8, 9, 11 & 17',
      'Lead sponsorship of Youth Startup Incubation & Tech Pitch Arena',
      'Sponsorship of African Legends Youth Sports Clinics',
      'Gender inclusion and SME empowerment panel facilitation',
      'Comprehensive Monitoring & Evaluation (M&E) impact reporting',
    ],
  },
  {
    id: 'corp',
    number: '03',
    category: 'Private Sector',
    title: 'Corporate Sponsors & Industry Leaders',
    icon: Building2,
    summary:
      'For Pan-African Multinationals, Commercial Banks, Telecoms, Fintech, Energy, and FMCG conglomerates.',
    deliverables: [
      'High-visibility branding across all physical festival arenas and digital broadcasts',
      'Priority activation spaces in the Youth Tech Lounge & Heritage Taste Corner',
      'Executive networking with high-net-worth investors and policymakers',
      'Tailored corporate delegation packages including VIP hospitality lounges',
    ],
    tiers: [
      {
        name: 'Title Festival Sponsor',
        investment: '$250,000',
        highlight: 'Exclusive naming rights & maximum continental exposure',
        features: [
          'Top-tier naming rights across all campaigns & live stages',
          'Keynote address during Opening Ceremonies',
          'Main Stage naming rights for evening mega-concerts',
          'VIP Business Class flights & 5-Star hospitality suites',
          'Exhibition Pavilion prime front-row location',
        ],
      },
      {
        name: 'Platinum Tier',
        investment: '$75,000+',
        highlight: 'Category exclusivity & premier speaking slots',
        features: [
          'Full-stage branding across chosen arena',
          'Category exclusivity (e.g. exclusive Banking or Telco partner)',
          'Main plenary speaking and panel moderation slot',
          'VIP lounge branding & 20 all-access VIP passes',
        ],
      },
      {
        name: 'Gold Tier',
        investment: '$40,000 – $74,999',
        highlight: 'Premium exhibition & extensive media spotlight',
        features: [
          'Exhibition booth in premier trade pavilion',
          'Branding in official festival broadcast media reels',
          'Festival app digital sponsor banner placement',
          '10 all-access festival VIP delegate passes',
        ],
      },
      {
        name: 'Silver Tier',
        investment: '$15,000 – $39,999',
        highlight: 'Targeted product activations & digital reach',
        features: [
          'Dedicated product sampling / activation pavilion space',
          'Integration across ACFTA Fest digital channels & newsletter',
          '5 VIP festival delegate passes',
        ],
      },
    ],
  },
  {
    id: 'media',
    number: '04',
    category: 'Broadcasting & Press',
    title: 'Media Houses & Digital Platforms',
    icon: Radio,
    summary:
      'For Continental Television Networks, Radio Broadcasters, Digital Publishers, and Creative Production Houses.',
    deliverables: [
      'Official Accredited Media Partner status with priority press credentials',
      'Dedicated on-site broadcast studio and live-reporting interview booth',
      'Exclusive behind-the-scenes access to artists, dignitaries, and football legends',
      'Documentary co-production rights & syndication opportunities',
    ],
  },
];

export const IMPACT_PILLARS = [
  {
    icon: Globe2,
    title: '54 African Nations in One Venue',
    desc: 'Unprecedented access to trade delegates, policy champions, and innovators from across the entire African continent.',
  },
  {
    icon: TrendingUp,
    title: '$3.4 Trillion Market Catalyst',
    desc: 'Position your brand directly at the heart of the world’s largest single free trade market implementation.',
  },
  {
    icon: Users,
    title: '50M+ Pan-African Media Reach',
    desc: 'Massive visibility through television syndication, live streams, social media campaigns, and international press coverage.',
  },
  {
    icon: Shield,
    title: 'Enduring Legacy Projects',
    desc: 'Support concrete CSR impact in youth entrepreneurship, digital skills, and community sporting infrastructure in Banjul.',
  },
];

export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Submit Expression of Interest',
    desc: 'Tell us your organization’s strategic goals and preferred partnership category.',
  },
  {
    num: '02',
    title: 'Bespoke Activation Strategy',
    desc: 'Our partnerships secretariat collaborates with you to craft a tailored deliverable package.',
  },
  {
    num: '03',
    title: 'Bilateral Agreement & Protocol',
    desc: 'Formalize agreement with clear KPI deliverables, brand guidelines, and diplomatic clearances.',
  },
  {
    num: '04',
    title: 'Pre-Festival Planning & Assets',
    desc: 'Submit your brand collateral and participate in delegate briefings before arrival in Banjul.',
  },
  {
    num: '05',
    title: 'Festival Execution & Impact Report',
    desc: 'Activate on-ground with dedicated concierge support, followed by full post-summit M&E metrics.',
  },
];
