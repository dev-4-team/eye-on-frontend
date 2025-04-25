import { SERVER_URL, targetDate } from '@/lib/utils';
import type { ApiResponse } from '@/types/api';
import type { VerificationNumber } from '@/types/protest';
import { notFound } from 'next/navigation';

interface getVerificationNumberRequest {
  protestId: string;
}

export const getVerificationNumber = async ({
  protestId,
}: getVerificationNumberRequest): Promise<VerificationNumber> => {
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

  const protest = (await response.json()) as ApiResponse<VerificationNumber[]>;
  if (!protest.data[0] || protest.data.length === 0) {
    notFound();
  }
  return protest.data[0];
};

interface getVerificationRequest {
  paramId: string;
  longitude: number;
  latitude: number;
  accessToken: string;
}

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
}: getVerificationRequest) => {
  const response = await fetch(`${SERVER_URL}/api/protest/${paramId}/participate/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ latitude, longitude }),
  });
  if (!response.ok) {
    throw new Error(`인증하기 실패 ${response.status}`);
  }
  const data = await response.json();
  return data;
};
