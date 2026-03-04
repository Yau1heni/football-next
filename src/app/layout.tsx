import { QueryProvider } from '@providers/query-provider';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';

const roboto = Roboto({
  variable: '--font-family',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Клубы | #iLoveThisGame',
  description: 'Список футбольных клубов',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.variable}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
