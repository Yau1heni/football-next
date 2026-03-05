'use client';

import { Skeleton } from '@components/ui/skeleton';
import type { FC } from 'react';

import styles from './page-title.module.scss';

export const PageTitleSkeleton: FC = () => (
  <div className={styles.pageTitle}>
    <Skeleton variant={'rectangular'} width={80} height={44} className={styles.goBack} />
    <Skeleton variant={'text'} width={'60%'} height={44} />
  </div>
);
