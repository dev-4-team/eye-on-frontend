import { useEffect } from 'react';
import debounce from 'lodash.debounce';

export default function useViewportHeightSetter() {
    const setScreenSize = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    useEffect(() => {
        setScreenSize();

        const handleResize = debounce(() => {
            setScreenSize();
        }, 250);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            handleResize.cancel();
        };
    }, []);
}
