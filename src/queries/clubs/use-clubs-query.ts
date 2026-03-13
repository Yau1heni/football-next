import { clubsApi } from '@api/clubs-api';
import { getClubsQueryKeys } from '@queries/clubs/keys';
import type { GetClubsTypesenseOptions } from '@shared-types/clubs.types';
import { useQuery } from '@tanstack/react-query';

export const useClubsQuery = (options: GetClubsTypesenseOptions) =>
  useQuery({
    queryKey: getClubsQueryKeys(options),
    queryFn: () => clubsApi.getFromTypesense(options),
  });
