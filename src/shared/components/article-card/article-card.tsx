import { Typography } from '@components/ui/typography';
import { routes } from '@configs/routes';
import {
  ARTICLE_IMAGE_HEIGHT,
  ARTICLE_IMAGE_WIDTH,
  DEFAULT_ARTICLE_IMAGE,
} from '@constants/images';
import { RU_LIKE, RU_VIEW } from '@constants/plural-forms';
import type { Article } from '@shared-types/articles.types';
import { getCommentsCountLabel } from '@utils/article-comments';
import { plural } from '@utils/plural';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { memo } from 'react';

import styles from './article-card.module.scss';

type ArticleCardProps = {
  article: Article;
  index?: number;
};

export const ArticleCard: FC<ArticleCardProps> = memo(({ article, index = 0 }) => (
  <Link href={routes.article.create(article.id)} className={styles.link}>
    <article className={styles.articleCard}>
      <div className={styles.image}>
        <Image
          src={article.coverImageUrl ? article.coverImageUrl : DEFAULT_ARTICLE_IMAGE}
          alt={article.title}
          width={ARTICLE_IMAGE_WIDTH}
          height={ARTICLE_IMAGE_HEIGHT}
          sizes="(max-width: 768px) 100vw, 300px"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>
      <div className={styles.articleCardBody}>
        <Typography tag={'h2'} view={'p-20'} weight={'bold'} maxLines={2}>
          {article.title}
        </Typography>
        <Typography view={'p-16'} color={'secondary'} maxLines={3}>
          {article.excerpt}
        </Typography>
        <div className={styles.meta}>
          <Typography tag={'span'}>{article.category}</Typography>
          <Typography tag={'span'}>
            {article.likesCount} {plural(article.likesCount, RU_LIKE)} · {article.viewsCount}{' '}
            {plural(article.viewsCount, RU_VIEW)} · {article.commentsCount}{' '}
            {getCommentsCountLabel(article.commentsCount)}
          </Typography>
        </div>
      </div>
    </article>
  </Link>
));

ArticleCard.displayName = 'ArticleCard';
