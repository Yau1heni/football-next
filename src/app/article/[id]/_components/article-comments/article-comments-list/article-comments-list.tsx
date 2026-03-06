'use client';

import { useArticleCommentsData, useArticleCommentsMutation } from '@contexts/article-comments';
import type { ReactionType } from '@shared-types/articles.types';
import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';

import { ArticleCommentForm } from '../article-comment-form';
import { VirtualArticleCommentRow } from '../virtual-article-comment-row';
import styles from './article-comments-list.module.scss';
import { useArticleCommentsListVirtual } from './use-article-comments-list-virtual';

export const ArticleCommentsList: FC = memo(() => {
  const { addCommentMutate, removeCommentMutate, setCommentReactionMutate } =
    useArticleCommentsData();
  const { addComment } = useArticleCommentsMutation();
  const {
    displayList,
    rowVirtualizer,
    listAnchorRef,
    sentinelRef,
    scrollMargin,
    hasNextPage,
  } = useArticleCommentsListVirtual();

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
      <div
        ref={listAnchorRef}
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <VirtualArticleCommentRow
            key={virtualRow.key}
            virtualRow={virtualRow}
            displayList={displayList}
            measureElementAction={rowVirtualizer.measureElement}
            scrollMargin={scrollMargin}
            replyingToCommentId={replyingToCommentId}
            onReplyAction={handleReply}
            onDeleteAction={handleDelete}
            onCancelReplyAction={handleCancelReply}
            onSubmitReplyAction={handleSubmitReply}
            onReactionAction={handleReaction}
          />
        ))}
      </div>
      {hasNextPage && <div ref={sentinelRef} aria-hidden />}
    </div>
  );
});

ArticleCommentsList.displayName = 'ArticleCommentsList';
