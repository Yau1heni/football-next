'use client';

import { ReactionButtons } from '@components/reaction-buttons';
import { Button } from '@components/ui/button';
import { Typography } from '@components/ui/typography';
import { useArticleCommentsData, useArticleCommentsMutation } from '@contexts/article-comments';
import { isPendingComment, useArticleCommentsReactionQuery } from '@queries/article-comments';
import { type ArticleComment, REACTION, type ReactionType } from '@shared-types/articles.types';
import { formatTimestamp } from '@utils/format-timestamp';
import cn from 'classnames';
import type { FC } from 'react';
import { memo, useCallback } from 'react';

import styles from './article-comment-item.module.scss';

export const COMMENT_INDENT_PX = 20;

export type ArticleCommentItemProps = {
  comment: ArticleComment;
  depth: number;
  onReplyAction?: (commentId: string) => void;
  onDeleteAction?: (commentId: string) => void;
  onReactionAction?: (
    commentId: string,
    type: ReactionType,
    previousReactionType: ReactionType | null
  ) => void;
};

export const ArticleCommentItem: FC<ArticleCommentItemProps> = memo((props) => {
  const { comment, depth, onReplyAction, onDeleteAction, onReactionAction } = props;
  const { articleId, userId } = useArticleCommentsData();
  const { data: userReactionData } = useArticleCommentsReactionQuery(articleId, comment.id, userId);
  const userReaction = userReactionData?.type ?? null;
  const { setCommentReaction } = useArticleCommentsMutation();
  const isReactionPending =
    setCommentReaction.isPending && setCommentReaction.variables?.commentId === comment.id;
  const isPending = isPendingComment(comment);

  const handleLike = useCallback(() => {
    onReactionAction?.(comment.id, REACTION.LIKE, userReaction);
  }, [comment.id, onReactionAction, userReaction]);

  const handleDislike = useCallback(() => {
    onReactionAction?.(comment.id, REACTION.DISLIKE, userReaction);
  }, [comment.id, onReactionAction, userReaction]);

  const formattedDate = formatTimestamp(comment.timestamp);
  const isDeleted = Boolean(comment.deleted);
  const isOwnComment = comment.userId !== null && comment.userId === userId;

  return (
    <article
      className={cn(styles.articleCommentItem, isDeleted && styles.deleted)}
      style={{ marginLeft: depth * COMMENT_INDENT_PX }}
      data-depth={depth}
    >
      {!isDeleted && (
        <header className={styles.header}>
          <Typography tag={'span'} view={'p-16'} weight={'medium'}>
            {comment.name ?? 'Аноним'}
          </Typography>
          {formattedDate && (
            <Typography tag={'span'} view={'p-14'} color={'secondary'}>
              {formattedDate}
            </Typography>
          )}
        </header>
      )}
      {isDeleted ? (
        <Typography tag={'p'} view={'p-16'} color={'secondary'} className={styles.deletedText}>
          Комментарий удалён
        </Typography>
      ) : (
        comment.text && (
          <Typography tag={'p'} view={'p-16'} className={styles.text}>
            {comment.text}
          </Typography>
        )
      )}
      {!isDeleted && (
        <div className={styles.actions}>
          <ReactionButtons
            size={'m'}
            likesCount={comment.likesCount}
            dislikesCount={comment.dislikesCount}
            userReaction={userReaction}
            onLikeAction={handleLike}
            onDislikeAction={handleDislike}
            disabled={isReactionPending || isPending}
          />
          {onReplyAction && !isPending && (
            <Button variant={'ghost'} onClick={() => onReplyAction(comment.id)}>
              Ответить
            </Button>
          )}
          {onDeleteAction && isOwnComment && !isPending && (
            <Button variant={'ghost'} onClick={() => onDeleteAction(comment.id)}>
              Удалить
            </Button>
          )}
        </div>
      )}
    </article>
  );
});

ArticleCommentItem.displayName = 'ArticleCommentItem';
