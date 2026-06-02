import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false })
        .limit(5);

      if (error) throw error;
      return NextResponse.json(data || [], { status: 200 });
    } else {
      // Mock Data
      return NextResponse.json([
        { title: 'Interim Results 2026', date: '2026-05-15', category: 'Financial', type: 'PDF' },
        { title: 'Acquisition of Roodepoort Asset', date: '2026-04-10', category: 'SENS', type: 'Link' },
        { title: 'Dividend Declaration', date: '2026-03-22', category: 'Financial', type: 'PDF' }
      ], { status: 200 });
    }
  } catch (error) {
    console.error('API Route Error /api/investors/announcements:', error);
    return NextResponse.json({ error: 'Failed to retrieve announcements' }, { status: 500 });
  }
}
