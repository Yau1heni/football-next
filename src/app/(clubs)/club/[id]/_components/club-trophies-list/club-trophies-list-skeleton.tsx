'use client';

import { ContentContainer } from '@components/content-container';
import { Skeleton } from '@components/ui/skeleton';
import type { FC } from 'react';

import styles from './club-trophies-list.module.scss';

const SKELETON_ITEMS_COUNT = 4;

export const ClubTrophiesListSkeleton: FC = () => (
  <ContentContainer title={'Трофеи'}>
    <div className={styles.clubTrophiesList}>
      {Array.from({ length: SKELETON_ITEMS_COUNT }, (_, i) => (
        <Skeleton
          key={i}
          variant={'rectangular'}
          width={160}
          height={120}
          className={styles.trophyBlock}
        />
      ))}
    </div>
  </ContentContainer>
);
