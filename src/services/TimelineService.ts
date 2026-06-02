import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export interface TimelineEvent {
  year: number;
  value: number;
  formattedValue: string;
  event: string;
  impact: string;
  isMilestone: boolean;
}

export class TimelineService {
  static async getTimeline(): Promise<TimelineEvent[]> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error("Supabase is not configured.");
    }

    try {
      const { data, error } = await supabase
        .from('timeline')
        .select('*')
        .order('year', { ascending: true });
        
      if (error) throw error;
      
      return data || [];
    } catch (e) {
      console.error("Supabase Error fetching timeline:", e);
      throw e;
    }
  }
}
