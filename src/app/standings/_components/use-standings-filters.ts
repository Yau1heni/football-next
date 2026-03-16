'use client';

import { QUERY_PARAMS } from '@constants/query-params';
import type { CompetitionCodeType, OptionsCreateUrl } from '@shared-types/standings.types';
import type { FilterOption } from '@utils/filter-options';
import { getOptionByKey } from '@utils/filter-options';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import {
  COMPETITION_OPTIONS,
  MATCH_VENUE_OPTIONS,
  SEASON_OPTIONS,
} from './standings-filters/standings-filters-utils';

export const useStandingsFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const setSearchParams = (updater: (prev: URLSearchParams) => URLSearchParams) => {
    const next = updater(new URLSearchParams(searchParams.toString()));
    startTransition(() => {
      router.replace(`?${next.toString()}`);
    });
  };

  const competitionRaw =
    searchParams.get(QUERY_PARAMS.STANDINGS_COMPETITION) ?? COMPETITION_OPTIONS[0]?.key ?? '';
  const competitionOption: FilterOption | null =
    getOptionByKey(competitionRaw, COMPETITION_OPTIONS) ?? COMPETITION_OPTIONS[0] ?? null;

  const setCompetitionOption = (option: FilterOption | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (option?.key) next.set(QUERY_PARAMS.STANDINGS_COMPETITION, option.key);
      else next.delete(QUERY_PARAMS.STANDINGS_COMPETITION);
      return next;
    });
  };

  const matchVenueRaw =
    searchParams.get(QUERY_PARAMS.STANDINGS_VENUE) ?? MATCH_VENUE_OPTIONS[0]?.key ?? '';
  const matchVenueOption: FilterOption | null =
    getOptionByKey(matchVenueRaw, MATCH_VENUE_OPTIONS) ?? MATCH_VENUE_OPTIONS[0] ?? null;

  const setMatchVenueOption = (option: FilterOption | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (option?.key) next.set(QUERY_PARAMS.STANDINGS_VENUE, option.key);
      else next.delete(QUERY_PARAMS.STANDINGS_VENUE);
      return next;
    });
  };

  const seasonRaw = searchParams.get(QUERY_PARAMS.STANDINGS_SEASON) ?? SEASON_OPTIONS[0]?.key ?? '';
  const seasonOption: FilterOption | null =
    getOptionByKey(seasonRaw, SEASON_OPTIONS) ?? SEASON_OPTIONS[0] ?? null;

  const setSeasonOption = (option: FilterOption | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (option?.key) next.set(QUERY_PARAMS.STANDINGS_SEASON, option.key);
      else next.delete(QUERY_PARAMS.STANDINGS_SEASON);
      return next;
    });
  };

  const queryOptions: OptionsCreateUrl = {
    ...(competitionOption ? { code: competitionOption.key as CompetitionCodeType } : {}),
    ...(seasonOption ? { season: Number(seasonOption.key) } : {}),
  };

  const matchVenueType = matchVenueOption?.key ?? MATCH_VENUE_OPTIONS[0]?.key ?? '';

  return {
    queryOptions,
    competitionOption,
    setCompetitionOption,
    matchVenueOption,
    setMatchVenueOption,
    seasonOption,
    setSeasonOption,
    matchVenueType,
    isPending,
  };
};
