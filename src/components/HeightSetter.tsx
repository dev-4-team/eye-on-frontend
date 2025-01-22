'use client';

import useViewportHeightSetter from '@/hooks/useViewportHeightSetter';

export default function HeightSetter({ children }: { children: React.ReactNode }) {
    useViewportHeightSetter();

    return <main>{children}</main>;
}
