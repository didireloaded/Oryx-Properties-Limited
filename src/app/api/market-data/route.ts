import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { MarketDataService } from '@/services/MarketDataService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Try Supabase first
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('market_data')
        .select('*')
        .eq('id', 'ORY')
        .single();

      if (!error && data) {
        // Transform to the format the home page expects
        const metrics = {
          currentPrice: data.price / 100, // Convert from cents to NAD
          dailyChange: data.change / 100,
          dailyChangePercent: data.change_pct,
          marketCap: data.market_cap / 1_000_000_000, // Convert to billions
          volume: data.volume,
          nav: data.nav,
          lastUpdated: data.updated_at,
        };

        return NextResponse.json(
          { metrics },
          {
            status: 200,
            headers: {
              'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
            },
          }
        );
      }

      // If Supabase query failed, fall through to simulated data
      if (error) {
        console.error('Supabase error fetching market data:', error);
      }
    }

    // Fallback: use the simulated market data service
    const simulatedData = await MarketDataService.getMarketData();
    return NextResponse.json(
      { metrics: simulatedData.metrics, historical: simulatedData.historical },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('API Route Error /api/market-data:', error);

    // Last resort: return simulated data even on error
    try {
      const simulatedData = await MarketDataService.getMarketData();
      return NextResponse.json(
        { metrics: simulatedData.metrics, historical: simulatedData.historical },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        { error: 'Failed to retrieve market data' },
        { status: 500 }
      );
    }
  }
}
