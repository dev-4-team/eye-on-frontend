import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="kr">
            <body>
                <div>
                    <header>header</header>
                    <main>{children}</main>
                    <footer>footer</footer>
                </div>
            </body>
        </html>
    );
}
