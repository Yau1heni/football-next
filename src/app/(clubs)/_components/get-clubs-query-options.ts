import { START_PAGE } from '@constants/pagination';
import { QUERY_PARAMS } from '@constants/query-params';
import type { GetClubsTypesenseOptions } from '@shared-types/clubs.types';

type SearchParamsLike = Record<string, string | string[] | undefined>;

/** Нормализует значение search-параметра (строка или массив) в одну строку. */
const getParamString = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/** Собирает опции запроса клубов из URL searchParams и списка избранных id. */
export const getClubsQueryOptionsFromSearchParams = (
  searchParams: SearchParamsLike,
  favoriteIds: string[] = []
): GetClubsTypesenseOptions => {
  const searchTerm = getParamString(searchParams[QUERY_PARAMS.SEARCH]) ?? '';

  const rawPage = getParamString(searchParams[QUERY_PARAMS.PAGE]);
  const page = rawPage ? Math.max(START_PAGE, parseInt(rawPage, 10)) : START_PAGE;

  const sort = getParamString(searchParams[QUERY_PARAMS.SORT]);
  const countriesRaw = getParamString(searchParams[QUERY_PARAMS.COUNTRIES]);
  const countries = countriesRaw ? countriesRaw.split(',').filter(Boolean) : [];

  const favoritesOnly = getParamString(searchParams[QUERY_PARAMS.FAVORITES_ONLY]) === 'true';

  return {
    page,
    searchTerm,
    ...(sort && { sort }),
    ...(countries.length > 0 && { countries }),
    ...(favoritesOnly && { favoritesIds: favoriteIds }),
  };
};
