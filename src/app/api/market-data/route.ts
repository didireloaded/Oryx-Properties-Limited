import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET() {
  try {
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Supabase is not configured' },
        { status: 503 }
      );
    }

    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .eq('id', 'ORY')
      .single();

    if (error) {
      console.error('Supabase error fetching market data:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve market data' },
        { status: 500 }
      );
    }

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
  } catch (error) {
    console.error('API Route Error /api/market-data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve market data' },
      { status: 500 }
    );
  }
}
