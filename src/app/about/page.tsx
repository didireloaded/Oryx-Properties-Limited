import { TeamService } from '@/services/TeamService';
import AboutClient from './AboutClient';

export const revalidate = 60; // Revalidate every 60 seconds in production


export default async function AboutPage() {
  let teamData: any[] = [];
  try {
    teamData = await TeamService.getTeam();
  } catch (error) {
    console.error("Failed to load team data:", error);
  }

  return <AboutClient teamData={teamData} />;
}
