import { notFound } from 'next/navigation';

export default async function ProtestDetail({ id }: { id: string }) {
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
    const response = await fetch(`${SERVER_URL}/api/protest/${id}`, { cache: 'force-cache' });

    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        return <div>오류가 발생했습니다...</div>;
    }

    const protest = await response.json();

    return protest.data;
}
