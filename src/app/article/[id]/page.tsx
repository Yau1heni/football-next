import { articlesApi } from '@api/articles-api';
import { clientOptions } from '@configs/tanstack-query-config';
import { getArticleQueryKeys } from '@queries/article/keys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { cache } from 'react';

import { ArticlePageContent } from './_components/article-page-content';

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

const getArticleCached = cache((id: string) => articlesApi.getById(id));

export const generateMetadata = async ({ params }: ArticlePageProps): Promise<Metadata> => {
  const { id } = await params;
  const article = await getArticleCached(id);
  if (!article) return { title: 'Статья | #iLoveThisGame', description: 'Статья о футболе' };
  return {
    title: `${article.title} | #iLoveThisGame`,
    description: article.excerpt || 'Статья о футболе',
  };
};

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient(clientOptions);

  await queryClient.prefetchQuery({
    queryKey: getArticleQueryKeys(id),
    queryFn: () => getArticleCached(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlePageContent id={id} />
    </HydrationBoundary>
  );
};

export default ArticlePage;
