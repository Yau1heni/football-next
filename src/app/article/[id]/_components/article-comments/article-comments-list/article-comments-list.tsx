'use client';

import { useArticleCommentsData, useArticleCommentsMutation } from '@contexts/article-comments';
import { useInfiniteScroll } from '@hooks/use-infinite-scroll';
import type { ReactionType } from '@shared-types/articles.types';
import type { FC } from 'react';
import { memo, useCallback, useRef, useState } from 'react';

import { ArticleCommentForm } from '../article-comment-form';
import { ArticleCommentSkeleton } from '../article-comment-item';
import styles from './article-comments-list.module.scss';
import { ArticleCommentsRows } from './article-comments-rows';

export const ArticleCommentsList: FC = memo(() => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { addCommentMutate, removeCommentMutate, setCommentReactionMutate } =
    useArticleCommentsData();
  const { addComment, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useArticleCommentsMutation();

  useInfiniteScroll(sentinelRef, {
    onIntersect: () => fetchNextPage(),
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
  });

  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);

  const handleSubmitRoot = useCallback(
    (text: string) => {
      addCommentMutate({ text, parentCommentId: null });
    },
    [addCommentMutate]
  );

  const handleSubmitReply = useCallback(
    (parentCommentId: string, text: string) => {
      addCommentMutate({ text, parentCommentId });
      setReplyingToCommentId(null);
    },
    [addCommentMutate]
  );

  const handleReply = useCallback((commentId: string) => {
    setReplyingToCommentId(commentId);
  }, []);

  const handleDelete = useCallback(
    (commentId: string) => {
      removeCommentMutate(commentId);
    },
    [removeCommentMutate]
  );

  const handleCancelReply = useCallback(() => {
    setReplyingToCommentId(null);
  }, []);

  const handleReaction = useCallback(
    (commentId: string, type: ReactionType, previousReactionType: ReactionType | null) => {
      setCommentReactionMutate({ commentId, type, previousReactionType });
    },
    [setCommentReactionMutate]
  );

  return (
    <div className={styles.articleCommentsList}>
      <ArticleCommentForm
        onSubmitAction={handleSubmitRoot}
        placeholder={'Введите комментарий...'}
        loading={addComment.isPending}
      />
      <ArticleCommentsRows
        replyingToCommentId={replyingToCommentId}
        onReplyAction={handleReply}
        onDeleteAction={handleDelete}
        onCancelReplyAction={handleCancelReply}
        onSubmitReplyAction={handleSubmitReply}
        onReactionAction={handleReaction}
      />
      {isFetchingNextPage && <ArticleCommentSkeleton depth={0} />}
      {hasNextPage && <div ref={sentinelRef} aria-hidden />}
    </div>
  );
});

ArticleCommentsList.displayName = 'ArticleCommentsList';
