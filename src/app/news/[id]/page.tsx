import { NewsService } from '@/services/NewsService';
import ArticleClient from './ArticleClient';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: { id: string } }) {
  let article;
  
  try {
    const allNews = await NewsService.getNews();
    article = allNews.find(n => n.id.toString() === params.id);
  } catch (error) {
    console.error("Error fetching article details:", error);
  }

  if (!article) {
    notFound();
  }

  return <ArticleClient article={article} />;
}
