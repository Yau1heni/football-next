import { articlesApi } from '@api/articles-api';
import { clientOptions } from '@configs/tanstack-query-config';
import { getArticleQueryKeys } from '@queries/article/keys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { ArticlePageContent } from './_components/article-page-content';

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: ArticlePageProps): Promise<Metadata> => {
  const { id } = await params;
  const article = await articlesApi.getById(id);
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
    queryFn: () => articlesApi.getById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlePageContent id={id} />
    </HydrationBoundary>
  );
};

export default ArticlePage;
