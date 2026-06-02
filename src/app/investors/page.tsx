import React from 'react';
import InvestorHero from '@/components/investors/InvestorHero';
import PerformanceDashboard from '@/components/investors/PerformanceDashboard';
import HealthDashboard from '@/components/investors/HealthDashboard';
import GrowthTimeline from '@/components/investors/GrowthTimeline';
import AssetPerformanceExplorer from '@/components/investors/AssetPerformanceExplorer';
import DividendCentre from '@/components/investors/DividendCentre';
import AnnualReports from '@/components/investors/AnnualReports';
import LatestAnnouncements from '@/components/investors/LatestAnnouncements';
import InvestorCalendar from '@/components/investors/InvestorCalendar';
import ManagementGovernance from '@/components/investors/ManagementGovernance';
import OryxAtAGlance from '@/components/investors/OryxAtAGlance';
import StockTicker from '@/components/investors/StockTicker';

import { InvestorService } from '@/services/InvestorService';
import { NewsService } from '@/services/NewsService';
import { TeamService } from '@/services/TeamService';

export const revalidate = 60; // Revalidate every 60 seconds in production


export const metadata = {
  title: 'Investor Centre - Oryx Properties',
  description: 'Investment performance dashboard, live metrics, and shareholder information for Oryx Properties.',
};


export default async function InvestorsPage() {
  const [
    historicalGrowth,
    sectors,
    dividends,
    reports,
    events,
    news,
    team
  ] = await Promise.all([
    InvestorService.getHistoricalGrowth().catch(() => []),
    InvestorService.getSectors().catch(() => []),
    InvestorService.getDividends().catch(() => []),
    InvestorService.getDocs().catch(() => []),
    InvestorService.getCalendarEvents().catch(() => []),
    NewsService.getNews().catch(() => []),
    TeamService.getTeam().catch(() => []),
  ]);

  const announcements = news.filter((n: any) => n.type === 'latest' || n.category === 'NENS' || n.category === 'Dividend' || n.category === 'Acquisition' || n.category === 'Results').slice(0, 4);
  const management = team.filter((t: any) => t.category === 'management');

  return (
    <main style={{ backgroundColor: '#0a0f19', minHeight: '100vh' }}>
      <StockTicker />
      <OryxAtAGlance />
      <InvestorHero />
      <PerformanceDashboard />
      
      {historicalGrowth.length > 0 && <GrowthTimeline historicalData={historicalGrowth} />}
      {sectors.length > 0 && <AssetPerformanceExplorer sectors={sectors} />}
      {dividends.length > 0 && <DividendCentre dividendData={dividends} />}
      
      <HealthDashboard />
      
      {reports.length > 0 && <AnnualReports reports={reports} />}
      {announcements.length > 0 && <LatestAnnouncements announcements={announcements} />}
      {events.length > 0 && <InvestorCalendar events={events} />}
      {management.length > 0 && <ManagementGovernance management={management} />}
    </main>
  );
}
