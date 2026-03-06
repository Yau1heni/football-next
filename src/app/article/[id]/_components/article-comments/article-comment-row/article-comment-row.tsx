'use client';

import type { ArticleComment, ReactionType } from '@shared-types/articles.types';
import type { FC } from 'react';
import { memo } from 'react';

import { ArticleCommentForm } from '../article-comment-form';
import { ArticleCommentItem, COMMENT_INDENT_PX } from '../article-comment-item';

export type ArticleCommentRowProps = {
  comment: ArticleComment;
  depth: number;
  isReplying: boolean;
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

const ArticleCommentRowComponent: FC<ArticleCommentRowProps> = (props) => {
  const {
    comment,
    depth,
    isReplying,
    onReplyAction,
    onDeleteAction,
    onCancelReplyAction,
    onSubmitReplyAction,
    onReactionAction,
  } = props;

  return (
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
  );
};

ArticleCommentRowComponent.displayName = 'ArticleCommentRow';

export const ArticleCommentRow = memo(ArticleCommentRowComponent);
