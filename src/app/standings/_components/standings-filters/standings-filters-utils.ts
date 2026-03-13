import { COMPETITION_CODE, MATCH_VENUE } from '@constants/competitions';
import type { CompetitionCodeType } from '@shared-types/standings.types';
import type { FilterOption } from '@utils/filter-options';

const STANDINGS_SEASONS: number[] = [2023, 2024, 2025];

export const COMPETITION_OPTIONS: FilterOption[] = (
  Object.entries(COMPETITION_CODE) as [string, CompetitionCodeType][]
).map(([label, code]) => ({
  key: code,
  value: label,
}));

export const MATCH_VENUE_OPTIONS: FilterOption[] = Object.entries(MATCH_VENUE).map(
  ([label, value]) => ({
    key: value.toUpperCase(),
    value: label,
  })
);

export const SEASON_OPTIONS: FilterOption[] = STANDINGS_SEASONS.map((year) => ({
  key: String(year),
  value: `${year}/${year + 1}`,
}));
