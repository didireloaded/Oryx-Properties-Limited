import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  link: string;
  image: string;
  category: string;
  type: string;
}

export class NewsService {
  static async getNews(): Promise<NewsArticle[]> {
    if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
    const { data, error } = await supabase!.from('news').select('*').order('date', { ascending: false });
    if (error) throw error;
    return data || [];
  }
}
