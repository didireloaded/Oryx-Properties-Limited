"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Download, Eye, FileText, Search, Filter, TrendingUp, BarChart3, PieChart, Calendar, Mail, Phone, MapPin, ChevronDown, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

function CountUp({ to, suffix = '', prefix = '', decimals = 0 }: { to: number; suffix?: string, prefix?: string, decimals?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const animation = animate(count, to, { duration: 2, type: 'tween', ease: 'easeOut' });
    return animation.stop;
  }, [to]);

  useEffect(() => {
    return rounded.on('change', v => setDisplay(v));
  }, [rounded]);

  return <span>{prefix}{display}{suffix}</span>;
}

// Data structures
const performanceData = [
  { year: '2020', value: 3.8, marketCap: 1.1, occupancy: 90.5 },
  { year: '2021', value: 4.0, marketCap: 1.2, occupancy: 92.1 },
  { year: '2022', value: 4.2, marketCap: 1.3, occupancy: 93.8 },
  { year: '2023', value: 4.5, marketCap: 1.45, occupancy: 95.2 },
  { year: '2024', value: 4.699, marketCap: 1.538, occupancy: 97.6 }
];

const dividendData = [
  { year: 2024, interim: 54.00, final: 54.00, total: 108.00, yield: 9.8 },
  { year: 2023, interim: 51.25, final: 54.00, total: 105.25, yield: 9.5 },
  { year: 2022, interim: 48.00, final: 53.00, total: 101.00, yield: 9.2 },
  { year: 2021, interim: 45.00, final: 49.50, total: 94.50, yield: 8.9 },
];

const annualReports = [
  { year: 2024, title: 'Integrated Annual Report 2024', summary: 'Resilience and sustainable growth in a dynamic market environment.' },
  { year: 2023, title: 'Integrated Annual Report 2023', summary: 'Solidifying our core portfolio and expanding into new nodes.' },
  { year: 2022, title: 'Integrated Annual Report 2022', summary: 'Navigating post-pandemic recovery with strategic acquisitions.' },
  { year: 2021, title: 'Integrated Annual Report 2021', summary: 'Maintaining stability and protecting shareholder value.' }
];

const documents = [
  { title: 'King IV Corporate Governance Report 2024', type: 'Governance', date: '12 OCT 2024' },
  { title: 'Notice of Annual General Meeting', type: 'Shareholder Info', date: '05 OCT 2024' },
  { title: 'SENS: Dealing in Securities by a Director', type: 'Announcement', date: '28 SEP 2024' },
  { title: 'Property Valuation Summary FY2024', type: 'Financials', date: '15 AUG 2024' },
  { title: 'Interim Results Presentation H1 2024', type: 'Presentations', date: '10 MAR 2024' },
  { title: 'SENS: Trading Statement', type: 'Announcement', date: '01 MAR 2024' },
];

const calendarEvents = [
  { date: '15 Nov 2024', title: 'Annual General Meeting', type: 'AGM' },
  { date: '01 Mar 2025', title: 'Interim Results Announcement', type: 'Financials' },
  { date: '15 Mar 2025', title: 'Interim Dividend Payment', type: 'Dividend' },
  { date: '05 Sep 2025', title: 'Annual Results Announcement', type: 'Financials' },
];

const mockHistoricalData = {
  '1D': [{ date: '09:00', price: 4.65 }, { date: '10:00', price: 4.66 }, { date: '11:00', price: 4.68 }, { date: '12:00', price: 4.67 }, { date: '13:00', price: 4.69 }, { date: '14:00', price: 4.70 }, { date: '15:00', price: 4.68 }],
  '5D': [{ date: 'Mon', price: 4.60 }, { date: 'Tue', price: 4.62 }, { date: 'Wed', price: 4.65 }, { date: 'Thu', price: 4.63 }, { date: 'Fri', price: 4.68 }],
  '1M': Array.from({ length: 30 }, (_, i) => ({ date: `Day ${i+1}`, price: 4.50 + Math.sin(i/3) * 0.2 + (i/30)*0.2 })),
  '6M': Array.from({ length: 6 }, (_, i) => ({ date: `Month ${i+1}`, price: 4.20 + (i/6)*0.5 + Math.random()*0.1 })),
  '1Y': Array.from({ length: 12 }, (_, i) => ({ date: `Month ${i+1}`, price: 4.00 + (i/12)*0.8 + Math.random()*0.2 })),
  '5Y': [{ date: '2020', price: 3.80 }, { date: '2021', price: 4.00 }, { date: '2022', price: 4.20 }, { date: '2023', price: 4.50 }, { date: '2024', price: 4.69 }],
  'ALL': [{ date: '2015', price: 2.50 }, { date: '2018', price: 3.20 }, { date: '2021', price: 4.00 }, { date: '2024', price: 4.69 }],
};

