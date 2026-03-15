import { tacticsApi } from '@api/tactics-api';
import { useQuery } from '@tanstack/react-query';

import { getTacticsListQueryKeys } from './keys';

export const useTacticsListQuery = (userId: string) =>
  useQuery({
    queryKey: getTacticsListQueryKeys(userId),
    queryFn: () => tacticsApi.getAll(userId),
    enabled: !!userId,
  });
