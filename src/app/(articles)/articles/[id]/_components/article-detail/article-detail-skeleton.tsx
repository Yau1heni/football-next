import { ContentContainer } from '@components/content-container';
import { Skeleton } from '@components/ui/skeleton';
import type { FC } from 'react';

import styles from './article-detail.module.scss';
import { ArticleDetailTagsSkeleton } from './article-detail-tags';

export const ArticleDetailSkeleton: FC = () => (
  <ContentContainer isSkeleton={true}>
    <article className={styles.articleDetail}>
      <ArticleDetailTagsSkeleton />
      <div className={styles.articleCover}>
        <Skeleton variant={'rectangular'} height={'100%'} className={styles.coverSkeleton} />
      </div>
      <div className={styles.articleMeta}>
        <Skeleton variant={'text'} width={80} height={14} />
        <Skeleton variant={'text'} width={180} height={14} />
      </div>

      <div className={styles.articleContent}>
        <Skeleton variant={'text'} width={'100%'} />
        <Skeleton variant={'text'} width={'100%'} />
        <Skeleton variant={'text'} width={'95%'} />
        <Skeleton variant={'text'} width={'100%'} />
        <Skeleton variant={'text'} width={'80%'} />
      </div>
    </article>
  </ContentContainer>
);
