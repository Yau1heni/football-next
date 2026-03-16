import { COMPETITION_CODE } from '@constants/competitions';
import { QUERY_PARAMS } from '@constants/query-params';
import type { CompetitionCodeType, OptionsCreateUrl } from '@shared-types/standings.types';

type StandingsSearchParams = Record<string, string | string[] | undefined>;

const getParamAsString = (value: string | string[] | undefined): string | undefined => {
  if (Array.isArray(value)) return value[0];
  return value;
};

export const getStandingsQueryOptionsFromSearchParams = (
  searchParams: StandingsSearchParams
): OptionsCreateUrl => {
  const competitionParam = getParamAsString(searchParams[QUERY_PARAMS.STANDINGS_COMPETITION]);
  const seasonParam = getParamAsString(searchParams[QUERY_PARAMS.STANDINGS_SEASON]);

  const options: OptionsCreateUrl = {};

  if (competitionParam) {
    const values = Object.values(COMPETITION_CODE) as CompetitionCodeType[];
    if (values.includes(competitionParam as CompetitionCodeType)) {
      options.code = competitionParam as CompetitionCodeType;
    }
  }

  if (seasonParam) {
    const season = Number(seasonParam);
    if (!Number.isNaN(season)) {
      options.season = season;
    }
  }

  return options;
};
