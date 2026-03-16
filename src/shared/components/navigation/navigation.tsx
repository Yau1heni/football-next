'use client';

import { Typography } from '@components/ui/typography';
import { navigationConfig } from '@configs/navigation-config';
import { useAuthContext } from '@contexts/auth';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC, MouseEvent } from 'react';
import { toast } from 'react-toastify/unstyled';

import styles from './navigation.module.scss';

export type NavigationProps = {
  className?: string;
  /** Вариант для отображения в панели бургер-меню (колонка, стили ссылок) */
  variant?: 'default' | 'panel';
};

export const Navigation: FC<NavigationProps> = ({ className, variant = 'default' }) => {
  const { isAuthenticated } = useAuthContext();
  const pathname = usePathname();

  const isPanel = variant === 'panel';
  const finallyClassName = cn(styles.navigation, isPanel && styles.navigationPanel, className);
  const linkClassName = isPanel ? styles.navigationPanelLink : undefined;

  const handleProtectedClick = (event: MouseEvent<HTMLAnchorElement>, requiresAuth?: boolean) => {
    if (!requiresAuth) {
      return;
    }

    if (isAuthenticated) {
      return;
    }

    event.preventDefault();
    toast.info('Вы пытаетесь перейти в раздел, доступный только авторизованным пользователям.');
  };

  const navList = navigationConfig.map(({ title, to }, i) => (
    <Link
      key={i}
      href={to}
      className={linkClassName}
      onClick={(event) => handleProtectedClick(event, navigationConfig[i]?.requiresAuth)}
    >
      <Typography color={pathname === to ? 'accent' : 'primary'} view="p-16">
        {title}
      </Typography>
    </Link>
  ));

  return <nav className={finallyClassName}>{navList}</nav>;
};
