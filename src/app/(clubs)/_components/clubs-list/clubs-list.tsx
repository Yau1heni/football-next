'use client';

import { StateMessage } from '@components/state-message';
import { Club } from '@shared-types/clubs.types';

import { ClubCard } from './club-card';
import styles from './clubs-list.module.scss';
import { ClubsListSkeleton } from './clubs-list-skeleton';

type ClubsListProps = {
  clubs: Club[];
  isLoading: boolean;
  isError: boolean;
};

export const ClubsList = ({ clubs, isError, isLoading }: ClubsListProps) => {
  if (isError) {
    return <StateMessage variant={'error'} title={'Ошибка загрузки клубов'} />;
  }

  if (isLoading) {
    return <ClubsListSkeleton />;
  }

  if (clubs.length === 0) {
    return <StateMessage variant={'empty'} title={'Клубы не найдены'} />;
  }

  return (
    <div className={styles.clubsList}>
      <div className={styles.list}>
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
};
