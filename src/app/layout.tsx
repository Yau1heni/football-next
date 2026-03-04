import '@styles/styles.scss';

import { Container } from '@components/container';
import { Header } from '@components/header';
import { APP_ROOT_ID } from '@constants/app';
import { AuthProvider } from '@contexts/auth';
import { ThemeProvider } from '@contexts/theme';
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

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="ru">
    <body className={roboto.variable}>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider>
            <div id={APP_ROOT_ID}>
              <Header />
              <Container>{children}</Container>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </body>
  </html>
);

export default RootLayout;
