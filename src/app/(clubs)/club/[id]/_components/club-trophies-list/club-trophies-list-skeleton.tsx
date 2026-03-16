'use client';

import { ContentContainer } from '@components/content-container';
import { Skeleton } from '@components/ui/skeleton';
import type { FC } from 'react';

import styles from './club-trophies-list.module.scss';
import trophyItemStyles from './club-trophy-item/club-trophy-item.module.scss';

const SKELETON_ITEMS_COUNT = 4;

export const ClubTrophiesListSkeleton: FC = () => (
  <ContentContainer title={'Трофеи'}>
    <ul className={styles.clubTrophiesList}>
      {Array.from({ length: SKELETON_ITEMS_COUNT }, (_, i) => (
        <li key={i} className={trophyItemStyles.clubTrophyItem}>
          <Skeleton variant={'text'} width={'70%'} />
          <Skeleton variant={'rectangular'} width={72} height={28} />
        </li>
      ))}
    </ul>
  </ContentContainer>
);
