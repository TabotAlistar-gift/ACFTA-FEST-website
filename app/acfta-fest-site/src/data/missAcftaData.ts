export interface MissPillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface MissJourneyStep {
  code: string;
  stage: string;
  summary: string;
}

export interface MissFaqItem {
  question: string;
  answer: string;
}

export const MISS_PILLARS: readonly MissPillar[] = [
  {
    number: '01',
    title: 'African Identity & Cultural Pride',
    subtitle: 'Heritage & Storytelling',
    description:
      'Honouring the richness of Africa’s textiles, languages, artistry, and traditions while presenting a modern, forward-looking narrative of continental unity.',
  },
  {
    number: '02',
    title: 'Women’s Leadership & Empowerment',
    subtitle: 'Voice, Purpose & Influence',
    description:
      'Amplifying visionary African women who champion entrepreneurship, social impact, cross-border collaboration, and community transformation.',
  },
  {
    number: '03',
    title: 'Talent, Confidence & Personal Development',
    subtitle: 'Excellence on the Continental Stage',
    description:
      'Providing a prestigious platform for public speaking, creative expression, executive poise, and mentorship alongside industry and cultural leaders.',
  },
  {
    number: '04',
    title: 'Continental Representation',
    subtitle: 'Ambassadors of One Market',
    description:
      'Connecting cultural diplomacy directly to the wider ACFTA Fest mission—bridging trade, innovation, and youth inclusion across Africa.',
  },
];

export const MISS_JOURNEY_STEPS: readonly MissJourneyStep[] = [
  {
    code: '01',
    stage: 'Discover',
    summary: 'Learn what Miss ACFTA Fest represents and explore the opportunity.',
  },
  {
    code: '02',
    stage: 'Apply',
    summary: 'Complete the official application or expression-of-interest form when open.',
  },
  {
    code: '03',
    stage: 'Selection',
    summary: 'Shortlisted candidates are reviewed and contacted by the organizing team.',
  },
  {
    code: '04',
    stage: 'Prepare',
    summary: 'Selected participants receive guidance, orientation, and event preparation details.',
  },
  {
    code: '05',
    stage: 'Take the Stage',
    summary: 'Participate in the Miss ACFTA Fest experience during ACFTA Fest.',
  },
];

export const MISS_READINESS_CHECKLIST: readonly string[] = [
  'Authentic passion for African cultural heritage, unity, and continental representation',
  'Strong communication, leadership potential, and commitment to community or creative impact',
  'Availability to participate in official Miss ACFTA Fest orientation and festival programming',
  'Agreement to uphold the official ACFTA Fest Code of Conduct and ambassadorial standards',
];

export const MISS_FAQS: readonly MissFaqItem[] = [
  {
    question: 'What is Miss ACFTA Fest?',
    answer:
      'Miss ACFTA Fest is a signature cultural and leadership showcase within ACFTA Fest celebrating African women, heritage, confidence, talent, and continental representation.',
  },
  {
    question: 'How does Miss ACFTA Fest connect to the wider festival?',
    answer:
      'Anchored within the festival’s cultural programming, Miss ACFTA Fest brings together cultural diplomacy, youth leadership, fashion, and creative expression alongside the trade and innovation forums of ACFTA Fest.',
  },
  {
    question: 'How can prospective candidates apply or register their interest?',
    answer:
      'Prospective candidates, national delegates, and talent agencies can register their expression of interest directly on this page or contact the Secretariat at info@acftafest.com to receive official edition guidelines as soon as applications open.',
  },
  {
    question: 'Where are edition-specific eligibility criteria and dates published?',
    answer:
      'Edition-specific eligibility rules, application timelines, and participation guidelines are issued by the ACFTA Fest Secretariat for each host edition. Registering your interest ensures you receive the verified briefing package directly from the organizing team.',
  },
  {
    question: 'Can fashion brands, cultural institutions, or sponsors partner with Miss ACFTA Fest?',
    answer:
      'Yes. Fashion houses, beauty and lifestyle brands, media networks, and cultural institutions can collaborate with Miss ACFTA Fest through our Partnerships Desk or by submitting a partnership inquiry on this page.',
  },
];
