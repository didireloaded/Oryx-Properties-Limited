import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export class InvestorService {
  static async getDividends() {
    if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
    const { data, error } = await supabase!.from('dividends').select('*').order('year', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  static async getDocs() {
    if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
    const { data, error } = await supabase!.from('investors_docs').select('*').order('year', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async getCalendarEvents() {
    if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
    const { data, error } = await supabase!.from('calendar_events').select('*');
    if (error) throw error;
    return data || [];
  }

  static async getSectors() {
    if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
    const { data, error } = await supabase!.from('sectors').select('*');
    if (error) throw error;
    return data || [];
  }

  static async getHistoricalGrowth() {
    if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
    const { data, error } = await supabase!.from('historical_growth').select('*').order('year', { ascending: true });
    if (error) throw error;
    return data || [];
  }
}
