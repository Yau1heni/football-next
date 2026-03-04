'use client';

import { Typography } from '@components/ui/typography';
import type { FC } from 'react';

import styles from './page-title.module.scss';

type PageTitleProps = {
  title: string;
};

export const PageTitle: FC<PageTitleProps> = ({ title }) => (
  <div className={styles.pageTitle}>
    <Typography maxLines={2} weight={'bold'} className={styles.title}>
      {title}
    </Typography>
  </div>
);
