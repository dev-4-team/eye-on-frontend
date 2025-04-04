import { notFound } from 'next/navigation';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;

const targetDate = process.env.NODE_ENV === 'development' ? '2025-03-15' : new Date().toISOString().split('T')[0];

export const getProtestList = async () => {
    const response = await fetch(`${SERVER_URL}/api/protest?date=${targetDate}`, { next: { revalidate: 3600 } });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
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
