import { SERVER_URL, targetDate } from '@/lib/utils';
import { Protest } from '@/types/protest';
import { notFound } from 'next/navigation';

export const getProtestList = async (): Promise<Protest[]> => {
  const response = await fetch(`${SERVER_URL}/api/protest?date=${targetDate}`, {
    next: { revalidate: 3600, tags: ['protestList'] },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.data;
};

interface ProtestDetailRequest {
  protestId: number;
}

export const getProtestDetail = async ({ protestId }: ProtestDetailRequest): Promise<Protest> => {
  const response = await fetch(`${SERVER_URL}/api/protest/${protestId}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(response.statusText);
  }

  const protest = await response.json();
  return protest.data;
};
