import type { OptionsCreateUrl } from '@shared-types/standings.types';

const FOOTBALL_API_BASE_URL = 'https://api.football-data.org/v4';

export const COMPETITION_CODE = {
  England: 'PL',
  Italy: 'SA',
  Germany: 'BL1',
  Netherlands: 'DED',
  Portugal: 'PPL',
  Spain: 'PD',
  France: 'FL1',
  Brazil: 'BSA',
  ['Championship England']: 'ELC',
} as const;

export const MATCH_VENUE = {
  Total: 'Total',
  Home: 'Home',
  Away: 'Away',
} as const;

const DEFAULT_SEASON = 2025;

export const STANDINGS_DATA_URL = {
  create: (options: OptionsCreateUrl) => {
    const { code = COMPETITION_CODE.England, season = DEFAULT_SEASON } = options;
    return `${FOOTBALL_API_BASE_URL}/competitions/${code}/standings?season=${season}`;
  },
};
