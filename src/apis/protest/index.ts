import { SERVER_URL, targetDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

export const getProtestList = async () => {
    const response = await fetch(`${SERVER_URL}/api/protest?date=${targetDate}`, { next: { revalidate: 3600 } });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data.data;
};

export const getProtestDetail = async (id: string) => {
    const response = await fetch(`${SERVER_URL}/api/protest/${id}`, { next: { revalidate: 3600 } });

    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        throw new Error(response.statusText);
    }

    const protest = await response.json();
    return protest.data;
};

export const getProtestInfos = async () => {
    const response = await fetch(`${SERVER_URL}/api/protest?date=${targetDate}`, { next: { revalidate: 3600 } });
    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        throw new Error(response.statusText);
    }
    const protests = await response.json();
    return protests.data;
};
