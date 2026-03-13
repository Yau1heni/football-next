'use client';

import { ContentContainer } from '@components/content-container';
import { HtmlContent } from '@components/html-content';
import { ReactionButtons } from '@components/reaction-buttons';
import { Typography } from '@components/ui/typography';
import { DEFAULT_ARTICLE_IMAGE } from '@constants/images';
import { RU_VIEW } from '@constants/plural-forms';
import { useArticleUserReactionQuery, useSetArticleReactionMutation } from '@queries/article';
import type { Article } from '@shared-types/articles.types';
import { REACTION } from '@shared-types/articles.types';
import { getCommentsCountLabel } from '@utils/article-comments';
import { formatTimestamp } from '@utils/format-timestamp';
import { plural } from '@utils/plural';
import Image from 'next/image';
import type { FC } from 'react';

import styles from './article-detail.module.scss';
import { ArticleDetailTags } from './article-detail-tags';

type ArticleDetailProps = {
  article: Article;
  userId: string;
};

export const ArticleDetail: FC<ArticleDetailProps> = ({ article, userId }) => {
  const { data: userReaction } = useArticleUserReactionQuery(article.id, userId);
  const setReaction = useSetArticleReactionMutation();

  const timestamp = formatTimestamp(article.timestamp);

  const handleLike = () => {
    if (!userId) return;
    setReaction.mutate({
      articleId: article.id,
      userId,
      type: REACTION.LIKE,
      previousReactionType: userReaction?.type ?? null,
    });
  };

  const handleDislike = () => {
    if (!userId) return;
    setReaction.mutate({
      articleId: article.id,
      userId,
      type: REACTION.DISLIKE,
      previousReactionType: userReaction?.type ?? null,
    });
  };

  const coverSrc = article.coverImageUrl || DEFAULT_ARTICLE_IMAGE;

  return (
    <ContentContainer title={article.excerpt ?? article.title} titleTag="h1">
      <article className={styles.articleDetail}>
        {article.tags.length > 0 && <ArticleDetailTags tags={article.tags} />}

        <div className={styles.articleCover}>
          <Image
            src={coverSrc}
            alt={article.title}
            fill
            sizes={'(max-width: 720px) 100vw, 720px'}
          />
        </div>

        <div className={styles.articleMeta}>
          {timestamp && (
            <Typography tag={'span'} color={'secondary'}>
              {timestamp}
            </Typography>
          )}
          <Typography tag={'span'} color={'secondary'}>
            {article.category} · {article.viewsCount} {plural(article.viewsCount, RU_VIEW)} ·{' '}
            {article.commentsCount} {getCommentsCountLabel(article.commentsCount)}
          </Typography>
        </div>

        <div className={styles.articleContent}>
          <HtmlContent html={article.content} />
        </div>

        <div className={styles.reactionSection}>
          <ReactionButtons
            likesCount={article.likesCount}
            dislikesCount={article.dislikesCount}
            userReaction={userReaction?.type ?? null}
            onLikeAction={handleLike}
            onDislikeAction={handleDislike}
            disabled={!userId || setReaction.isPending}
          />
        </div>
      </article>
    </ContentContainer>
  );
};
