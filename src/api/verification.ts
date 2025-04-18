import { SERVER_URL, targetDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface getVerificationNumberRequest {
  protestId: number;
}

type getVerificationNumber = {
  protestId: number;
  verifiedNum: number;
};

export const getVerificationNumber = async ({
  protestId,
}: getVerificationNumberRequest): Promise<getVerificationNumber> => {
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

interface getVerificationRequest {
  paramId: number;
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
