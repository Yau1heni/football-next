'use client';

import { START_PAGE } from '@constants/pagination';
import { QUERY_PARAMS } from '@constants/query-params';
import { useFavoritesContext } from '@contexts/favorites';
import type { GetClubsTypesenseOptions } from '@shared-types/clubs.types';
import { type FilterOption, getOptionByKey, getSelectedOptions } from '@utils/filter-options';
import { useRouter, useSearchParams } from 'next/navigation';

import { CLUB_COUNTRIES_OPTIONS, getClubsSortOptions } from './clubs-filters';
import { getClubsQueryOptionsFromSearchParams } from './get-clubs-query-options';

export const useClubsFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { favoriteIds } = useFavoritesContext();

  const setSearchParams = (updater: (prev: URLSearchParams) => URLSearchParams) => {
    const next = updater(new URLSearchParams(searchParams.toString()));
    router.replace(`?${next.toString()}`);
  };

  const applySearch = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set(QUERY_PARAMS.SEARCH, value);
        next.set(QUERY_PARAMS.PAGE, String(START_PAGE));
      } else next.delete(QUERY_PARAMS.SEARCH);
      return next;
    });
  };

  const setPage = (pageNum: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (pageNum) next.set(QUERY_PARAMS.PAGE, String(pageNum));
      else next.delete(QUERY_PARAMS.PAGE);
      return next;
    });
  };

  const sort = searchParams.get(QUERY_PARAMS.SORT) ?? '';
  const sortOption = getOptionByKey(sort, getClubsSortOptions);
  const setSortOption = (option: FilterOption | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (option?.key) next.set(QUERY_PARAMS.SORT, option.key);
      else next.delete(QUERY_PARAMS.SORT);
      next.set(QUERY_PARAMS.PAGE, String(START_PAGE));
      return next;
    });
  };

  const countriesRaw = searchParams.get(QUERY_PARAMS.COUNTRIES);
  const countries = countriesRaw ? countriesRaw.split(',').filter(Boolean) : [];
  const countriesOptions = getSelectedOptions(countries, CLUB_COUNTRIES_OPTIONS);
  const setCountriesOptions = (options: FilterOption[]) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const values = options.map((o) => o.value);
      if (values.length) next.set(QUERY_PARAMS.COUNTRIES, values.join(','));
      else next.delete(QUERY_PARAMS.COUNTRIES);
      next.set(QUERY_PARAMS.PAGE, String(START_PAGE));
      return next;
    });
  };

  const favoritesOnly = searchParams.get(QUERY_PARAMS.FAVORITES_ONLY) === 'true';
  const setFavoritesOnly = (value: boolean) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(QUERY_PARAMS.FAVORITES_ONLY, 'true');
      else next.delete(QUERY_PARAMS.FAVORITES_ONLY);
      next.set(QUERY_PARAMS.PAGE, String(START_PAGE));
      return next;
    });
  };

  const resetFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete(QUERY_PARAMS.SEARCH);
      next.delete(QUERY_PARAMS.SORT);
      next.delete(QUERY_PARAMS.COUNTRIES);
      next.delete(QUERY_PARAMS.FAVORITES_ONLY);
      next.delete(QUERY_PARAMS.PAGE);
      return next;
    });
  };

  const searchParamsRecord = Object.fromEntries(searchParams.entries()) as Record<
    string,
    string | string[] | undefined
  >;
  const queryOptions: GetClubsTypesenseOptions = getClubsQueryOptionsFromSearchParams(
    searchParamsRecord,
    favoriteIds
  );

  return {
    queryOptions,
    sortOption,
    countriesOptions,
    favoritesOnly,
    applySearch,
    setPage,
    setSortOption,
    setCountriesOptions,
    setFavoritesOnly,
    resetFilters,
  };
};
