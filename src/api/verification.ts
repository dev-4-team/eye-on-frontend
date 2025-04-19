import { SERVER_URL, targetDate } from '@/lib/utils';
import { ApiResponse } from '@/types/api';
import { VerificationNumber } from '@/types/protest';
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

  const protests = (await response.json()) as ApiResponse<VerificationNumber[]>;
  return protests.data[0];
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
  try {
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
  } catch (e) {
    throw e;
  }
};
