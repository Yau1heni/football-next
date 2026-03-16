import type { FormationShape, PlayerOnBoard } from '@shared-types/tactics.types';
import { findNearestFreeSlotIndex } from '@utils/find-nearest-free-slot';
import { useMemo } from 'react';

/**
 * Вычисляет индекс слота для подсветки при перетаскивании:
 * над полем — ближайший свободный слот к позиции курсора;
 * над игроком (обмен) — слот этого игрока.
 */
export const useTacticsHighlightedSlot = (
  slots: FormationShape,
  occupiedSlots: Set<number>,
  players: PlayerOnBoard[],
  activeId: string | null,
  overId: string | null,
  dropPositionPercent: { x: number; y: number } | null
): number | null =>
  useMemo(() => {
    if (activeId == null || overId == null) return null;
    if (overId === 'field') {
      if (dropPositionPercent == null) return null;
      const idx = findNearestFreeSlotIndex(
        slots,
        occupiedSlots,
        dropPositionPercent.x,
        dropPositionPercent.y
      );
      return idx >= 0 ? idx : null;
    }
    const overPlayer = players.find((p) => p.id === overId && p.position != null);
    return overPlayer?.slotIndex ?? null;
  }, [activeId, overId, dropPositionPercent, slots, occupiedSlots, players]);
