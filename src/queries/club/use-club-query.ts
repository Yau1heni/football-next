import { clubsApi } from '@api/clubs-api';
import { STALE_TIME_MS } from '@constants/queries';
import { getClubQueryKeys } from '@queries/club/keys';
import { useQuery } from '@tanstack/react-query';

export const useClubQuery = (id: string | undefined) =>
  useQuery({
    queryKey: getClubQueryKeys(id),
    enabled: !!id,
    queryFn: () => {
      if (!id) throw new Error('Club id is required');
      return clubsApi.getClub(id);
    },
    staleTime: STALE_TIME_MS,
  });
