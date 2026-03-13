import { STANDINGS_DATA_URL } from '@constants/competitions';
import { QUERY_PARAMS } from '@constants/query-params';
import { OptionsCreateUrl, StandingsData } from '@shared-types/standings.types';

import { fetchWithErrorHandling } from './fetch-client';

const REVALIDATE_TIME_S = 60 * 5; // 5 minutes

const FOOTBALL_PROXY_PATH = process.env.API_FOOTBALL_PROXY_PATH ?? '/api/standings';

const buildStandingsProxyUrl = (options: OptionsCreateUrl): string => {
  const params = new URLSearchParams();
  if (options.code) params.set(QUERY_PARAMS.STANDINGS_COMPETITION, options.code);
  if (options.season != null) params.set(QUERY_PARAMS.STANDINGS_SEASON, String(options.season));
  const queryString = params.toString();
  return queryString ? `${FOOTBALL_PROXY_PATH}?${queryString}` : FOOTBALL_PROXY_PATH;
};

export const standingsApi = {
  getByCompetition: async (options: OptionsCreateUrl): Promise<StandingsData> => {
    if (typeof window === 'undefined') {
      return fetchWithErrorHandling(STANDINGS_DATA_URL.create(options), {
        headers: { 'X-Auth-Token': process.env.API_FOOTBALL || '' },
        next: { revalidate: REVALIDATE_TIME_S },
      });
    }

    const url = buildStandingsProxyUrl(options);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Не удалось загрузить турнирную таблицу');
    }
    return response.json();
  },
};
