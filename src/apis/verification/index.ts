import { notFound } from 'next/navigation';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
const targetDate = process.env.NODE_ENV === 'development' ? '2025-03-15' : new Date().toISOString().split('T')[0];

export const getVerificationNumber = async (protestId: string) => {
    const response = await fetch(`${SERVER_URL}/api/protest/verifications?protestId=${protestId}&date=${targetDate}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        throw new Error(response.statusText);
    }

    const protests = await response.json();
    return protests.data[0];
};
