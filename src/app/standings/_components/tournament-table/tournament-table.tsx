import { Table } from '@components/table';
import type { TableEntry } from '@shared-types/standings.types';

import { TournamentTableSkeleton } from '@/app/standings/_components/tournament-table/tournament-table-skeleton';

import { getTournamentColumns } from './get-tournament-columns';
import { TournamentTableFooter } from './tournament-table-footer';

type TournamentTableProps = {
  data: TableEntry[];
  isLoading?: boolean;
};

export const TournamentTable = ({ data, isLoading }: TournamentTableProps) => {
  if (isLoading) {
    return <TournamentTableSkeleton />;
  }

  const handleGetRowKey = (row: TableEntry) => row.team.id;

  return (
    <Table
      data={data}
      columns={getTournamentColumns}
      getRowKey={handleGetRowKey}
      footer={<TournamentTableFooter />}
    />
  );
};
