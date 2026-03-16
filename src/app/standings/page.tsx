import { standingsApi } from '@api/standings-api';
import { clientOptions } from '@configs/tanstack-query-config';
import { getStandingsQueryKeys } from '@queries/standings';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getStandingsQueryOptionsFromSearchParams } from './_components/get-standings-query-options';
import { StandingsPageContent } from './_components/standings-page-content';

export const metadata: Metadata = {
  title: 'Турнирная таблица | #iLoveThisGame',
  description: 'Актуальные турнирные таблицы футбольных клубов',
};

type StandingsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const StandingsPage = async ({ searchParams }: StandingsPageProps) => {
  const queryClient = new QueryClient(clientOptions);

  const resolvedSearchParams = await searchParams;
  const options = getStandingsQueryOptionsFromSearchParams(resolvedSearchParams);

  await queryClient.prefetchQuery({
    queryKey: getStandingsQueryKeys(options),
    queryFn: () => standingsApi.getByCompetition(options),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StandingsPageContent />
    </HydrationBoundary>
  );
};

export default StandingsPage;
