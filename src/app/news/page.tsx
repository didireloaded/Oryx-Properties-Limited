import { NewsService } from '@/services/NewsService';
import NewsClient from './NewsClient';

export const revalidate = 60; // Revalidate every 60 seconds in production


export default async function NewsPage() {
  let newsData: any[] = [];
  try {
    newsData = await NewsService.getNews();
  } catch (error) {
    console.error("Failed to load news data:", error);
  }

  return <NewsClient newsData={newsData} />;
}
