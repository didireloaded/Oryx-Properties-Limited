import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import fallbackData from '@/data/news.json';

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  link: string;
  image: string;
  category: string;
  type: string;
  content?: string;
}

export class NewsService {
  static async getNews(): Promise<NewsArticle[]> {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn("Supabase not configured — using local news data.");
      // Add IDs to fallback data since JSON doesn't have them
      return (fallbackData as any[]).map((item, index) => ({
        id: index + 1,
        type: 'Article',
        excerpt: '',
        link: '',
        image: '',
        ...item,
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as NewsArticle[];
    }

    try {
      const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false });
      if (error) throw error;
      
      if (data && data.length > 0) return data;
      
      // Fallback if Supabase returns empty
      return (fallbackData as any[]).map((item, index) => ({
        id: index + 1,
        type: 'Article',
        excerpt: '',
        link: '',
        image: '',
        ...item,
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as NewsArticle[];
    } catch (e) {
      console.error("Supabase Error fetching news:", e);
      return (fallbackData as any[]).map((item, index) => ({
        id: index + 1,
        type: 'Article',
        excerpt: '',
        link: '',
        image: '',
        ...item,
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as NewsArticle[];
    }
  }
}
