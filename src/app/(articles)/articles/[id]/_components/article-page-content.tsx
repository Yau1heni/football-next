'use client';

import { PageTitle } from '@components/page-title';
import { StateMessage } from '@components/state-message';
import { ArticleCommentsProvider } from '@contexts/article-comments';
import { useArticleQuery } from '@queries/article';
import type { FC } from 'react';

import { ArticleComments } from './article-comments';
import { ArticleDetail } from './article-detail';

type ArticlePageContentProps = {
  id: string;
};

export const ArticlePageContent: FC<ArticlePageContentProps> = ({ id }) => {
  const { data: article } = useArticleQuery(id);

  if (!article) {
    return <StateMessage variant={'empty'} title={'Статья не найдена'} />;
  }

  return (
    <>
      <PageTitle title={article.title} showBack />
      <ArticleDetail article={article} />
      <ArticleCommentsProvider articleId={id}>
        <ArticleComments />
      </ArticleCommentsProvider>
    </>
  );
};
