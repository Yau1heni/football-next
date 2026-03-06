'use client';

import { type RefObject, useEffect, useRef } from 'react';

const DEFAULT_ROOT_MARGIN_PX = 100;
const DEFAULT_THRESHOLD = 0;

export type UseInfiniteScrollOptions = {
  /** Вызывается, когда sentinel попадает в зону видимости */
  onIntersect: () => void;
  /** Наблюдать только когда true (например hasNextPage && !isFetchingNextPage) */
  enabled?: boolean;
  /** Контейнер скролла (root для IntersectionObserver). Не задан — viewport */
  scrollRootRef?: RefObject<HTMLElement | null>;
  /** Отступ от root/viewport в px, с которого считать элемент «видимым» */
  rootMargin?: number;
  /** Порог пересечения 0–1 */
  threshold?: number;
};

/**
 * Подписывается на появление элемента в viewport через IntersectionObserver
 * и вызывает onIntersect. Используется для бесконечного скролла.
 *
 * @param sentinelRef — ref на элемент-маркер в конце списка
 * @param options — onIntersect, enabled, rootMargin, threshold
 */
export const useInfiniteScroll = (
  sentinelRef: RefObject<HTMLElement | null>,
  options: UseInfiniteScrollOptions
) => {
  const {
    onIntersect,
    enabled = true,
    scrollRootRef,
    rootMargin = DEFAULT_ROOT_MARGIN_PX,
    threshold = DEFAULT_THRESHOLD,
  } = options;

  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!enabled || !el) return;

    const root = scrollRootRef?.current ?? null;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          onIntersectRef.current();
        }
      },
      {
        root,
        rootMargin: `${rootMargin}px`,
        threshold,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [enabled, rootMargin, scrollRootRef, threshold, sentinelRef]);
};
