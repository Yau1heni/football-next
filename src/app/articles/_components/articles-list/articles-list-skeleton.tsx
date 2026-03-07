import type { FC } from 'react';

import { ArticleCardSkeleton } from './article-card/article-card-skeleton';

const SKELETON_COUNT = 5;

export const ArticlesListSkeleton: FC = () => (
  <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {Array.from({ length: SKELETON_COUNT }, (_, i) => (
      <li key={i}>
        <ArticleCardSkeleton />
      </li>
    ))}
  </ul>
);
