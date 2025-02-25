import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <h2>오늘의 집회 및 시위 일정을 확인해보세요!</h2>
            <p>
                건의사항이 있으신가요?&nbsp;
                <Link
                    href="https://forms.gle/yVCSNEFvB6rA95QW7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    Google 설문 링크
                </Link>
            </p>
            <p>
                문의 :&nbsp;
                <a href="mailto:eye.on.korea25@google.com" className={styles.email}>
                    eye.on.korea25@google.com
                </a>
            </p>
        </footer>
    );
}
