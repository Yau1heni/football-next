'use client';

import { PageTitle } from '@components/page-title';
import { ArticleCommentsProvider } from '@contexts/article-comments';
import { useParams } from 'next/navigation';
import type { FC } from 'react';

import { ArticleComments } from './article-comments';
import { ArticleDetail } from './article-detail';

export const ArticlePageContent: FC = () => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : undefined;
  const articleId = id ?? '';

  return (
    <>
      <PageTitle title={'Назад'} showBack={true} />
      <ArticleDetail articleId={id} />
      {articleId ? (
        <ArticleCommentsProvider articleId={articleId}>
          <ArticleComments />
        </ArticleCommentsProvider>
      ) : null}
    </>
  );
};
