import { TableSkeleton, TableSkeletonColumn } from '@components/table';

import { getTournamentColumns } from './get-tournament-columns';

const SKELETON_ROW_COUNT = 16;

const getSkeletonColumns = (): TableSkeletonColumn[] =>
  getTournamentColumns.map((col) => ({
    key: col.key,
    hideOnMobile: col.hideOnMobile,
    hideOnTablet: col.hideOnTablet,
  }));

export const TournamentTableSkeleton = () => {
  return <TableSkeleton columns={getSkeletonColumns()} rowCount={SKELETON_ROW_COUNT} />;
};
