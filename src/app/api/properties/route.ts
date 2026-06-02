import { NextRequest, NextResponse } from 'next/server';
import { PropertiesService } from '@/services/PropertiesService';


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || undefined;
    const query = searchParams.get('query') || undefined;
    
    // Parse isLeasing safely
    const isLeasingParam = searchParams.get('isLeasing');
    let isLeasing: boolean | undefined = undefined;
    if (isLeasingParam === 'true') isLeasing = true;
    if (isLeasingParam === 'false') isLeasing = false;

    const data = await PropertiesService.getProperties({ type, query, isLeasing });
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('API Route Error /api/properties:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve properties data' },
      { status: 500 }
    );
  }
}
