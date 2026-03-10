'use client';

import { useArticleLastViewDateQuery, useRecordArticleViewMutation } from '@queries/article';
import { shouldCountArticleView } from '@utils/should-count-article-view';
import { useEffect, useRef } from 'react';

/**
 * Запрашивает lastViewDate и при необходимости один раз засчитывает просмотр
 * (не чаще 1 раза в день на пользователя). Вызывать на странице статьи при наличии userId.
 */
export const useRecordArticleView = (articleId: string, userId: string) => {
  const hasAttemptedRef = useRef(false);
  const { data: lastViewDate, isSuccess } = useArticleLastViewDateQuery(articleId, userId);
  const recordView = useRecordArticleViewMutation();

  useEffect(() => {
    hasAttemptedRef.current = false;
  }, [articleId, userId]);

  useEffect(() => {
    if (!articleId || !userId || !isSuccess || hasAttemptedRef.current || recordView.isPending) {
      return;
    }
    if (!shouldCountArticleView(lastViewDate ?? null)) {
      return;
    }
    hasAttemptedRef.current = true;
    recordView.mutate({ articleId, userId });
  }, [articleId, userId, isSuccess, lastViewDate, recordView.mutate, recordView.isPending]);
};
