import { Typography } from '@components/ui/typography';
import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './table.module.scss';

export type ColumnDef<T> = {
  key: string;
  header: string | ReactNode;
  render: (row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
};

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  getRowKey: (row: T) => string | number;
  footer?: ReactNode;
  className?: string;
};

export const Table = <T,>({ data, columns, getRowKey, footer, className }: TableProps<T>) => (
  <div className={cn(styles.wrapper, className)}>
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={cn(
                styles.th,
                col.align && styles[col.align],
                col.hideOnMobile && styles.hideMobile,
                col.hideOnTablet && styles.hideTablet,
                col.className
              )}
            >
              <Typography>{col.header}</Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={getRowKey(row)} className={styles.tr}>
            {columns.map((col) => (
              <td
                key={col.key}
                className={cn(
                  styles.td,
                  col.align && styles[col.align],
                  col.hideOnMobile && styles.hideMobile,
                  col.hideOnTablet && styles.hideTablet,
                  col.className
                )}
              >
                {col.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {footer && (
        <tfoot>
          <tr>
            <td colSpan={columns.length} className={styles.footer}>
              {footer}
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  </div>
);
