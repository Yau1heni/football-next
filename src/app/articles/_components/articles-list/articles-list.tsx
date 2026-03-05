'use client';

import { StateMessage } from '@components/state-message';
import { useInfiniteScroll } from '@hooks/use-infinite-scroll';
import { useArticlesQuery } from '@queries/articles';
import type { FC } from 'react';
import { useRef } from 'react';

import { ArticleCard } from './article-card/article-card';
import { ArticleCardSkeleton } from './article-card/article-card-skeleton';
import { ArticlesListSkeleton } from './articles-list-skeleton';

export const ArticlesList: FC = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } =
    useArticlesQuery();

  useInfiniteScroll(sentinelRef, {
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

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
      <ul>
        {articles.map((article, index) => (
          <li key={article.id}>
            <ArticleCard article={article} index={index} />
          </li>
        ))}
        {isFetchingNextPage && (
          <li>
            <ArticleCardSkeleton />
          </li>
        )}
      </ul>
      {hasNextPage && <div ref={sentinelRef} aria-hidden />}
    </>
  );
};
