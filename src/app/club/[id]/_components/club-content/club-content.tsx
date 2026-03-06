'use client';

import { ClubLogo } from '@components/club-logo';
import { PageTitle } from '@components/page-title';
import { StateMessage } from '@components/state-message';
import { Button } from '@components/ui/button';
import { useFavoritesContext } from '@contexts/favorites';
import { useClubQuery } from '@queries/club';
import { useParams } from 'next/navigation';
import type { FC } from 'react';

import { ClubDescription } from '../club-description/club-description';
import { ClubHistory } from '../club-history/club-history';
import { ClubTrophiesList } from '../club-trophies-list/club-trophies-list';
import styles from './club-content.module.scss';
import { ClubContentSkeleton } from './club-content-skeleton';

export const ClubContent: FC = () => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : undefined;

  const { data: club, isLoading, isError } = useClubQuery(id);
  const { favoriteIds, toggleFavorite, isPending, loadingClubId } = useFavoritesContext();

  if (isError) {
    return <StateMessage variant={'error'} title={'Ошибка загрузки клуба'} />;
  }

  if (isLoading) {
    return <ClubContentSkeleton />;
  }

  if (!club) {
    return <StateMessage variant={'empty'} title={'Клуб не найден'} />;
  }

  const isFavorite = favoriteIds.includes(club.id);
  const isToggleLoading = loadingClubId === club.id;

  return (
    <div className={styles.clubContent}>
      <PageTitle title={club.name ?? 'Клуб'} teamColors={club.colors} showBack />
      <div className={styles.header}>
        <ClubLogo logo={club.logo} isFavorite={isFavorite} />
        <ClubDescription
          ground={club.ground}
          country={club.country}
          founded={club.founded}
          city={club.city}
          website={club.website}
          social={club.social}
        />
      </div>

      <Button
        variant={'primary'}
        disabled={isPending}
        loading={isToggleLoading}
        className={styles.favoriteButton}
        onClick={() => toggleFavorite(club.id, isFavorite, club.name ?? undefined)}
      >
        {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      </Button>

      {club.trophies.length > 0 && <ClubTrophiesList trophies={club.trophies} />}

      <ClubHistory text={club.history} />
    </div>
  );
};
