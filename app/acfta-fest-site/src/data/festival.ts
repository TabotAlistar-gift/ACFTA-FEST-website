export type Speaker = {
  name: string;
  role: string;
  image?: string;
};

export const speakers: Speaker[] = [
  { name: 'Hon. Hannatu Musa Musawa', role: 'Minister of Art, Culture, Tourism & the Creative Economy, Nigeria', image: 'hannatu-musa-musawa.webp' },
  { name: 'Dr. Mustapha Abdullahi', role: 'Director-General/CEO, Energy Commission of Nigeria', image: 'mustapha-abdullahi.webp' },
  { name: 'Prof. Madison Ngafeeson', role: 'Director, Business Data Analytics, Palm Beach Atlantic University; President of LEADD Missions International', image: 'madison-ngafeeson.webp' },
  { name: 'Obi Asika', role: 'Director-General/CEO, National Council of Arts & Culture, Nigeria', image: 'obi-asika.webp' },
  { name: 'Hon. Desmond Elliot', role: 'Member, Lagos State House of Assembly', image: 'desmond-elliot.webp' },
  { name: 'Frankie Powell', role: 'Leadership Strategist and Corporate Culture Coach', image: 'frankie-powell.webp' },
  { name: 'Fonda Fred Fonda', role: 'Chief Financial Officer for Africa, UBA', image: 'fonda-fred-fonda.webp' },
  { name: 'Mirabelle Ade Anyu', role: 'FCCA Finance Leader', image: 'mirabelle-adeyanyu.webp' },
  { name: 'Dr. Ikechi Agbugba', role: 'Pioneer, Brain Re-Engineering Initiative; Associate Professor, Rivers State University', image: 'ikechi-agbugba.webp' },
  { name: 'Dr. Tijjani El-badawy', role: 'Water-Energy Security Specialist', image: 'tijjani-el-badawy.webp' },
  { name: 'Dr. Mechie Nkengla', role: 'Founder of Data Products, Nuscienta and African Trade Bridge', image: 'mechie-nkengla.webp' },
  { name: 'Mr. Eyong Enoh', role: 'Cameroon and Ajax Amsterdam FC Football Legend; CEO, 4PBaller', image: 'eyong-enoh.webp' },
  { name: 'Dr. Ifeoma Betty Ezike', role: 'Assistant Director, Monetary Policy Department, CBN', image: 'ifeoma-ezike.webp' },
  { name: 'Dr. Alara Eric Martial Avom', role: 'National Coordinator for PNDCF Cameroon', image: 'alara-avom.webp' },
  { name: 'Arc. Sani Ihtisham Saulawa', role: 'President, Nigerian Institute of Architects', image: 'sani-saulawa.webp' },
];

export const pillars = [
  {
    id: 'startup-flames',
    number: '01',
    name: 'Startup Flames',
    descriptor: 'Trade · enterprise · innovation',
    image: '/images/startup-flames.webp',
    alt: 'An entrepreneur presenting to an audience at an event',
    copy: 'A platform for African entrepreneurs to bring their ideas into view: showcasing products, pitching, meeting investors, learning and exploring new markets.',
  },
  {
    id: 'heritage-waves',
    number: '02',
    name: 'Heritage Waves',
    descriptor: 'Culture · fashion · creative expression',
    image: '/images/heritage-waves.webp',
    alt: 'A group of performers in colourful traditional dress',
    copy: 'A celebration of Africa’s many identities through performance, fashion, music, visual arts, poetry and the stories that travel across generations.',
  },
  {
    id: 'legends-united',
    number: '03',
    name: 'African Legends United',
    descriptor: 'Sport · mentorship · diplomacy',
    image: '/images/african-legends.webp',
    alt: 'A football team gathered on the pitch before a match',
    copy: 'A meeting point for sporting legacy and new possibility—using African sport to encourage unity, mentorship and youth participation.',
  },
];

export type ProgrammeDetail = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type ProgrammeSnapshot = {
  title: string;
  image: string;
  alt: string;
  summary: string;
  tone: 'ochre' | 'clay' | 'forest';
  items: ProgrammeDetail[];
};

export const programmeSnapshots: ProgrammeSnapshot[] = [
  {
    title: 'Startup Flames Arena',
    image: '/images/startup-flames.webp',
    alt: 'A startup founder presenting on stage',
    summary: 'A flagship startup and trade platform for investors, founders, and cross-border business conversations.',
    tone: 'ochre',
    items: [
      {
        title: 'Investor launches and regional trade showcases',
        description: 'A curated launch space for investment opportunities, trade connections, and regional market visibility across Africa.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        alt: 'African founders and investors gathered for a business showcase',
      },
      {
        title: '50-plus live pitch sessions',
        description: 'A high-energy stage for entrepreneurs to present ideas, products and growth plans in front of investors, ecosystem leaders and partners.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
        alt: 'African entrepreneurs pitching ideas to an audience',
      },
      {
        title: 'Masterclasses on leadership, digital divide, funding and market expansion',
        description: 'Practical, action-focused sessions designed to build founder confidence and improve access to finance, leadership, technology and expansion strategies.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        alt: 'African business leaders in a panel discussion',
      },
      {
        title: 'Gambia-focused startup roundtable with actors and stakeholders',
        description: 'A national conversation that brings together founders, operators, institutions and ecosystem actors to align startup priorities with local opportunity.',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80',
        alt: 'African startup stakeholders in a national roundtable discussion',
      },
    ],
  },
  {
    title: 'Heritage Waves Dome',
    image: '/images/heritage-waves.webp',
    alt: 'Performers celebrating African cultural heritage',
    summary: 'A cultural arena for music, fashion, visual arts, storytelling and the creative industries in motion.',
    tone: 'clay',
    items: [
      {
        title: 'Fashion, music and performance showcases',
        description: 'A vibrant platform for cultural expression, pan-African design and live artistic performance.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
        alt: 'African music and performance showcase',
      },
      {
        title: 'Visual arts and storytelling sessions',
        description: 'Creative conversations that foreground African identity, memory, visual culture and contemporary storytelling.',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        alt: 'African visual arts and cultural storytelling gathering',
      },
      {
        title: 'Youth-led creative market and community exchange',
        description: 'A space for emerging creatives and artisans to connect with audiences, partners and future collaborators.',
        image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80',
        alt: 'African creative market and community exchange',
      },
    ],
  },
  {
    title: 'African Legends United',
    image: '/images/african-legends.webp',
    alt: 'Football players standing together on a field',
    summary: 'A sport, mentorship and legacy platform centred on youth development, diplomatic exchange and football culture.',
    tone: 'forest',
    items: [
      {
        title: 'Legends lounge and mentorship sessions',
        description: 'A gathering where sports icons and emerging talent share lessons on discipline, leadership and long-term growth.',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
        alt: 'African football legends in a mentorship session',
      },
      {
        title: 'Youth football clinics and talent pathways',
        description: 'Structured coaching and development moments that create pathways for young players across the continent.',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        alt: 'African youth football clinic and coaching session',
      },
      {
        title: 'Sports diplomacy and community impact conversations',
        description: 'A strategic space for discussing sport as a driver of unity, development, health, and pan-African belonging.',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
        alt: 'African community sports diplomacy conversation',
      },
    ],
  },
];
