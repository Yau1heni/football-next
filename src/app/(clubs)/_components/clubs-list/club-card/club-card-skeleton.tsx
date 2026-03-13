'use client';

import { CardSkeleton } from '@components/ui/card';

import styles from './club-card.module.scss';

export const ClubCardSkeleton = () => (
  <div className={styles.clubCard}>
    <CardSkeleton isWithAction={true} imageClassName={styles.cardImageCompact} />
  </div>
);
