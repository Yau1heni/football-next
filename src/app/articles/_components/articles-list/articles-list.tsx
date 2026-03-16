'use client';

import { StateMessage } from '@components/state-message';
import type { FC } from 'react';

import { ArticlesListSkeleton } from './articles-list-skeleton';
import { useArticlesList } from './use-articles-list-virtual';
import { VirtualArticleItem } from './virtual-article-item';

export const ArticlesList: FC = () => {
  const { articles, rowVirtualizer, sentinelRef, scrollMargin, isError, isLoading, hasNextPage } =
    useArticlesList();

  if (isError) {
    return <StateMessage variant={'error'} title={'Ошибка загрузки статей'} />;
  }

  if (isLoading) {
    return <ArticlesListSkeleton />;
  }

  if (articles.length === 0) {
    return <StateMessage variant={'empty'} title={'Статьи не найдены'} />;
  }

  return (
    <>
      <ul
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <VirtualArticleItem
            key={virtualRow.key}
            virtualRow={virtualRow}
            articles={articles}
            measureElementAction={rowVirtualizer.measureElement}
            scrollMargin={scrollMargin}
          />
        ))}
      </ul>
      {hasNextPage && <div ref={sentinelRef} aria-hidden />}
    </>
  );
};
