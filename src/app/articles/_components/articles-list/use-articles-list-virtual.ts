'use client';

import { useInfiniteScroll } from '@hooks/use-infinite-scroll';
import { useArticlesQuery } from '@queries/articles';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

const LIST_TOP_OFFSET = 140; // хедер + отступы контейнера + заголовок страницы
const ROW_ESTIMATE_SIZE = 220;

export const useArticlesList = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } =
    useArticlesQuery();

  useInfiniteScroll(sentinelRef, {
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const articles = data?.pages.flatMap((page) => page.articles) ?? [];
  const itemCount = articles.length + (isFetchingNextPage ? 1 : 0);

  const rowVirtualizer = useWindowVirtualizer({
    count: itemCount,
    estimateSize: () => ROW_ESTIMATE_SIZE,
    overscan: 6,
    scrollMargin: LIST_TOP_OFFSET,
    getItemKey: (index) => (index < articles.length ? articles[index].id : 'loading'),
  });

  return {
    articles,
    rowVirtualizer,
    sentinelRef,
    scrollMargin: LIST_TOP_OFFSET,
    isError,
    isLoading,
    hasNextPage,
  };
};
