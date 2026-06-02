import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export class PropertiesService {
  static async getProperties(params?: { type?: string; query?: string; isLeasing?: boolean }) {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error("Supabase is not configured.");
    }

    try {
      let queryBuilder = supabase.from('properties').select('*');

      if (params) {
        if (params.type) {
          queryBuilder = queryBuilder.eq('type', params.type);
        }
        if (typeof params.isLeasing === 'boolean') {
          queryBuilder = queryBuilder.eq('isLeasing', params.isLeasing);
        }
        if (params.query) {
          const q = `%${params.query}%`;
          queryBuilder = queryBuilder.or(`name.ilike.${q},location.ilike.${q},description.ilike.${q}`);
        }
      }

      const { data, error } = await queryBuilder;
      if (error) throw error;
      
      return data || [];
    } catch (e) {
      console.error("Supabase Error fetching properties:", e);
      throw e;
    }
  }

  static async getPropertyById(id: string) {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error("Supabase is not configured.");
    }

    try {
      const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error("Supabase Error fetching property by ID:", e);
      throw e;
    }
  }
}
