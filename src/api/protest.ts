import { SERVER_URL, targetDate } from '@/lib/utils';
import { ApiResponse } from '@/types/api';
import { Protest } from '@/types/protest';
import { notFound } from 'next/navigation';

export const getProtestList = async (): Promise<Protest[]> => {
  const response = await fetch(`${SERVER_URL}/api/protest?date=${targetDate}`, {
    // next: { revalidate: 3600, tags: ['protestList'] },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = (await response.json()) as ApiResponse<Protest[]>;
  return data.data.map((protest: Protest) => ({
    ...protest,
    id: String(protest.id),
  }));
};

interface ProtestDetailRequest {
  protestId: string;
}

export const getProtestDetail = async ({ protestId }: ProtestDetailRequest): Promise<Protest> => {
  const response = await fetch(`${SERVER_URL}/api/protest/${protestId}`, {
    // next: { revalidate: 3600 },
    cache: 'no-store',
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as ApiResponse<Protest>;
  const protest = data.data;
  return {
    ...protest,
    id: String(protest.id),
  };
};
