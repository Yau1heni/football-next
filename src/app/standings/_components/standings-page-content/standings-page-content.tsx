'use client';

import { ContentContainer } from '@components/content-container';
import { PageTitle } from '@components/page-title';
import { StateMessage } from '@components/state-message';
import { useStandingsQuery } from '@queries/standings';

import { StandingsFilters } from '../standings-filters';
import { TournamentTable } from '../tournament-table';
import { useStandingsFilters } from '../use-standings-filters';

export const StandingsPageContent = () => {
  const {
    queryOptions,
    competitionOption,
    setCompetitionOption,
    matchVenueOption,
    setMatchVenueOption,
    seasonOption,
    setSeasonOption,
    matchVenueType,
    isPending: isFiltersPending,
  } = useStandingsFilters();
  const { data, isPending: isQueryPending } = useStandingsQuery(queryOptions);

  const isLoading = isFiltersPending || isQueryPending;

  const standings = data?.standings ?? [];
  const selectedType = matchVenueType.toUpperCase();
  const tableData =
    standings.find((standing) => standing.type === selectedType)?.table ??
    standings[0]?.table ??
    [];

  if (!isLoading && tableData.length === 0) {
    return <StateMessage variant="empty" title="Нет данных о таблице" />;
  }

  return (
    <>
      <PageTitle
        title={data?.area?.name ?? 'Турнирная таблица'}
        flag={data?.area?.flag}
        showBack={true}
      />
      <StandingsFilters
        competitionOption={competitionOption}
        onSetCompetitionOptionAction={setCompetitionOption}
        matchVenueOption={matchVenueOption}
        onSetMatchVenueOptionAction={setMatchVenueOption}
        seasonOption={seasonOption}
        onSetSeasonOptionAction={setSeasonOption}
      />
      <ContentContainer
        title={data?.competition?.name}
        image={data?.competition?.emblem}
        isSkeleton={isLoading}
      >
        <TournamentTable data={tableData} isLoading={isLoading} />
      </ContentContainer>
    </>
  );
};
