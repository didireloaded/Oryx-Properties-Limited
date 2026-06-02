import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return NextResponse.json(data || [], { status: 200 });
    } else {
      // Mock Data
      return NextResponse.json([
        { id: 1, title: 'Annual General Meeting', date: '2026-08-15', description: 'Virtual AGM for all shareholders.' },
        { id: 2, title: 'FY26 Results Presentation', date: '2026-09-05', description: 'Presentation of full year results.' }
      ], { status: 200 });
    }
  } catch (error) {
    console.error('API Route Error /api/investors/events:', error);
    return NextResponse.json({ error: 'Failed to retrieve events' }, { status: 500 });
  }
}
