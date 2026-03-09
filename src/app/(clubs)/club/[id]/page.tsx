import { cachedClubsApi } from '@api/cached-clubs-api';
import { clientOptions } from '@configs/tanstack-query-config';
import { getClubQueryKeys } from '@queries/club/keys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { ClubContent } from './_components/club-content';

type ClubPageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: ClubPageProps): Promise<Metadata> => {
  const { id } = await params;
  const club = await cachedClubsApi.getClub(id);
  if (!club) return { title: 'Клуб | #iLoveThisGame' };
  return {
    title: `${club.name} | #iLoveThisGame`,
    description: `${club.name} — клуб из ${club.country}`,
  };
};

const ClubPage = async ({ params }: ClubPageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient(clientOptions);

  await queryClient.prefetchQuery({
    queryKey: getClubQueryKeys(id),
    queryFn: () => cachedClubsApi.getClub(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClubContent clubId={id} />
    </HydrationBoundary>
  );
};

export default ClubPage;
