import { ARTICLES_PAGE_SIZE, articlesApi } from '@api/articles-api';
import { STALE_TIME_MS } from '@constants/queries';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getArticlesQueryKeys } from './keys';

export const useArticlesQuery = () =>
  useInfiniteQuery({
    queryKey: getArticlesQueryKeys(),
    queryFn: ({ pageParam }) => articlesApi.getAll(ARTICLES_PAGE_SIZE, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.lastDocId : undefined),
    staleTime: STALE_TIME_MS,
  });
