import { PropertiesService } from '@/services/PropertiesService';
import PropertyDetailClient from './PropertyDetailClient';
import { notFound } from 'next/navigation';

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let property;

  try {
    property = await PropertiesService.getPropertyById(id);
  } catch (error) {
    console.error("Error fetching property details:", error);
  }

  if (!property) {
    notFound();
  }

  return <PropertyDetailClient property={property} />;
}
