import { notFound } from 'next/navigation';

export default async function VerificationNumber({ protestId, date }: { protestId: string; date: string }) {
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
    const response = await fetch(`${SERVER_URL}/api/protest/verifications?protestId=${protestId}&date=${date}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        return <div>오류가 발생했습니다...</div>;
    }

    const protests = await response.json();

    return protests.data[0];
}
