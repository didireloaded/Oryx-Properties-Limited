export interface PropertyTenant {
  name: string;
  gla: string;
}

export interface PropertySpace {
  unit: string;
  size: string;
  date: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  gla: string;
  occupancy: number;
  valuation: string;
  manager: string;
  description: string;
  image: string;
  wale?: string;
  yield?: string;
  available?: boolean;
  tenants: PropertyTenant[];
  availableSpaces: PropertySpace[];
}

export interface InvestorDocument {
  id: string;
  title: string;
  date: string;
  category: 'Annual Report' | 'Financial Results' | 'NENS Announcement' | 'Governance';
  fileUrl: string;
  year: number;
}

export interface LeadershipProfile {
  id: string;
  name: string;
  slug: string;
  role: string;
  category: 'director' | 'executive';
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  sortOrder: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface FundMetrics {
  portfolioValue: string;
  marketCap: string;
  occupancy: string;
  revenueGrowth: string;
  netRentalIncome: string;
  navPerShare: string;
  distributionPerShare: string;
}
