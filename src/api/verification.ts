import { SERVER_URL, targetDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

export const getVerificationNumber = async (protestId: string) => {
  const response = await fetch(
    `${SERVER_URL}/api/protest/verifications?protestId=${protestId}&date=${targetDate}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(response.statusText);
  }

  const protests = await response.json();
  return protests.data[0];
};

export type getVerificationResponse = {
  success: boolean;
  message: string;
  status?: number;
  code?: string;
};

export const getVerifyLocation = async ({
  paramId,
  longitude,
  latitude,
  accessToken,
}: {
  paramId: string;
  longitude: number;
  latitude: number;
  accessToken: string;
}) => {
  const response = await fetch(`${SERVER_URL}/api/protest/${paramId}/participate/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ latitude, longitude }),
  });
  const data = await response.json();
  return data;
};
