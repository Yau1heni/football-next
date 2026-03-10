import { ARTICLES_PAGE_SIZE, articlesApi } from '@api/articles-api';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getArticlesQueryKeys } from './keys';

export const useArticlesQuery = () =>
  useInfiniteQuery({
    queryKey: getArticlesQueryKeys(),
    queryFn: ({ pageParam }) => articlesApi.getAll(ARTICLES_PAGE_SIZE, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.lastDocId : undefined),
    refetchOnMount: true,
  });
