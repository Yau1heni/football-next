'use client';

import { StateMessage } from '@components/state-message';
import type { FC } from 'react';

import { ArticleCommentForm } from '../article-comment-form';
import styles from '../article-comments.module.scss';

type ArticleCommentsEmptyProps = {
  onSubmitRootAction: (text: string) => void;
  isLoading: boolean;
};

export const ArticleCommentsEmpty: FC<ArticleCommentsEmptyProps> = ({
  onSubmitRootAction,
  isLoading,
}) => (
  <div className={styles.articleComments}>
    <ArticleCommentForm
      onSubmitAction={onSubmitRootAction}
      placeholder={'Введите комментарий...'}
      loading={isLoading}
    />
    <StateMessage
      variant={'empty'}
      title={'Пока нет комментариев'}
      description={'Оставьте свой комментарий'}
    />
  </div>
);
