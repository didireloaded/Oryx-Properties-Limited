import { TimelineService } from '@/services/TimelineService';
import JourneyClient from './JourneyClient';

export default async function JourneyPage() {
  // Fetch timeline data from Supabase
  // In Next.js App Router, Server Components can directly await data
  let timelineData: any[] = [];
  try {
    timelineData = await TimelineService.getTimeline();
  } catch (error) {
    console.error("Failed to load timeline data for journey page:", error);
    // You could render an error state or a fallback here
  }

  return <JourneyClient timelineData={timelineData} />;
}
