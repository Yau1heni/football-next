'use client';

import { noop } from '@utils/noop';
import type { FC } from 'react';

import { ArticleCommentForm } from '../article-comment-form';
import styles from '../article-comments.module.scss';
import { ArticleCommentsListSkeleton } from './article-comments-list-skeleton';

export const ArticleCommentsLoading: FC = () => (
  <div className={styles.articleComments}>
    <ArticleCommentForm onSubmitAction={noop} loading={true} />
    <ArticleCommentsListSkeleton />
  </div>
);
