'use client';

import { ClubCardSkeleton } from './club-card';
import styles from './clubs-list.module.scss';

const SKELETON_CARD_COUNT = 8;

export const ClubsListSkeleton = () => (
  <div className={styles.clubsList}>
    <div className={styles.list}>
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
        <ClubCardSkeleton key={index} />
      ))}
    </div>
  </div>
);
