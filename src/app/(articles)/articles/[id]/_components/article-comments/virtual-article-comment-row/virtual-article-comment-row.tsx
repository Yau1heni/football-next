'use client';

import type { ReactionType } from '@shared-types/articles.types';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { CommentDisplayItem } from '@utils/article-comments';
import type { FC } from 'react';
import { memo } from 'react';

import { ArticleCommentForm } from '../article-comment-form';
import {
  ArticleCommentItem,
  ArticleCommentSkeleton,
  COMMENT_INDENT_PX,
} from '../article-comment-item';

type VirtualArticleCommentRowProps = {
  virtualRow: VirtualItem;
  displayList: CommentDisplayItem[];
  measureElementAction: (node: Element | null) => void;
  scrollMargin: number;
  replyingToCommentId: string | null;
  onReplyAction: (commentId: string) => void;
  onDeleteAction: (commentId: string) => void;
  onCancelReplyAction: () => void;
  onSubmitReplyAction: (parentCommentId: string, text: string) => void;
  onReactionAction: (
    commentId: string,
    type: ReactionType,
    previousReactionType: ReactionType | null
  ) => void;
};

export const VirtualArticleCommentRow: FC<VirtualArticleCommentRowProps> = memo((props) => {
  const {
    virtualRow,
    displayList,
    measureElementAction,
    scrollMargin,
    replyingToCommentId,
    onReplyAction,
    onDeleteAction,
    onCancelReplyAction,
    onSubmitReplyAction,
    onReactionAction,
  } = props;

  const isLoading = virtualRow.index >= displayList.length;
  const item = isLoading ? null : displayList[virtualRow.index];
  const comment = item?.comment;
  const depth = item?.depth ?? 0;
  const isReplying = comment ? replyingToCommentId === comment.id : false;

  const containerStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    transform: `translateY(${virtualRow.start - scrollMargin}px)`,
  };

  return (
    <div data-index={virtualRow.index} ref={measureElementAction} style={containerStyle}>
      {isLoading && <ArticleCommentSkeleton depth={0} />}
      {!isLoading && comment && (
        <>
          <ArticleCommentItem
            comment={comment}
            depth={depth}
            onReplyAction={onReplyAction}
            onDeleteAction={onDeleteAction}
            onReactionAction={onReactionAction}
          />
          {isReplying && (
            <div style={{ marginLeft: (depth + 1) * COMMENT_INDENT_PX }}>
              <ArticleCommentForm
                onSubmitAction={(text) => onSubmitReplyAction(comment.id, text)}
                onCancelAction={onCancelReplyAction}
                placeholder={'Ответ на комментарий...'}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
});

VirtualArticleCommentRow.displayName = 'VirtualArticleCommentRow';
