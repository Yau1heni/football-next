import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import type { PlayerOnBoard } from '@shared-types/tactics.types';
import { useCallback, useEffect, useRef, useState } from 'react';

const DROP_POSITION_THROTTLE_MS = 80;

type DropPosition = { x: number; y: number } | null;

/**
 * Хук состояния DnD для тактической доски: активный перетаскиваемый игрок,
 * текущая цель (over) и позиция курсора над полем в %.
 * Пробрасывает события в handleDragStart/handleDragEnd из useTacticsBoard и сбрасывает состояние по окончании дропа.
 * setDropPositionPercent троттлится, чтобы не вызывать лишние ре-рендеры при движении мыши.
 */
export const useTacticsDndState = (
  players: PlayerOnBoard[],
  handleDragStart: () => void,
  handleDragEnd: (event: { active: { id: string }; over: { id: string } | null }) => void
) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [dropPositionPercent, setDropPositionPercentState] = useState<DropPosition>(null);

  const latestPosRef = useRef<DropPosition>(null);
  const throttleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastUpdateRef = useRef(0);

  const setDropPositionPercent = useCallback((pos: DropPosition) => {
    latestPosRef.current = pos;
    const now = Date.now();
    const elapsed = now - lastUpdateRef.current;
    if (elapsed >= DROP_POSITION_THROTTLE_MS || lastUpdateRef.current === 0) {
      lastUpdateRef.current = now;
      setDropPositionPercentState(pos);
    } else if (throttleTimeoutRef.current == null) {
      throttleTimeoutRef.current = setTimeout(() => {
        throttleTimeoutRef.current = null;
        lastUpdateRef.current = Date.now();
        setDropPositionPercentState(latestPosRef.current);
      }, DROP_POSITION_THROTTLE_MS - elapsed);
    }
  }, []);

  useEffect(
    () => () => {
      if (throttleTimeoutRef.current != null) {
        clearTimeout(throttleTimeoutRef.current);
      }
    },
    []
  );

  const onDragStart = useCallback(
    (event: DragStartEvent) => {
      handleDragStart();
      setActiveId(String(event.active.id));
    },
    [handleDragStart]
  );

  const onDragOver = useCallback((event: DragOverEvent) => {
    setOverId(event.over ? String(event.over.id) : null);
  }, []);

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      handleDragEnd({
        active: { id: String(event.active.id) },
        over: event.over ? { id: String(event.over.id) } : null,
      });
      setActiveId(null);
      setOverId(null);
      setDropPositionPercentState(null);
      latestPosRef.current = null;
    },
    [handleDragEnd]
  );

  const activePlayer: PlayerOnBoard | undefined =
    activeId != null ? players.find((p) => p.id === activeId) : undefined;

  return {
    activeId,
    overId,
    dropPositionPercent,
    setDropPositionPercent,
    onDragStart,
    onDragOver,
    onDragEnd,
    activePlayer,
  };
};
