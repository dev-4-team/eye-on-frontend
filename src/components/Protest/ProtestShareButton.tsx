'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { IoIosLink } from 'react-icons/io';

export const ProtestShareButton = () => {
    const [currentUrl, setCurrentUrl] = useState('');
    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const handleCopyUrl = () => {
        if (!currentUrl) return;
        navigator.clipboard
            .writeText(currentUrl)
            .then(() => {
                alert('클립보드에 복사되었습니다');
            })
            .catch((error) => {
                console.error('클립보드 복사 실패!', error);
            });
    };

    return (
        <Button className='flex bg-transparent text-black hover:bg-white' onClick={handleCopyUrl}>
            <span>시위 공유하기</span> <IoIosLink />
        </Button>
    );
};
