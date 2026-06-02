import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import fallbackData from '@/data/properties.json';

export class PropertiesService {
  private static getLocalProperties(params?: { type?: string; query?: string; isLeasing?: boolean }) {
    let results = fallbackData as any[];

    if (params) {
      if (params.type) {
        results = results.filter(p => p.type === params.type);
      }
      if (typeof params.isLeasing === 'boolean') {
        results = results.filter(p => p.isLeasing === params.isLeasing);
      }
      if (params.query) {
        const q = params.query.toLowerCase();
        results = results.filter(p =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.location && p.location.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
        );
      }
    }

    return results;
  }

  static async getProperties(params?: { type?: string; query?: string; isLeasing?: boolean }) {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn("Supabase not configured — using local properties data.");
      return this.getLocalProperties(params);
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
      
      return (data && data.length > 0) ? data : this.getLocalProperties(params);
    } catch (e) {
      console.error("Supabase Error fetching properties:", e);
      return this.getLocalProperties(params);
    }
  }

  static async getPropertyById(id: string) {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn("Supabase not configured — using local property data.");
      const property = (fallbackData as any[]).find(p => p.id === id);
      return property || null;
    }

    try {
      const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error("Supabase Error fetching property by ID:", e);
      // Fallback to local data
      const property = (fallbackData as any[]).find(p => p.id === id);
      return property || null;
    }
  }
}
