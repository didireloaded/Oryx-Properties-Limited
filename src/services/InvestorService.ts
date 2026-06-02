import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import fallbackDividends from '@/data/dividends.json';
import fallbackDocs from '@/data/investors_docs.json';
import fallbackEvents from '@/data/calendar_events.json';
import fallbackSectors from '@/data/sectors.json';
import fallbackGrowth from '@/data/historical_growth.json';

export class InvestorService {
  static async getDividends() {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn("Supabase not configured — using local dividends data.");
      return fallbackDividends as any[];
    }
    try {
      const { data, error } = await supabase.from('dividends').select('*').order('year', { ascending: true });
      if (error) throw error;
      return (data && data.length > 0) ? data : fallbackDividends as any[];
    } catch (e) {
      console.error("Supabase Error fetching dividends:", e);
      return fallbackDividends as any[];
    }
  }

  static async getDocs() {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn("Supabase not configured — using local investor docs data.");
      return fallbackDocs as any[];
    }
    try {
      const { data, error } = await supabase.from('investors_docs').select('*').order('year', { ascending: false });
      if (error) throw error;
      return (data && data.length > 0) ? data : fallbackDocs as any[];
    } catch (e) {
      console.error("Supabase Error fetching docs:", e);
      return fallbackDocs as any[];
    }
  }

  static async getCalendarEvents() {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn("Supabase not configured — using local calendar events data.");
      return fallbackEvents as any[];
    }
    try {
      const { data, error } = await supabase.from('calendar_events').select('*');
      if (error) throw error;
      return (data && data.length > 0) ? data : fallbackEvents as any[];
    } catch (e) {
      console.error("Supabase Error fetching calendar events:", e);
      return fallbackEvents as any[];
    }
  }

  static async getSectors() {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn("Supabase not configured — using local sectors data.");
      return fallbackSectors as any[];
    }
    try {
      const { data, error } = await supabase.from('sectors').select('*');
      if (error) throw error;
      return (data && data.length > 0) ? data : fallbackSectors as any[];
    } catch (e) {
      console.error("Supabase Error fetching sectors:", e);
      return fallbackSectors as any[];
    }
  }

  static async getHistoricalGrowth() {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn("Supabase not configured — using local historical growth data.");
      return fallbackGrowth as any[];
    }
    try {
      const { data, error } = await supabase.from('historical_growth').select('*').order('year', { ascending: true });
      if (error) throw error;
      return (data && data.length > 0) ? data : fallbackGrowth as any[];
    } catch (e) {
      console.error("Supabase Error fetching historical growth:", e);
      return fallbackGrowth as any[];
    }
  }
}
