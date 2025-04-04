import Link from 'next/link';
import { Single_Day } from 'next/font/google';
import styles from './Header.module.css';
import KakaoLogin from '@/components/KakaoLogin/KakaoLogin';

const singleDay = Single_Day({ weight: '400' });

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href={'/'} className={`${singleDay.className} ${styles.logo}`}>
                <span className={styles.normalText}>주</span>
                <span className={styles.smallText}>변</span>
                <span className={styles.normalText}>시</span>
                <span className={styles.smallText}>위</span> <span className={styles.smallText}>Now</span>
            </Link>
            <KakaoLogin />
        </header>
    );
}
