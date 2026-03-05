import type { Metadata } from 'next';

import { ArticlePageStub } from './_components/article-page-stub';

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: ArticlePageProps): Promise<Metadata> => {
  const { id } = await params;
  return {
    title: `Статья ${id} | #iLoveThisGame`,
    description: 'Страница статьи',
  };
};

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { id } = await params;
  return <ArticlePageStub articleId={id} />;
};

export default ArticlePage;
