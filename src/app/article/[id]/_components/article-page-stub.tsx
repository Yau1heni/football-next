'use client';

import { PageTitle } from '@components/page-title';
import { Typography } from '@components/ui/typography';
import type { FC } from 'react';

type ArticlePageStubProps = {
  articleId: string;
};

export const ArticlePageStub: FC<ArticlePageStubProps> = ({ articleId }) => (
  <>
    <PageTitle title={'Статья'} />
    <Typography view={'p-16'} color={'secondary'}>
      Страница статьи (id: {articleId})
    </Typography>
  </>
);
