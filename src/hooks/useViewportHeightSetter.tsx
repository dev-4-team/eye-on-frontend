import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export default function useViewportHeightSetter() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        setScreenSize();

        const handleResize = debounce(() => {
            setScreenSize();
        }, 250);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            handleResize.cancel();
        };
    }, [isClient]);
}
