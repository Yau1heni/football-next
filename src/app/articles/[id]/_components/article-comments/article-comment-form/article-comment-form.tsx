'use client';

import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import type { FC } from 'react';
import { useState } from 'react';

import styles from './article-comment-form.module.scss';

export type ArticleCommentFormProps = {
  onSubmitAction: (text: string) => void;
  onCancelAction?: () => void;
  placeholder?: string;
  loading?: boolean;
};

export const ArticleCommentForm: FC<ArticleCommentFormProps> = ({
  onSubmitAction,
  onCancelAction,
  placeholder = 'Введите комментарий...',
  loading = false,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmitAction(trimmed);
    setText('');
  };

  const handleCancel = () => {
    setText('');
    onCancelAction?.();
  };

  return (
    <div className={styles.articleCommentForm}>
      <Textarea
        value={text}
        onChange={setText}
        placeholder={placeholder}
        rows={3}
        disabled={loading}
      />
      <div className={styles.actions}>
        <Button variant={'ghost'} onClick={handleCancel} disabled={loading}>
          Отменить
        </Button>
        <Button
          variant={'primary'}
          onClick={handleSubmit}
          disabled={!text.trim() || loading}
          loading={loading}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};