export default function InvestorCentre() {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [docFilter, setDocFilter] = useState('All');
  
  const [marketData, setMarketData] = useState<any>(null);
  const [chartPeriod, setChartPeriod] = useState<string>('1M');

  useEffect(() => {
    fetch('/api/market-data')
      .then(res => res.json())
      .then(data => setMarketData(data))
      .catch(console.error);
  }, []);

  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = docFilter === 'All' || doc.type === docFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, docFilter]);

  const docTypes = ['All', ...Array.from(new Set(documents.map(d => d.type)))];

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px', position: 'relative' }}>
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        
        {/* HERO SECTION */}
        <section style={{ padding: '8rem 0 4rem 0' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ maxWidth: '800px' }}>
              <div style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                 Dedicated Terminal
              </div>
              <h1 style={{ fontSize: '5rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '1.5rem', lineHeight: 1.05 }}>
                Investor Centre
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '600px' }}>
                Explore Oryx Properties Limited's financial performance, portfolio growth, governance, and shareholder information.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2025 PERFORMANCE DASHBOARD (BENTO GRID) */}
        <section style={{ paddingBottom: '6rem' }}>
          <div className="container">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '0.5rem' }}>2025 Performance Dashboard</h2>
                <div style={{ color: 'var(--accent-gold)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Year Ended 30 June 2025</div>
              </div>
            </div>

            <div className="bento-grid">
              
              {/* Portfolio Value - Expands */}
              <motion.div 
                layoutId="metric-portfolio"
                onClick={() => setActiveMetric(activeMetric === 'portfolio' ? null : 'portfolio')}
                className={`glass-card-premium bento-item group ${activeMetric === 'portfolio' ? 'bento-col-span-2 bento-row-span-2' : 'bento-col-span-2'}`}
                style={{ padding: '2rem', cursor: 'pointer', position: 'relative' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Property Portfolio Value</div>
                  <div style={{ fontSize: '3.5rem', color: 'var(--accent-gold)', fontWeight: 300, lineHeight: 1, marginBottom: 'auto' }}>
                    <CountUp prefix="N$" to={4.699} decimals={3} />B
                  </div>
                  
                  <AnimatePresence>
                    {activeMetric === 'portfolio' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginTop: '2rem', borderTop: '1px solid var(--border-glass)', paddingTop: '2rem', overflow: 'hidden' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Portfolio Allocation</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}><span style={{ color: 'var(--text-light)' }}>Retail</span><span style={{ color: 'var(--accent-gold)' }}>62%</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}><span style={{ color: 'var(--text-light)' }}>Industrial</span><span style={{ color: 'var(--accent-gold)' }}>24%</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}><span style={{ color: 'var(--text-light)' }}>Office</span><span style={{ color: 'var(--accent-gold)' }}>11%</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}><span style={{ color: 'var(--text-light)' }}>Residential</span><span style={{ color: 'var(--accent-gold)' }}>3%</span></div>
                            </div>
                          </div>
                          <div style={{ flex: 1, height: '150px' }}>
                             <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                <LineChart data={performanceData}>
                                  <Line type="monotone" dataKey="value" stroke="var(--accent-gold)" strokeWidth={2} dot={false} />
                                </LineChart>
                             </ResponsiveContainer>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Share Price (Live) */}
              <motion.div className="glass-card-premium bento-item group" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Share Price (NSX:ORY)</span>
                  <span style={{ fontSize: '0.65rem', padding: '2px 6px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981', borderRadius: '4px' }}>LIVE</span>
                </div>
                {marketData ? (
                  <>
                    <div style={{ fontSize: '3.5rem', color: 'var(--text-light)', fontWeight: 300, lineHeight: 1 }}>
                      N$ {marketData.metrics.currentPrice.toFixed(2)}
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div style={{ color: marketData.metrics.dailyChangePercent >= 0 ? '#10B981' : '#EF4444', fontSize: '1.25rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {marketData.metrics.dailyChangePercent >= 0 ? '▲' : '▼'} {Math.abs(marketData.metrics.dailyChangePercent).toFixed(1)}%
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'right' }}>
                        Vol: {(marketData.metrics.volume / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300 }}>Loading...</div>
                )}
              </motion.div>

              {/* Market Cap */}
              <motion.div className="glass-card-premium bento-item" style={{ padding: '2rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Market Capitalisation</div>
                <div style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300, lineHeight: 1 }}>
                  {marketData ? (
                    <>N$ {marketData.metrics.marketCap.toFixed(3)}B</>
                  ) : (
                    <><CountUp prefix="N$" to={1.538} decimals={3} />B</>
                  )}
                </div>
              </motion.div>

              {/* NAV */}
              <motion.div className="glass-card-premium bento-item" style={{ padding: '2rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Net Asset Value</div>
                <div style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300, lineHeight: 1 }}>
                  <CountUp prefix="N$" to={2.584} decimals={3} />B
                </div>
              </motion.div>

              {/* Distribution */}
              <motion.div className="glass-card-premium bento-item bento-col-span-2" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Total Distribution</div>
                    <div style={{ fontSize: '3rem', color: 'var(--text-light)', fontWeight: 300, lineHeight: 1 }}>
                      <CountUp to={108} decimals={1} /> <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>cents per unit</span>
                    </div>
                  </div>
                  <TrendingUp size={48} strokeWidth={1} color="var(--accent-gold)" style={{ opacity: 0.5 }} />
                </div>
              </motion.div>

              {/* Small Metrics */}
              <motion.div className="glass-card-premium bento-item" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Net Rental Growth</div>
                <div style={{ fontSize: '2rem', color: 'var(--text-light)', fontWeight: 300 }}><CountUp to={10} decimals={1} suffix="%" /></div>
              </motion.div>

              <motion.div className="glass-card-premium bento-item" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Gearing Ratio</div>
                <div style={{ fontSize: '2rem', color: 'var(--text-light)', fontWeight: 300 }}><CountUp to={40.8} decimals={1} suffix="%" /></div>
              </motion.div>

              <motion.div className="glass-card-premium bento-item" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Funding Cost</div>
                <div style={{ fontSize: '2rem', color: 'var(--text-light)', fontWeight: 300 }}><CountUp to={9.5} decimals={1} suffix="%" /></div>
              </motion.div>

              <motion.div className="glass-card-premium bento-item" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Interest Cover Ratio</div>
                <div style={{ fontSize: '2rem', color: 'var(--text-light)', fontWeight: 300 }}><CountUp to={2.1} decimals={1} suffix="x" /></div>
              </motion.div>

              <motion.div className="glass-card-premium bento-item" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Vacancy Rate</div>
                <div style={{ fontSize: '2rem', color: 'var(--text-light)', fontWeight: 300 }}><CountUp to={2.4} decimals={1} suffix="%" /></div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* INTERACTIVE SHARE PERFORMANCE */}
        <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border-glass)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '0.5rem' }}>Share Performance</h2>
                <p style={{ color: 'var(--text-muted)' }}>Interactive historical pricing data</p>
              </div>
              
              {/* Time Filters */}
              <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                {['1D', '5D', '1M', '6M', '1Y', '5Y', 'ALL'].map(period => (
                  <button 
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    style={{ 
                      padding: '0.5rem 1rem', 
                      backgroundColor: chartPeriod === period ? 'var(--accent-gold)' : 'transparent', 
                      color: chartPeriod === period ? 'var(--bg-primary)' : 'var(--text-muted)', 
                      border: 'none', 
                      borderRadius: '4px', 
                      fontSize: '0.875rem', 
                      fontWeight: 600, 
                      cursor: 'pointer', 
                      transition: 'all 0.2s' 
                    }}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card-premium" style={{ height: '450px', padding: '2.5rem' }}>
              {marketData ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={marketData.historical ? marketData.historical[chartPeriod] : mockHistoricalData[chartPeriod as keyof typeof mockHistoricalData]}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-gold)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="var(--accent-gold)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-glass)" />
                    <XAxis dataKey="date" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} minTickGap={30} />
                    <YAxis domain={['auto', 'auto']} stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `N$${val.toFixed(2)}`} width={80} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'var(--text-light)' }} 
                      itemStyle={{ color: 'var(--accent-gold)', fontWeight: 600 }}
                      formatter={(value: any) => [`N$ ${Number(value).toFixed(2)}`, 'Price']}
                      labelStyle={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}
                    />
                    <Area type="monotone" dataKey="price" stroke="var(--accent-gold)" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" animationDuration={1000} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                  Loading market data...
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PORTFOLIO PERFORMANCE CHARTS */}
        <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '3rem' }}>Performance Trends</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              
              {/* Chart 1 */}
              <div className="glass-card-premium" style={{ padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-light)', marginBottom: '2rem' }}>Portfolio Value Growth (N$ Bn)</h3>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--accent-gold)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--accent-gold)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-glass)" />
                      <XAxis dataKey="year" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                      <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                      <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'var(--text-light)' }} itemStyle={{ color: 'var(--accent-gold)' }} />
                      <Area type="monotone" dataKey="value" stroke="var(--accent-gold)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2 */}
              <div className="glass-card-premium" style={{ padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-light)', marginBottom: '2rem' }}>Occupancy Trend (%)</h3>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-glass)" />
                      <XAxis dataKey="year" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                      <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[85, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'var(--text-light)' }} itemStyle={{ color: 'var(--accent-gold)' }} />
                      <Line type="monotone" dataKey="occupancy" stroke="var(--text-light)" strokeWidth={2} dot={{ fill: 'var(--bg-secondary)', stroke: 'var(--text-light)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: 'var(--accent-gold)', stroke: 'none' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* DIVIDEND CENTRE */}
        <section style={{ padding: '6rem 0', backgroundColor: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '3rem' }}>Dividend Centre</h2>
            
            <div className="glass-card-premium" style={{ padding: '3rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)', textAlign: 'left' }}>
                    <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Year</th>
                    <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Interim (cpu)</th>
                    <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Final (cpu)</th>
                    <th style={{ padding: '1rem', color: 'var(--accent-gold)', fontWeight: 500, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total (cpu)</th>
                    <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Dividend Yield</th>
                  </tr>
                </thead>
                <tbody>
                  {dividendData.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i !== dividendData.length - 1 ? '1px solid var(--border-glass)' : 'none', transition: 'background-color 0.2s' }} className="hover:bg-white/5">
                      <td style={{ padding: '1.5rem 1rem', color: 'var(--text-light)', fontSize: '1.125rem', fontWeight: 500 }}>{row.year}</td>
                      <td style={{ padding: '1.5rem 1rem', color: 'var(--text-light)' }}>{row.interim.toFixed(2)}</td>
                      <td style={{ padding: '1.5rem 1rem', color: 'var(--text-light)' }}>{row.final.toFixed(2)}</td>
                      <td style={{ padding: '1.5rem 1rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{row.total.toFixed(2)}</td>
                      <td style={{ padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>{row.yield.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ANNUAL REPORTS GALLERY */}
        <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--text-light)' }}>Annual Reports</h2>
              <a href="#" style={{ color: 'var(--accent-gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                View Archive <ArrowRight size={16} />
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
              {annualReports.map((report, i) => (
                <div key={i} className="group" style={{ cursor: 'pointer' }}>
                  <div style={{ width: '100%', aspectRatio: '1/1.4', backgroundColor: 'rgba(15,20,35,0.8)', borderRadius: '12px', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Placeholder for Cover Image */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, var(--bg-secondary), var(--bg-primary))', opacity: 0.5 }}></div>
                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
                      <div style={{ fontSize: '3rem', color: 'var(--accent-gold)', fontWeight: 300, opacity: 0.3 }}>{report.year}</div>
                    </div>

                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', transition: 'opacity 0.3s' }} className="group-hover:opacity-100 z-10">
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)', border: 'none', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }} className="hover:scale-110">
                          <Eye size={20} />
                        </button>
                        <button style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid var(--border-glass)', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }} className="hover:scale-110">
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.125rem', color: 'var(--text-light)', marginBottom: '0.5rem', fontWeight: 500 }}>{report.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{report.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOCUMENT LIBRARY */}
        <section style={{ padding: '6rem 0', backgroundColor: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '3rem' }}>Document Library</h2>
            
            <div className="glass-card-premium" style={{ padding: '2rem' }}>
              
              {/* Search & Filter Bar */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    placeholder="Search NENS announcements, governance, or financials..." 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                    style={{ width: '100%', padding: '1rem 1.5rem 1rem 4rem', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'var(--text-light)', fontSize: '1rem', outline: 'none' }} 
                  />
                </div>
                
                <div style={{ position: 'relative' }}>
                  <select 
                    value={docFilter}
                    onChange={e => setDocFilter(e.target.value)}
                    style={{ appearance: 'none', padding: '1rem 3rem 1rem 1.5rem', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'var(--text-light)', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
                  >
                    {docTypes.map(type => (
                      <option key={type} value={type} style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-light)' }}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} color="var(--text-muted)" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Document List */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <AnimatePresence>
                  {filteredDocs.map((doc, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, padding: 0 }}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: i !== filteredDocs.length - 1 ? '1px solid var(--border-glass)' : 'none', borderRadius: '8px', transition: 'background-color 0.2s', overflow: 'hidden' }} 
                      className="hover:bg-white/5"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText size={24} color="var(--accent-gold)" />
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>{doc.type}</div>
                          <h4 style={{ color: 'var(--text-light)', fontSize: '1.125rem', fontWeight: 500 }}>{doc.title}</h4>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{doc.date}</span>
                        <button style={{ background: 'none', border: '1px solid var(--border-glass)', padding: '0.5rem 1rem', borderRadius: '100px', color: 'var(--text-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', transition: 'all 0.2s' }} className="hover:border-accent-gold hover:text-accent-gold">
                          <Download size={14} /> Download
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredDocs.length === 0 && (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No documents found matching your criteria.
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* FINANCIAL CALENDAR & INVESTOR RELATIONS */}
        <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
              
              {/* Calendar */}
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Calendar color="var(--accent-gold)" /> Financial Calendar
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '2px solid var(--border-glass)', paddingLeft: '2rem' }}>
                  {calendarEvents.map((event, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '-2.45rem', top: '0.25rem', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)', border: '2px solid var(--bg-primary)' }}></div>
                      <div style={{ color: 'var(--accent-gold)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{event.date}</div>
                      <h4 style={{ color: 'var(--text-light)', fontSize: '1.125rem', fontWeight: 500 }}>{event.title}</h4>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{event.type}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investor Relations Contact */}
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '3rem' }}>Investor Relations</h2>
                
                <div className="glass-card-premium" style={{ padding: '3rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-light)', marginBottom: '1.5rem' }}>Get in Touch</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                    For any investor-related enquiries, please contact our dedicated Investor Relations team. We are committed to transparent and timely communication with our shareholders.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-light)' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}><Mail size={18} /></div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Us</div>
                        <div style={{ fontSize: '1rem' }}>investors@oryxproperties.com.na</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-light)' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}><Phone size={18} /></div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Call Us</div>
                        <div style={{ fontSize: '1rem' }}>+264 61 423 201</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-light)' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}><MapPin size={18} /></div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Office</div>
                        <div style={{ fontSize: '1rem' }}>Maerua Mall Office Tower, 2nd Floor</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
