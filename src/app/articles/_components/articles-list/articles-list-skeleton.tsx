import { ArticleCardSkeleton } from '@components/article-card';
import type { FC } from 'react';

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
