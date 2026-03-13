'use client';

import { Loader } from '@components/ui/loader';
import { routes } from '@configs/routes';
import { useAuthContext } from '@contexts/auth';
import { useRouter } from 'next/navigation';
import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';

import styles from './protected-route.module.scss';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(routes.login.mask);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
