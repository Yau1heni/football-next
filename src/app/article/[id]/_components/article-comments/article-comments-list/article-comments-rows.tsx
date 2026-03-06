'use client';

import { useArticleCommentsData } from '@contexts/article-comments';
import type { ReactionType } from '@shared-types/articles.types';
import { buildCommentsDisplayList } from '@utils/article-comments';
import type { FC } from 'react';
import { memo, useMemo } from 'react';

import { ArticleCommentRow } from '../article-comment-row';

export type ArticleCommentsRowsProps = {
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

const ArticleCommentsRowsComponent: FC<ArticleCommentsRowsProps> = (props) => {
  const {
    replyingToCommentId,
    onReplyAction,
    onDeleteAction,
    onCancelReplyAction,
    onSubmitReplyAction,
    onReactionAction,
  } = props;
  const { comments } = useArticleCommentsData();

  const displayList = useMemo(() => buildCommentsDisplayList(comments), [comments]);

  return (
    <>
      {displayList.map(({ comment, depth }) => (
        <ArticleCommentRow
          key={comment.id}
          comment={comment}
          depth={depth}
          isReplying={replyingToCommentId === comment.id}
          onReplyAction={onReplyAction}
          onDeleteAction={onDeleteAction}
          onCancelReplyAction={onCancelReplyAction}
          onSubmitReplyAction={onSubmitReplyAction}
          onReactionAction={onReactionAction}
        />
      ))}
    </>
  );
};

ArticleCommentsRowsComponent.displayName = 'ArticleCommentsRows';

export const ArticleCommentsRows = memo(ArticleCommentsRowsComponent);
