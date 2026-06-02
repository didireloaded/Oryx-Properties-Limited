import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import fallbackData from '@/data/timeline.json';

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
      console.warn("Supabase not configured — using local timeline data.");
      return fallbackData as TimelineEvent[];
    }

    try {
      const { data, error } = await supabase
        .from('timeline')
        .select('*')
        .order('year', { ascending: true });
        
      if (error) throw error;
      
      return (data && data.length > 0) ? data : fallbackData as TimelineEvent[];
    } catch (e) {
      console.error("Supabase Error fetching timeline:", e);
      return fallbackData as TimelineEvent[];
    }
  }
}
