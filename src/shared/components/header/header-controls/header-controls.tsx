'use client';

import { authApi } from '@api/auth-api';
import { ThemeToggle } from '@components/theme-toggle';
import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import { Typography } from '@components/ui/typography';
import { routes } from '@configs/routes';
import { useAuthContext } from '@contexts/auth';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

export const HeaderControls: FC = () => {
  const { user, isLoading: isUserLoading, isAuthenticated } = useAuthContext();
  const username = user?.displayName;
  const router = useRouter();

  const displayName = isAuthenticated ? (username ?? 'unknown') : '';

  const handleLogout = async () => {
    await authApi.logOut();
  };

  return (
    <>
      <ThemeToggle />
      {isUserLoading && <Skeleton variant="text" width={80} height={20} />}
      {!isUserLoading && displayName && <Typography>{displayName}</Typography>}
      {isAuthenticated ? (
        <Button loading={isUserLoading} onClick={handleLogout}>
          Выйти
        </Button>
      ) : (
        <Button loading={isUserLoading} onClick={() => router.push(routes.login.mask)}>
          Войти
        </Button>
      )}
    </>
  );
};
