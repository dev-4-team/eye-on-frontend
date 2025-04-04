import { SERVER_URL } from '@/lib/utils';

export const ProtestsCheerCount = async () => {
    const response = await fetch(`${SERVER_URL}/api/cheer/protest`);
    const data = await response.json();
    return data;
};

export const ProtestCheerCount = async (protestId: string) => {
    const response = await fetch(`${SERVER_URL}/api/cheer/protest/${protestId}`);
    const data = await response.json();
    return data;
};
