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

export const programmeExperiences = [
  {
    title: 'Startup Flames Arena',
    image: '/images/startup-flames.webp',
    alt: 'A startup founder presenting on stage',
    text: 'A proposed arena for startup pitches, investor matchmaking, business exhibitions, masterclasses, entrepreneurship and regional trade showcases.',
    tone: 'ochre',
  },
  {
    title: 'Heritage Waves Dome',
    image: '/images/heritage-waves.webp',
    alt: 'Performers celebrating African cultural heritage',
    text: 'A proposed home for African music, fashion, cultural exhibitions, visual arts, poetry, storytelling and creative expression.',
    tone: 'clay',
  },
  {
    title: 'African Legends United',
    image: '/images/african-legends.webp',
    alt: 'Football players standing together on a field',
    text: 'A proposed programme for sporting achievement, youth development, mentorship and sports diplomacy.',
    tone: 'forest',
  },
];
