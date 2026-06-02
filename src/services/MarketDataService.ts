export interface MarketMetrics {
  currentPrice: number;
  dailyChange: number;
  dailyChangePercent: number;
  marketCap: number; // in Billions
  week52High: number;
  week52Low: number;
  volume: number;
  dividendYield: number;
  lastUpdated: string;
}

export interface HistoricalDataPoint {
  date: string;
  price: number;
}

export interface HistoricalChartData {
  '1D': HistoricalDataPoint[];
  '5D': HistoricalDataPoint[];
  '1M': HistoricalDataPoint[];
  '6M': HistoricalDataPoint[];
  '1Y': HistoricalDataPoint[];
  '5Y': HistoricalDataPoint[];
  'ALL': HistoricalDataPoint[];
}

export interface MarketDataPayload {
  metrics: MarketMetrics;
  historical: HistoricalChartData;
}

// In-memory cache for development
let cachedData: MarketDataPayload | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export class MarketDataService {
  /**
   * Fetches the latest market data.
   * Currently uses a realistic simulated feed as a fallback/mock for MarketScreener, 
   * ensuring stable data without being blocked by anti-bot measures.
   * Because of this abstraction, we can seamlessly swap this with a real API later.
   */
  static async getMarketData(): Promise<MarketDataPayload> {
    const now = Date.now();
    
    // Return cached data if valid
    if (cachedData && (now - lastFetchTime < CACHE_DURATION_MS)) {
      return cachedData;
    }

    try {
      // In a real implementation, this would be:
      // const response = await fetch('https://api.marketscreener.com/...');
      // const data = await response.json();
      
      // We simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const simulatedData = this.generateSimulatedData();
      
      cachedData = simulatedData;
      lastFetchTime = now;
      
      return simulatedData;
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      if (cachedData) return cachedData; // Fallback to stale cache
      throw new Error('Market data unavailable');
    }
  }

  private static generateSimulatedData(): MarketDataPayload {
    const basePrice = 11.45; // N$
    
    // Generate realistic chart data
    const generatePoints = (days: number, volatility: number) => {
      const points: HistoricalDataPoint[] = [];
      let currentPrice = basePrice * (1 - (Math.random() * 0.2 - 0.1)); // Start slightly off base
      const now = new Date();
      
      for (let i = days; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        
        // Random walk
        currentPrice = currentPrice * (1 + (Math.random() * volatility - volatility / 2));
        
        points.push({
          date: d.toISOString().split('T')[0],
          price: Number(currentPrice.toFixed(2))
        });
      }
      
      // Ensure the last point is exactly the base price
      points[points.length - 1].price = basePrice;
      return points;
    };

    // 1D needs hourly data, so slightly different generator
    const generateIntraday = () => {
      const points: HistoricalDataPoint[] = [];
      let price = 11.25; // open
      const now = new Date();
      now.setHours(9, 0, 0, 0); // Market open
      
      for (let i = 0; i <= 8; i++) { // 9am to 5pm
        const d = new Date(now);
        d.setHours(9 + i);
        price = price * (1 + (Math.random() * 0.02 - 0.01));
        points.push({
          date: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: Number(price.toFixed(2))
        });
      }
      points[points.length - 1].price = basePrice;
      return points;
    };

    return {
      metrics: {
        currentPrice: basePrice,
        dailyChange: 0.20,
        dailyChangePercent: 1.8,
        marketCap: 1.538,
        week52High: 12.10,
        week52Low: 9.80,
        volume: 42500,
        dividendYield: 9.4,
        lastUpdated: new Date().toISOString()
      },
      historical: {
        '1D': generateIntraday(),
        '5D': generatePoints(5, 0.02),
        '1M': generatePoints(30, 0.04),
        '6M': generatePoints(180, 0.06),
        '1Y': generatePoints(365, 0.08),
        '5Y': generatePoints(365 * 5, 0.12),
        'ALL': generatePoints(365 * 10, 0.15)
      }
    };
  }
}
