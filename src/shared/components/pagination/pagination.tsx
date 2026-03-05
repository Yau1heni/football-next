'use client';

import { Button } from '@components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@components/ui/icons';
import { Typography } from '@components/ui/typography';
import { START_PAGE } from '@constants/pagination';
import cn from 'classnames';
import type { FC } from 'react';

import styles from './pagination.module.scss';
import { usePagination } from './use-pagination';

type PaginationProps = {
  total?: number;
  page?: number;
  onChangeAction?: (value: number) => void;
};

export const Pagination: FC<PaginationProps> = (props) => {
  const { total = 0, page = START_PAGE, onChangeAction } = props;
  const pages = usePagination({ total, page });

  const handlePrev = () => {
    if (page > START_PAGE) onChangeAction?.(page - 1);
  };

  const handleNext = () => {
    if (page < pages.length) onChangeAction?.(page + 1);
  };

  const onItemClick = (p: number | string) => typeof p === 'number' && onChangeAction?.(p);

  return (
    <div className={styles.pagination}>
      <Button
        variant={'ghost'}
        onClick={handlePrev}
        disabled={page === START_PAGE}
        className={styles.arrowButton}
      >
        <ArrowRightIcon
          width={32}
          height={32}
          viewBox={'0 0 32 32'}
          aria-label={'перейти на прошлую страницу'}
        />
      </Button>

      <div className={styles.paginationItems}>
        {pages.map((p, index) => (
          <Button
            key={index}
            disabled={p === '...'}
            onClick={() => onItemClick(p)}
            className={cn(
              styles.paginationItem,
              page === p && styles.active,
              p === '...' && styles.dots
            )}
          >
            <Typography view={'p-18'} color={page === p ? 'light' : 'primary'}>
              {p}
            </Typography>
          </Button>
        ))}
      </div>

      <Button
        variant={'ghost'}
        onClick={handleNext}
        disabled={page >= pages.length}
        className={styles.arrowButton}
      >
        <ArrowLeftIcon
          width={32}
          height={32}
          viewBox={'0 0 32 32'}
          aria-label={'перейти на следующую страницу'}
        />
      </Button>
    </div>
  );
};
