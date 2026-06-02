const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 1. Team Data
const LEADERSHIP = {
  directors: [
    { name: 'Vetumbuavi Mungunda', role: 'Independent Non-Executive Chairperson', bio: "Mr. Mungunda is a highly respected business leader in Namibia with extensive experience in the financial services sector. He serves as the Independent Non-executive Chairperson, providing strategic oversight and ensuring rigorous corporate governance for the fund.", image: '/images/team/vetumbuavi_mungunda.jpg' },
    { name: 'Ben Jooste', role: 'CEO and Executive Director', bio: "As CEO and Executive Director, Mr. Jooste leads the executive management team. He is responsible for the overall strategic direction, day-to-day operations, and driving sustainable growth for shareholders. Under his leadership, Oryx Properties has solidified its position as Namibia's premier listed property fund.", image: '/images/team/ben_jooste.jpg' },
    { name: 'Jenny Comalie', role: 'Independent Non-Executive Director, RNC Chairperson', bio: "Ms. Comalie brings deep financial and operational expertise to the Board. Her insights into strategic growth and risk management are instrumental in shaping Oryx Properties' long-term portfolio strategies.", image: '/images/team/jenny_comalie.jpg' },
    { name: 'Marius Muller', role: 'Independent Non-Executive Director, IC Chairperson', bio: "Mr. Muller possesses decades of experience in the real estate and property management industry. He provides critical guidance on asset acquisitions, valuations, and portfolio optimization.", image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Francis Heunis', role: 'Chief Financial Officer (CFO) and Executive Director', bio: "As CFO and Executive Director, Ms. Heunis oversees all financial aspects of the fund, including capital management, financial reporting, treasury, and investor relations. She plays a critical role in structuring financing for acquisitions and ensuring robust financial health.", image: '/images/team/francis_heunis.jpg' },
    { name: 'Stefan Hugo', role: 'Independent Non-Executive Director', bio: "Mr. Hugo brings robust financial, auditing, and corporate governance expertise to Oryx Properties, ensuring the highest standards of transparency and fiduciary responsibility.", image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Matthias Langheld', role: 'Independent Non-Executive Director', bio: "Mr. Langheld provides vital strategic input regarding property development, legal frameworks, and compliance within the Namibian real estate sector.", image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Toini Kondjeni Nkandi', role: 'Independent Non-Executive Director', bio: "Ms. Nkandi's expertise in public relations, stakeholder engagement, and strategic communications is invaluable in maintaining Oryx Properties' strong reputation and institutional relationships.", image: '/images/team/toini_nkandi.jpg' }
  ],
  executives: [
    { name: 'Ben Jooste', role: 'CEO and Executive Director', bio: "As CEO and Executive Director, Mr. Jooste leads the executive management team. He is responsible for the overall strategic direction, day-to-day operations, and driving sustainable growth for shareholders. Under his leadership, Oryx Properties has solidified its position as Namibia's premier listed property fund.", image: '/images/team/ben_jooste.jpg' },
    { name: 'Conrad Van Der Westhuizen', role: 'Chief Asset Manager', bio: "Mr. Van Der Westhuizen oversees the strategic asset management of the fund's entire portfolio. He ensures that all properties are optimized for maximum yield, tenant satisfaction, and long-term value preservation.", image: '/images/team/conrad_van_der_westhuizen.jpg' },
    { name: 'Francis Heunis', role: 'Chief Financial Officer (CFO) and Executive Director', bio: "As CFO and Executive Director, Ms. Heunis oversees all financial aspects of the fund, including capital management, financial reporting, treasury, and investor relations. She plays a critical role in structuring financing for acquisitions and ensuring robust financial health.", image: '/images/team/francis_heunis.jpg' },
    { name: 'Hannelie Van Der Merwe', role: 'Portfolio Manager', bio: "Ms. Van Der Merwe manages key segments of the property portfolio, ensuring high tenant retention and smooth day-to-day operations. Her hands-on approach ensures consistent rental income and operational excellence.", image: '/images/team/hannelie_van_der_merwe.jpg' },
    { name: 'Lourens Anderson', role: 'Asset Manager', bio: "Mr. Anderson works closely with the Chief Asset Manager to optimize building performance, oversee capital expenditure projects, and ensure the portfolio's physical assets are maintained to the highest standards.", image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Romanus Kampungu', role: 'Finance Manager', bio: "Mr. Kampungu leads the finance team, ensuring rigorous financial controls, accurate reporting, and compliance with statutory requirements, directly supporting the CFO in all financial matters.", image: '/images/team/romanus_kampungu.jpg' },
    { name: 'PJ Bergh', role: 'Chief Operating Officer', bio: "As COO, Mr. Bergh is responsible for the overall operational efficiency of Oryx Properties. He streamlines processes, implements strategic initiatives, and ensures the operational delivery aligns with the board's vision.", image: '/images/team/pj_bergh.jpg' },
    { name: 'Michelle Kapia', role: 'Portfolio Manager', bio: "Ms. Kapia oversees specific high-value nodes within the portfolio. Her expertise in tenant relations and lease negotiations ensures strong occupancy rates and stable yields across her managed assets.", image: '/images/team/michelle_kapia.jpg' }
  ],
  management: [
    { name: 'Ben Jooste', role: 'Chief Executive Officer', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop', bio: 'Ben brings over 20 years of real estate and corporate finance experience. He is responsible for the overall strategic direction of the fund and capital allocation.', quals: 'CA(SA), CFA Charterholder' },
    { name: 'Francis Heunis', role: 'Chief Financial Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop', bio: 'Francis manages the financial, treasury, and capital management operations of Oryx Properties. She ensures robust financial reporting to all stakeholders.', quals: 'BCom (Hons), CA(NAM)' },
    { name: 'Peter Grüttemeyer', role: 'Independent Non-Executive Chairman', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop', bio: 'Peter has extensive experience in corporate governance and statutory oversight within the Namibian financial sector.', quals: 'BCom, LLB' }
  ]
};

const teamData = [];
LEADERSHIP.directors.forEach(d => teamData.push({ ...d, category: 'directors' }));
LEADERSHIP.executives.forEach(d => teamData.push({ ...d, category: 'executives' }));
LEADERSHIP.management.forEach(d => teamData.push({ ...d, category: 'management' }));

fs.writeFileSync(path.join(dataDir, 'team.json'), JSON.stringify(teamData, null, 2));

// 2. News Data
const MARKET_ANNOUNCEMENTS = [
  { date: '12 OCT 2024', title: 'Declaration of Final Dividend for the year ended 30 June 2024', category: 'Financial Result' },
  { date: '28 SEP 2024', title: 'Audited Financial Results for the year ended 30 June 2024', category: 'Financial Result' },
  { date: '15 AUG 2024', title: 'Trading Statement regarding Financial Results', category: 'Trading Statement' },
  { date: '10 MAY 2024', title: 'Conclusion of Maerua Mall Expansion Phase 1', category: 'Corporate Action' },
  { date: '02 APR 2024', title: 'Appointment of New Independent Non-Executive Director', category: 'Board Change' },
  { date: '15 MAR 2024', title: 'Interim Financial Results for the six months ended 31 Dec 2023', category: 'Financial Result' },
];

const CORPORATE_NEWS = [
  { date: '20 NOV 2024', category: 'Development', title: 'Oryx Properties Breaks Ground on New Logistics Hub in Prosperita', excerpt: 'Strategic N$ 120 million investment set to expand the industrial portfolio, securing long-term yield in Namibia\'s primary logistics corridor.', image: '/images/portfolio/OryxProp_SM_PostTemplates-007-1-700x840.jpg' },
  { date: '05 OCT 2024', category: 'Sustainability', title: 'Maerua Mall Solar Rollout Exceeds FY2024 Generation Targets', excerpt: 'The Phase 2 solar installation has successfully reduced grid reliance by 32% during peak commercial hours, cementing Oryx\'s ESG commitments.', image: '/images/portfolio/Dagbreek-school-Fortitude-Property-Group-27-700x840.jpg' },
  { date: '18 AUG 2024', category: 'Strategic Acquisition', title: 'Finalization of Dunes Mall Acquisition Strengthens Coastal Presence', excerpt: 'The integration of the Walvis Bay regional asset into the Oryx portfolio immediately enhances the retail weighting and secures defensive revenue streams.', image: '/images/portfolio/Brand-X-Dunes-Mall_0145-min-700x840.jpg' }
];

const LATEST_ANNOUNCEMENTS = [
  { date: '15 Sep 2025', category: 'NENS', title: 'Audited Annual Results for the year ended 30 June 2025' },
  { date: '28 Aug 2025', category: 'Dividend', title: 'Declaration of Final Dividend of 52.50 cents per linked unit' },
  { date: '10 Jul 2025', category: 'Acquisition', title: 'Acquisition of Prime Retail Asset in Swakopmund' },
  { date: '05 Mar 2025', category: 'Results', title: 'Unaudited Interim Results for the six months ended 31 Dec 2024' }
];

const newsData = [...MARKET_ANNOUNCEMENTS.map(n => ({...n, type: 'market'})), ...CORPORATE_NEWS.map(n => ({...n, type: 'corporate'})), ...LATEST_ANNOUNCEMENTS.map(n => ({...n, type: 'latest'}))];
// To match schema: id, title, date (date parsing required or just store as string?), excerpt, link, image, category
// Schema date is DATE. So we must parse date strings to YYYY-MM-DD.
function parseDate(d) {
  const parts = d.split(' ');
  const m = {Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'}[parts[1].substring(0,3)];
  return `${parts[2]}-${m}-${parts[0].padStart(2, '0')}`;
}
const formattedNews = newsData.map(n => ({
  title: n.title,
  date: parseDate(n.date),
  excerpt: n.excerpt || '',
  link: n.link || '',
  image: n.image || '',
  category: n.category
}));
fs.writeFileSync(path.join(dataDir, 'news.json'), JSON.stringify(formattedNews, null, 2));

// 3. Dividends Data
const dividendData = [
  { year: 2019, dps: 42, yield: 7.2 },
  { year: 2020, dps: 38, yield: 6.8 },
  { year: 2021, dps: 40, yield: 6.9 },
  { year: 2022, dps: 45, yield: 7.5 },
  { year: 2023, dps: 48, yield: 7.8 },
  { year: 2024, dps: 50, yield: 8.1 },
  { year: 2025, dps: 52, yield: 8.3 },
];
fs.writeFileSync(path.join(dataDir, 'dividends.json'), JSON.stringify(dividendData, null, 2));

// 4. Annual Reports Data
const reports = [
  { year: 2025, title: 'Annual Report', category: 'annual', link: '#', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911&auto=format&fit=crop', size: '2.5MB' },
  { year: 2024, title: 'Annual Report', category: 'annual', link: '#', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2051&auto=format&fit=crop', size: '3.1MB' },
  { year: 2023, title: 'Annual Report', category: 'annual', link: '#', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', size: '2.8MB' },
];
fs.writeFileSync(path.join(dataDir, 'investors_docs.json'), JSON.stringify(reports, null, 2));

// 5. Calendar Events
const events = [
  { date: '15 Sep', title: 'Annual Results Release', description: 'Publication of audited financial statements for FY25.' },
  { date: '24 Oct', title: 'Dividend Payment Date', description: 'Final dividend payment to registered shareholders.' },
  { date: '28 Nov', title: 'Annual General Meeting', description: 'AGM held at Maerua Mall Office Tower, Windhoek.' },
  { date: '05 Mar', title: 'Interim Results Release', description: 'Unaudited results for the first half of FY26.' }
];
fs.writeFileSync(path.join(dataDir, 'calendar_events.json'), JSON.stringify(events, null, 2));

// 6. Sectors
const sectors = [
  { id: 'retail', name: 'Retail', share: 64, occ: 98, assets: 5, top: ['Maerua Mall', 'Dunes Mall', 'Baines Centre'] },
  { id: 'industrial', name: 'Industrial', share: 22, occ: 95, assets: 18, top: ['Prosperita Park', 'Lafrenz Industrial', 'Elisenheim'] },
  { id: 'office', name: 'Office', share: 10, occ: 88, assets: 3, top: ['Maerua Office Tower', 'Channel Life'] },
  { id: 'residential', name: 'Residential', share: 4, occ: 100, assets: 2, top: ['Urban Village', 'Maerua Residential'] }
];
fs.writeFileSync(path.join(dataDir, 'sectors.json'), JSON.stringify(sectors, null, 2));

// 7. Historical Growth
const historicalData = [
  { year: 2018, value: 2.1, cap: 0.8, occ: 92, div: 40, props: 18 },
  { year: 2019, value: 2.5, cap: 0.9, occ: 93, div: 42, props: 20 },
  { year: 2020, value: 2.8, cap: 1.0, occ: 91, div: 38, props: 22 },
  { year: 2021, value: 2.9, cap: 1.1, occ: 90, div: 40, props: 22 },
  { year: 2022, value: 3.2, cap: 1.2, occ: 94, div: 45, props: 24 },
  { year: 2023, value: 3.8, cap: 1.3, occ: 95, div: 48, props: 26 },
  { year: 2024, value: 4.2, cap: 1.4, occ: 95, div: 50, props: 27 },
  { year: 2025, value: 4.5, cap: 1.5, occ: 96, div: 52, props: 28 },
  { year: 2026, value: 4.7, cap: 1.5, occ: 96, div: 52.5, props: 28 }
];
fs.writeFileSync(path.join(dataDir, 'historical_growth.json'), JSON.stringify(historicalData, null, 2));

console.log("Extraction completed.");
