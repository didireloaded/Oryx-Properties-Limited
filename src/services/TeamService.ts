import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import fallbackData from '@/data/team.json';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  bio: string;
  quals?: string;
  image: string;
}

export class TeamService {
  static async getTeam(): Promise<TeamMember[]> {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn("Supabase not configured — using local team data.");
      return (fallbackData as any[]).map((item, index) => ({
        id: index + 1,
        ...item,
      })) as TeamMember[];
    }

    try {
      const { data, error } = await supabase.from('team').select('*');
      if (error) throw error;
      
      if (data && data.length > 0) return data;
      
      return (fallbackData as any[]).map((item, index) => ({
        id: index + 1,
        ...item,
      })) as TeamMember[];
    } catch (e) {
      console.error("Supabase Error fetching team:", e);
      return (fallbackData as any[]).map((item, index) => ({
        id: index + 1,
        ...item,
      })) as TeamMember[];
    }
  }
}
