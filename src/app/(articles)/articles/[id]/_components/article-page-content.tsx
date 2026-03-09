'use client';

import { PageTitle } from '@components/page-title';
import { ArticleCommentsProvider } from '@contexts/article-comments';
import type { FC } from 'react';

import { ArticleComments } from './article-comments';
import { ArticleDetail } from './article-detail';

type ArticlePageContentProps = {
  id: string;
};

export const ArticlePageContent: FC<ArticlePageContentProps> = ({ id }) => (
  <>
    <PageTitle title={'Назад'} showBack={true} />
    <ArticleDetail articleId={id} />
    {id ? (
      <ArticleCommentsProvider articleId={id}>
        <ArticleComments />
      </ArticleCommentsProvider>
    ) : null}
  </>
);
