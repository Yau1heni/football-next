import { clubsApi } from '@api/clubs-api';
import { clientOptions } from '@configs/tanstack-query-config';
import { getClubsQueryKeys } from '@queries/clubs/keys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { ClubsPageContent } from './_components/clubs-page-content';
import { getClubsQueryOptionsFromSearchParams } from './_components/get-clubs-query-options';

export const metadata: Metadata = {
  title: 'Клубы | #iLoveThisGame',
  description: 'Список футбольных клубов',
};

type ClubsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ClubsPage = async ({ searchParams }: ClubsPageProps) => {
  const resolved = await searchParams;
  const queryClient = new QueryClient(clientOptions);

  const queryOptions = getClubsQueryOptionsFromSearchParams(resolved);

  // Skip prefetch when favoritesOnly — favoriteIds are only known client-side,
  // so the query key would never match and the prefetch would be wasted.
  if (!queryOptions.favoritesIds) {
    await queryClient.prefetchQuery({
      queryKey: getClubsQueryKeys(queryOptions),
      queryFn: () => clubsApi.getFromTypesense(queryOptions),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClubsPageContent />
    </HydrationBoundary>
  );
};

export default ClubsPage;
