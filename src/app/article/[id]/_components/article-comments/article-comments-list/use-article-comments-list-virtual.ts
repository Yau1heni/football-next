'use client';

import { useArticleCommentsData, useArticleCommentsMutation } from '@contexts/article-comments';
import { useInfiniteScroll } from '@hooks/use-infinite-scroll';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { buildCommentsDisplayList } from '@utils/article-comments';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

const ROW_ESTIMATE_SIZE = 120;

const measureScrollMargin = (anchorEl: HTMLElement | null): number =>
  anchorEl ? anchorEl.getBoundingClientRect().top + window.scrollY : 0;

export const useArticleCommentsListVirtual = () => {
  const listAnchorRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  const { comments } = useArticleCommentsData();
  const { hasNextPage, fetchNextPage, isFetchingNextPage } = useArticleCommentsMutation();

  useInfiniteScroll(sentinelRef, {
    onIntersect: () => fetchNextPage(),
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
  });

  useLayoutEffect(() => {
    const anchor = listAnchorRef.current;
    if (anchor) setScrollMargin(measureScrollMargin(anchor));
  }, []);

  const displayList = useMemo(() => buildCommentsDisplayList(comments), [comments]);
  const itemCount = displayList.length + (isFetchingNextPage ? 1 : 0);

  const rowVirtualizer = useWindowVirtualizer({
    count: itemCount,
    estimateSize: () => ROW_ESTIMATE_SIZE,
    overscan: 6,
    scrollMargin,
    getItemKey: (index) =>
      index < displayList.length ? displayList[index].comment.id : 'loading',
  });

  return {
    displayList,
    rowVirtualizer,
    listAnchorRef,
    sentinelRef,
    scrollMargin,
    hasNextPage,
  };
};
