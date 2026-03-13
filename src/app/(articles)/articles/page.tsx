import { ARTICLES_PAGE_SIZE, articlesApi } from '@api/articles-api';
import { clientOptions } from '@configs/tanstack-query-config';
import { getArticlesQueryKeys } from '@queries/articles/keys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { ArticlesPageContent } from './_components/articles-page-content';

export const metadata: Metadata = {
  title: 'Статьи | #iLoveThisGame',
  description: 'Статьи о футболе',
};

const ArticlesPage = async () => {
  const queryClient = new QueryClient(clientOptions);

  await queryClient.prefetchInfiniteQuery({
    queryKey: getArticlesQueryKeys(),
    queryFn: ({ pageParam }) => articlesApi.getAll(ARTICLES_PAGE_SIZE, pageParam),
    initialPageParam: undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlesPageContent />
    </HydrationBoundary>
  );
};

export default ArticlesPage;
