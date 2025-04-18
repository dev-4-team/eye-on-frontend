import { SERVER_URL } from '@/lib/utils';

interface ProtestCheerCountRequest {
  protestId: number;
}
interface ProtestCheerCount {
  protestId: number;
  cheerCount: number;
}

export const ProtestCheerCount = async ({
  protestId,
}: ProtestCheerCountRequest): Promise<ProtestCheerCount> => {
  const response = await fetch(`${SERVER_URL}/api/cheer/protest/${protestId}`);
  if (!response.ok) {
    throw new Error(`시위별 응원수 가져오기 error ${response.status}`);
  }
  const data = await response.json();
  return data.data;
};
