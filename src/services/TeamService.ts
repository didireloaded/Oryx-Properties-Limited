import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

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
    if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
    const { data, error } = await supabase!.from('team').select('*');
    if (error) throw error;
    return data || [];
  }
}
