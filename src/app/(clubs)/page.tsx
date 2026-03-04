import { clubsApi } from '@api/clubs-api';
import { clientOptions } from '@configs/tanstack-query-config';
import { getClubsQueryKeys } from '@queries/clubs/keys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { ClubsPageContent } from './_components/clubs-page-content';
import { getClubsQueryOptionsFromSearchParams } from './_components/get-clubs-query-options';

type ClubsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ClubsPage = async ({ searchParams }: ClubsPageProps) => {
  const resolved = await searchParams;
  const queryClient = new QueryClient(clientOptions);

  const queryOptions = getClubsQueryOptionsFromSearchParams(resolved);

  await queryClient.prefetchQuery({
    queryKey: getClubsQueryKeys(queryOptions),
    queryFn: () => clubsApi.getFromTypesense(queryOptions),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClubsPageContent />
    </HydrationBoundary>
  );
};

export default ClubsPage;
