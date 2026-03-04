'use client';

import { Typography } from '@components/ui/typography';
import { navigationConfig } from '@configs/navigation-config';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import styles from './navigation.module.scss';

export type NavigationProps = {
  className?: string;
  /** Вариант для отображения в панели бургер-меню (колонка, стили ссылок) */
  variant?: 'default' | 'panel';
};

export const Navigation: FC<NavigationProps> = ({ className, variant = 'default' }) => {
  const pathname = usePathname();

  const isPanel = variant === 'panel';
  const finallyClassName = cn(styles.navigation, isPanel && styles.navigationPanel, className);
  const linkClassName = isPanel ? styles.navigationPanelLink : undefined;

  const navList = navigationConfig.map(({ title, to }, i) => (
    <Link key={i} href={to} className={linkClassName}>
      <Typography color={pathname === to ? 'accent' : 'primary'} view="p-16">
        {title}
      </Typography>
    </Link>
  ));

  return <nav className={finallyClassName}>{navList}</nav>;
};
