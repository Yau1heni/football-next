import { ArticleCard, ArticleCardSkeleton } from '@components/article-card';
import type { Article } from '@shared-types/articles.types';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { FC } from 'react';

type VirtualArticleItemProps = {
  virtualRow: VirtualItem;
  articles: Article[];
  measureElementAction: (node: Element | null) => void;
  scrollMargin: number;
};

export const VirtualArticleItem: FC<VirtualArticleItemProps> = ({
  virtualRow,
  articles,
  measureElementAction,
  scrollMargin,
}) => (
  <li
    data-index={virtualRow.index}
    ref={measureElementAction}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      paddingBottom: '20px',
      transform: `translateY(${virtualRow.start - scrollMargin}px)`,
    }}
  >
    {virtualRow.index >= articles.length ? (
      <ArticleCardSkeleton />
    ) : (
      <ArticleCard article={articles[virtualRow.index]} index={virtualRow.index} />
    )}
  </li>
);
