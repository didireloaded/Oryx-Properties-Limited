import { NewsService } from '@/services/NewsService';
import ArticleClient from './ArticleClient';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let article;
  
  try {
    const allNews = await NewsService.getNews();
    article = allNews.find(n => n.id.toString() === id);
  } catch (error) {
    console.error("Error fetching article details:", error);
  }

  if (!article) {
    notFound();
  }

  return <ArticleClient article={article} />;
}
