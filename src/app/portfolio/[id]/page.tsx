import { PropertiesService } from '@/services/PropertiesService';
import PropertyDetailClient from './PropertyDetailClient';
import { notFound } from 'next/navigation';

export default async function PropertyPage({ params }: { params: { id: string } }) {
  let property;

  try {
    property = await PropertiesService.getPropertyById(params.id);
  } catch (error) {
    console.error("Error fetching property details:", error);
  }

  if (!property) {
    notFound();
  }

  return <PropertyDetailClient property={property} />;
}
