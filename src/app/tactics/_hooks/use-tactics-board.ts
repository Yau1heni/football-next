import {
  DEFAULT_FORMATION_ID,
  FORMATIONS,
  RATIO_TO_PERCENT_FACTOR,
  TACTICS_ROSTER_SIZE,
} from '@constants/tactics';
import type { PlayerOnBoard, Position } from '@shared-types/tactics.types';
import { findNearestFreeSlotIndex } from '@utils/find-nearest-free-slot';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Хук состояния тактической доски: игроки, формация, слоты.
 * Хранит последние clientX/clientY над полем и rect поля;
 * в момент дропа переводит позицию в проценты (0–100) по актуальному rect.
 */

const createInitialPlayers = (): PlayerOnBoard[] =>
  Array.from({ length: TACTICS_ROSTER_SIZE }, (_, i) => ({
    id: `player-${i + 1}`,
    number: i + 1,
  }));

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Индекс слота, ближайшего к точке (px, py), без учёта занятости. */
const findNearestSlotIndex = (
  slots: { x: number; y: number }[],
  px: number,
  py: number
): number => {
  if (slots.length === 0) return -1;
  let best = 0;
  let bestDist = (slots[0].x - px) ** 2 + (slots[0].y - py) ** 2;
  slots.forEach((s, i) => {
    const d = (s.x - px) ** 2 + (s.y - py) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
};

/** Обмен двух игроков: перетаскиваемый — на целевую позицию, занявший — на место перетаскиваемого или на скамейку. */
const applySwap = (
  prev: PlayerOnBoard[],
  draggedId: string,
  occupantId: string,
  pos: Position,
  slots: { x: number; y: number }[]
): PlayerOnBoard[] => {
  const dragged = prev.find((p) => p.id === draggedId);
  const occupant = prev.find((p) => p.id === occupantId);
  if (!dragged || !occupant) return prev;

  const draggedWasOnBench = dragged.position == null;
  const targetSlotIdx = findNearestSlotIndex(slots, pos.x, pos.y);
  const targetPosition: Position =
    targetSlotIdx >= 0
      ? { x: slots[targetSlotIdx].x, y: slots[targetSlotIdx].y }
      : { x: clamp(pos.x, 2, 98), y: clamp(pos.y, 2, 98) };

  return prev.map((p) => {
    if (p.id === draggedId) {
      return {
        ...p,
        position: targetPosition,
        slotIndex: targetSlotIdx >= 0 ? targetSlotIdx : undefined,
      };
    }
    if (p.id === occupantId) {
      if (draggedWasOnBench) {
        return { id: p.id, number: p.number };
      }
      return {
        ...p,
        position: dragged.position,
        slotIndex: dragged.slotIndex,
      };
    }
    return p;
  });
};

export const useTacticsBoard = () => {
  const [players, setPlayers] = useState<PlayerOnBoard[]>(createInitialPlayers);
  const [formationId, setFormationId] = useState(DEFAULT_FORMATION_ID);

  const playersRef = useRef(players);
  useEffect(() => {
    playersRef.current = players;
  });

  /** Последние clientX/clientY над полем. В handleDragEnd переводим в % по актуальному rect. */
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const fieldRectRef = useRef<DOMRect | null>(null);

  const setLastPointer = useCallback((x: number, y: number) => {
    lastPointerRef.current = { x, y };
  }, []);

  const setFieldRect = useCallback((rect: DOMRect | null) => {
    fieldRectRef.current = rect;
  }, []);

  const pointerToFieldPercent = useCallback((): Position | null => {
    const rect = fieldRectRef.current;
    const ptr = lastPointerRef.current;
    if (!rect || !ptr || rect.width === 0 || rect.height === 0) return null;
    const x = ((ptr.x - rect.left) / rect.width) * RATIO_TO_PERCENT_FACTOR;
    const y = ((ptr.y - rect.top) / rect.height) * RATIO_TO_PERCENT_FACTOR;
    return { x, y };
  }, []);

  const slots = FORMATIONS[formationId] ?? FORMATIONS[DEFAULT_FORMATION_ID];
  const occupiedSlots = useMemo(
    () => new Set(players.filter((p) => p.slotIndex != null).map((p) => p.slotIndex as number)),
    [players]
  );

  /** Ставит игрока на поле — привязка к ближайшему свободному слоту формации. */
  const moveToField = useCallback(
    (playerId: string, position: Position) => {
      setPlayers((prev) => {
        const occupiedExcludingSelf = new Set(
          prev
            .filter((p) => p.slotIndex != null && p.id !== playerId)
            .map((p) => p.slotIndex as number)
        );
        const idx = findNearestFreeSlotIndex(slots, occupiedExcludingSelf, position.x, position.y);
        if (idx < 0) return prev;
        const slot = slots[idx];
        return prev.map((p) =>
          p.id !== playerId
            ? p
            : {
                ...p,
                position: { x: slot.x, y: slot.y },
                slotIndex: idx,
              }
        );
      });
    },
    [slots]
  );

  /** Снимает одного игрока с поля (оставляет только id и number). */
  const moveToBench = useCallback((playerId: string) => {
    setPlayers((prev) => prev.map((p) => (p.id === playerId ? { id: p.id, number: p.number } : p)));
  }, []);

  /** Снимает всех игроков с поля на скамейку. Вызывается при смене формации. */
  const moveAllToBench = useCallback(() => {
    setPlayers((prev) => prev.map((p) => ({ id: p.id, number: p.number })));
  }, []);

  const handleDragStart = useCallback(() => {
    lastPointerRef.current = null;
  }, []);

  /**
   * Обработчик завершения перетаскивания.
   * — Дроп на карточку игрока на поле → обмен.
   * — Дроп на поле (пустая зона) → поставить в ближайший свободный слот.
   * — Дроп на скамейку или мимо (overId не поле/не карточка) → на скамейку.
   */
  const handleDragEnd = useCallback(
    (event: { active: { id: string }; over: { id: string } | null }) => {
      const playerId = String(event.active.id);
      const overId = event.over?.id ?? null;

      /** Дроп на свою же позицию (свой droppable) — ничего не делаем. */
      if (overId === playerId) return;

      if (overId === 'bench') {
        moveToBench(playerId);
        return;
      }

      const droppedOnPlayer = playersRef.current.find(
        (p) => p.id === overId && p.position != null && p.id !== playerId
      );
      if (droppedOnPlayer) {
        setPlayers((prev) =>
          applySwap(prev, playerId, droppedOnPlayer.id, droppedOnPlayer.position!, slots)
        );
        return;
      }

      if (overId === 'field') {
        const pos = pointerToFieldPercent();
        if (pos) moveToField(playerId, pos);
        else moveToBench(playerId);
        return;
      }

      moveToBench(playerId);
    },
    [moveToBench, moveToField, slots, pointerToFieldPercent]
  );

  const onFormationChangeAction = useCallback(
    (id: string) => {
      setFormationId(id);
      moveAllToBench();
    },
    [setFormationId, moveAllToBench]
  );

  const onResetLineupAction = useCallback(() => {
    moveAllToBench();
  }, [moveAllToBench]);

  /** Применить сохранённую тактику: формация и расстановка игроков. */
  const applySavedTacticsAction = useCallback(
    (nextFormationId: string, nextPlayers: PlayerOnBoard[]) => {
      setFormationId(nextFormationId);
      setPlayers(nextPlayers);
    },
    []
  );

  const hasPlayersOnField = players.some((p) => p.position != null);

  return {
    players,
    formationId,
    setFormationId,
    applySavedTacticsAction,
    moveAllToBench,
    slots,
    occupiedSlots,
    hasPlayersOnField,
    setLastPointer,
    setFieldRect,
    fieldRectRef,
    lastPointerRef,
    handleDragStart,
    handleDragEnd,
    onFormationChangeAction,
    onResetLineupAction,
    moveToField,
    moveToBench,
  };
};
