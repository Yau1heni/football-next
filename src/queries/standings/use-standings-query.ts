import { standingsApi } from '@api/standings-api';
import { getStandingsQueryKeys } from '@queries/standings/keys';
import type { OptionsCreateUrl } from '@shared-types/standings.types';
import { useQuery } from '@tanstack/react-query';

export const useStandingsQuery = (options: OptionsCreateUrl = {}) =>
  useQuery({
    queryKey: getStandingsQueryKeys(options),
    queryFn: () => standingsApi.getByCompetition(options),
  });
