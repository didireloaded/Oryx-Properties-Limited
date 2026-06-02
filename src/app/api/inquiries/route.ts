import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, phone, message } = body;

    if (!type || !name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{ type, name, email, phone, message }])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      return NextResponse.json({ success: true, data }, { status: 201 });
    } else {
      // Fallback if Supabase isn't configured, just return success
      console.log('Mock saving inquiry:', { type, name, email, phone, message });
      return NextResponse.json({ success: true, mock: true }, { status: 201 });
    }
  } catch (error) {
    console.error('API Route Error /api/inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
