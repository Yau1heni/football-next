'use client';

import { PageTitle } from '@components/page-title';
import { Pagination } from '@components/pagination';
import { PAGINATION_LIMIT } from '@constants/pagination';
import { useClubsQuery } from '@queries/clubs';

import { ClubsFilters } from './clubs-filters/clubs-filters';
import { ClubsList } from './clubs-list/clubs-list';
import { useClubsFilters } from './use-clubs-filters';

export const ClubsPageContent = () => {
  const { queryOptions, setPage } = useClubsFilters();
  const { data, isLoading, isError } = useClubsQuery(queryOptions);

  return (
    <>
      <PageTitle title={'Клубы'} />
      <ClubsFilters />
      <ClubsList clubs={data?.clubsData ?? []} isLoading={isLoading} isError={isError} />
      {data != null && data.found > PAGINATION_LIMIT && (
        <Pagination page={queryOptions.page} total={data.found} onChange={setPage} />
      )}
    </>
  );
};
