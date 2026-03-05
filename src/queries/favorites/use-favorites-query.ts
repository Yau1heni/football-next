import { favoritesApi } from '@api/favorites-api';
import { STALE_TIME_MS } from '@constants/queries';
import { useQuery } from '@tanstack/react-query';

import { getFavoritesQueryKeys } from './keys';

export const useFavoritesQuery = (userId: string) =>
  useQuery<string[], Error>({
    queryKey: getFavoritesQueryKeys(userId),
    enabled: !!userId,
    queryFn: () => favoritesApi.getAllIds(userId),
    staleTime: STALE_TIME_MS,
  });
