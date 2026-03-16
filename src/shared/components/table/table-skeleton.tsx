import { Skeleton } from '@components/ui/skeleton';
import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './table.module.scss';

export type TableSkeletonColumn = {
  key: string;
  headerWidth?: number;
  cellWidth?: number;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  cell?: ReactNode;
};

type TableSkeletonProps = {
  columns: TableSkeletonColumn[];
  rowCount?: number;
  className?: string;
};

export const TableSkeleton = ({ columns, rowCount = 10, className }: TableSkeletonProps) => (
  <div className={cn(styles.wrapper, className)}>
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={cn(
                styles.th,
                col.hideOnMobile && styles.hideMobile,
                col.hideOnTablet && styles.hideTablet
              )}
            >
              <Skeleton width={col.headerWidth ?? 20} height={14} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rowCount }, (_, i) => (
          <tr key={i} className={styles.tr}>
            {columns.map((col) => (
              <td
                key={col.key}
                className={cn(
                  styles.td,
                  col.hideOnMobile && styles.hideMobile,
                  col.hideOnTablet && styles.hideTablet
                )}
              >
                {col.cell ?? <Skeleton width={col.cellWidth ?? 20} height={14} />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
