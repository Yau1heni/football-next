'use client';

import { PageTitle } from '@components/page-title';
import { Pagination } from '@components/pagination';
import { PAGINATION_LIMIT } from '@constants/pagination';
import { useFavoritesContext } from '@contexts/favorites';
import { useClubsQuery } from '@queries/clubs';
import { useCallback } from 'react';

import { ClubsFilters } from './clubs-filters/clubs-filters';
import { ClubsList } from './clubs-list/clubs-list';
import { useClubsFilters } from './use-clubs-filters';

export const ClubsPageContent = () => {
  const { queryOptions, setPage } = useClubsFilters();
  const { data, isLoading, isError } = useClubsQuery(queryOptions);
  const { favoriteIds, isFavoritesLoading, toggleFavorite, loadingClubId } = useFavoritesContext();

  const handleToggleFavorite = useCallback(
    (clubId: string, isCurrentlyFavorite: boolean, clubName?: string) =>
      toggleFavorite(clubId, isCurrentlyFavorite, clubName),
    [toggleFavorite]
  );

  return (
    <>
      <PageTitle title={'Клубы'} />
      <ClubsFilters />
      <ClubsList
        clubs={data?.clubsData ?? []}
        isLoading={isLoading || isFavoritesLoading}
        isError={isError}
        favoriteIds={favoriteIds}
        onToggleFavoriteAction={handleToggleFavorite}
        loadingClubId={loadingClubId}
      />
      {data != null && data.found > PAGINATION_LIMIT && (
        <Pagination page={queryOptions.page} total={data.found} onChangeAction={setPage} />
      )}
    </>
  );
};
