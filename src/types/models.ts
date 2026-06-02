export interface Sector {
  id: string;
  name: string;
  share: number;
  occ: number;
  assets: number;
  top: string[];
}

export interface Dividend {
  year: number;
  dps: number;
  yield: number;
}

export interface HistoricalData {
  year: number;
  value: number;
  cap: number;
  occ: number;
  div: number;
  props: number;
}

export interface Event {
  title: string;
  date: string;
  description: string;
}

export interface Announcement {
  title: string;
  date: string;
  category: string;
  type?: string;
  url?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  image: string;
  bio?: string;
  quals?: string;
}

export interface Report {
  year: number;
  title: string;
  type: string;
  url: string;
}

export interface MarketData {
  id: string;
  price: number;
  change: number;
  change_pct: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  prev_close: number;
  market_cap: number;
  nav: number;
  updated_at: string;
}
