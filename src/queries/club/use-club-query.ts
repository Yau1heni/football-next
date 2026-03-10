import { clubsApi } from '@api/clubs-api';
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
    throwOnError: true,
  });
