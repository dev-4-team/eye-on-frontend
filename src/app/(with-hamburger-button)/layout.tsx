import KakaoLogin from '@/components/KakaoLogin/KakaoLogin';
import ProtestList from '@/components/Protest/protest-list';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <KakaoLogin />
            <ProtestList />
            {children}
        </div>
    );
}
