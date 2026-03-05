'use client';

import { PageTitle } from '@components/page-title';

import { ArticlesList } from './articles-list/articles-list';

export const ArticlesPageContent = () => (
  <>
    <PageTitle title={'Статьи'} showBack={true} />
    <ArticlesList />
  </>
);
