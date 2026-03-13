'use client';

import { Container } from '@components/container';
import { Navigation } from '@components/navigation';
import { LogoIcon } from '@components/ui/icons/logo-icon';
import { Typography } from '@components/ui/typography';
import { routes } from '@configs/routes';
import Link from 'next/link';
import type { FC } from 'react';

import { BurgerMenu } from './burger-menu';
import styles from './header.module.scss';
import { HeaderControls } from './header-controls';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link href={routes.main.mask} className={styles.logo} aria-label="Логотип приложения">
            <LogoIcon />
            <Typography tag="span" view="p-20" weight="bold">
              #iLoveThisGame
            </Typography>
          </Link>
          <div className={styles.desktopNav} aria-label="Основная навигация">
            <Navigation />
          </div>
          <div className={styles.headerRight}>
            <div className={styles.desktopControls}>
              <HeaderControls />
            </div>
            <BurgerMenu>
              <Navigation variant="panel" />
              <div className={styles.burgerMenuControls}>
                <HeaderControls />
              </div>
            </BurgerMenu>
          </div>
        </div>
      </Container>
    </header>
  );
};
