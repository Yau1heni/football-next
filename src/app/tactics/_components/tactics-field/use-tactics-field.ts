import type { PointerEvent } from 'react';
import { useCallback, useEffect, useRef } from 'react';

type UseTacticsFieldParams = {
  onFieldPointerMoveAction: (clientX: number, clientY: number) => void;
  onFieldRectChangeAction: (rect: DOMRect | null) => void;
  onDropPositionChangeAction?: (pos: { x: number; y: number } | null) => void;
  /** Ref from useDroppable — хук объединяет его с внутренним containerRef. */
  mergeWithRef?: (node: HTMLDivElement | null) => void;
};

/** Хук: ref контейнера поля, обновление rect при resize/scroll, расчёт позиции в % при pointer move. */
export const useTacticsField = (params: UseTacticsFieldParams) => {
  const {
    onFieldPointerMoveAction,
    onFieldRectChangeAction,
    onDropPositionChangeAction,
    mergeWithRef,
  } = params;

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      onFieldRectChangeAction(null);
      return;
    }
    const update = () => {
      const current = containerRef.current;
      if (current) onFieldRectChangeAction(current.getBoundingClientRect());
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    document.addEventListener('scroll', update, true);
    return () => {
      ro.disconnect();
      document.removeEventListener('scroll', update, true);
    };
  }, [onFieldRectChangeAction]);

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      onFieldPointerMoveAction(e.clientX, e.clientY);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect && onDropPositionChangeAction) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        onDropPositionChangeAction({ x, y });
      }
    },
    [onFieldPointerMoveAction, onDropPositionChangeAction]
  );

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      mergeWithRef?.(node);
    },
    [mergeWithRef]
  );

  return { setRef, handlePointerMove };
};
