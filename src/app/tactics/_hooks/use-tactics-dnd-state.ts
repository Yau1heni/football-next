import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import type { PlayerOnBoard } from '@shared-types/tactics.types';
import { useCallback, useState } from 'react';

/**
 * Хук состояния DnD для тактической доски: активный перетаскиваемый игрок,
 * текущая цель (over) и позиция курсора над полем в %.
 * Пробрасывает события в handleDragStart/handleDragEnd из useTacticsBoard и сбрасывает состояние по окончании дропа.
 */
export const useTacticsDndState = (
  players: PlayerOnBoard[],
  handleDragStart: () => void,
  handleDragEnd: (event: { active: { id: string }; over: { id: string } | null }) => void
) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [dropPositionPercent, setDropPositionPercent] = useState<{
    x: number;
    y: number;
  } | null>(null);

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
      setDropPositionPercent(null);
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
