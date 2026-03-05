'use client';

import { StateMessage } from '@components/state-message';
import type { Club } from '@shared-types/clubs.types';

import { ClubCard } from './club-card';
import styles from './clubs-list.module.scss';
import { ClubsListSkeleton } from './clubs-list-skeleton';

type ClubsListProps = {
  clubs: Club[];
  isLoading: boolean;
  isError: boolean;
  favoriteIds?: string[];
  onToggleFavoriteAction?: (clubId: string, isCurrentlyFavorite: boolean) => void;
  loadingClubId?: string | null;
};

export const ClubsList = (props: ClubsListProps) => {
  const {
    clubs,
    isError,
    isLoading,
    favoriteIds = [],
    onToggleFavoriteAction,
    loadingClubId = null,
  } = props;

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
        {clubs.map((club, index) => (
          <ClubCard
            key={club.id}
            club={club}
            isFavorite={favoriteIds.includes(club.id)}
            onToggleFavorite={onToggleFavoriteAction}
            isToggleLoading={loadingClubId === club.id}
            imageLoading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
    </div>
  );
};
