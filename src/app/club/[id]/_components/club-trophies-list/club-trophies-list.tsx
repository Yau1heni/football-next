'use client';

import { ContentContainer } from '@components/content-container';
import type { FC } from 'react';

import styles from './club-trophies-list.module.scss';
import { ClubTrophyItem } from './club-trophy-item/club-trophy-item';

type ClubTrophiesListProps = {
  trophies: { name: string; count: number }[];
};

export const ClubTrophiesList: FC<ClubTrophiesListProps> = ({ trophies }) => {
  if (trophies.length === 0) return null;

  return (
    <ContentContainer title={'Трофеи'}>
      <ul className={styles.clubTrophiesList}>
        {trophies.map((trophy, i) => (
          <ClubTrophyItem key={i} trophy={trophy} />
        ))}
      </ul>
    </ContentContainer>
  );
};
