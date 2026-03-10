'use client';

import { PageTitle } from '@components/page-title';
import { Pagination } from '@components/pagination';
import { PAGINATION_LIMIT } from '@constants/pagination';
import { useFavoritesContext } from '@contexts/favorites';
import { useClubsQuery } from '@queries/clubs';

import { ClubsFilters } from './clubs-filters/clubs-filters';
import { ClubsList } from './clubs-list/clubs-list';
import { useClubsFilters } from './use-clubs-filters';

export const ClubsPageContent = () => {
  const {
    queryOptions,
    setPage,
    sortOption,
    setSortOption,
    countriesOptions,
    setCountriesOptions,
    favoritesOnly,
    setFavoritesOnly,
    applySearch,
    resetFilters,
    isPending,
  } = useClubsFilters();
  const { data, isLoading, isError } = useClubsQuery(queryOptions);
  const { favoriteIds, isFavoritesLoading, toggleFavorite, loadingClubId } = useFavoritesContext();

  const isListLoading = isPending || isLoading || isFavoritesLoading;

  return (
    <>
      <PageTitle title={'Клубы'} />
      <ClubsFilters
        searchTerm={queryOptions.searchTerm}
        sortOption={sortOption}
        countriesOptions={countriesOptions}
        favoritesOnly={favoritesOnly}
        onApplySearchAction={applySearch}
        onSetSortOptionAction={setSortOption}
        onSetCountriesOptionsAction={setCountriesOptions}
        onSetFavoritesOnlyAction={setFavoritesOnly}
        onResetFiltersAction={resetFilters}
      />
      <ClubsList
        clubs={data?.clubsData ?? []}
        isLoading={isListLoading}
        isError={isError}
        favoriteIds={favoriteIds}
        onToggleFavoriteAction={toggleFavorite}
        loadingClubId={loadingClubId}
      />
      {data != null && data.found > PAGINATION_LIMIT && (
        <Pagination page={queryOptions.page} total={data.found} onChangeAction={setPage} />
      )}
    </>
  );
};
