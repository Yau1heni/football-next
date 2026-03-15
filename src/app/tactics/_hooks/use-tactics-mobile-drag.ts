'use client';

import { RATIO_TO_PERCENT_FACTOR } from '@constants/tactics';
import type { SensorDescriptor, SensorOptions } from '@dnd-kit/core';
import { PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useEffect } from 'react';

type FieldPercent = { x: number; y: number };

type FieldRectRef = { current: DOMRect | null };
type LastPointerRef = { current: { x: number; y: number } | null };

/**
 * Логика перетаскивания (мышь + тач): сенсоры и обновление позиции при тач-драге.
 * При тач-драге pointermove идёт по overlay, не по полю — слушаем document,
 * обновляем lastPointerRef и позицию в % поля, чтобы дроп на пустой слот работал.
 */
export const useTacticsMobileDrag = (
  activeId: string | null,
  setDropPositionPercent: (pos: FieldPercent | null) => void,
  fieldRectRef: FieldRectRef,
  lastPointerRef: LastPointerRef
): { sensors: SensorDescriptor<SensorOptions>[] } => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 8 } })
  );

  useEffect(() => {
    if (activeId == null) return;
    const handlePointerMove = (e: PointerEvent) => {
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      const rect = fieldRectRef.current;
      if (!rect || rect.width === 0 || rect.height === 0) {
        setDropPositionPercent(null);
        return;
      }
      const x = ((e.clientX - rect.left) / rect.width) * RATIO_TO_PERCENT_FACTOR;
      const y = ((e.clientY - rect.top) / rect.height) * RATIO_TO_PERCENT_FACTOR;
      setDropPositionPercent({ x, y });
    };
    document.addEventListener('pointermove', handlePointerMove);
    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, [activeId, setDropPositionPercent, fieldRectRef, lastPointerRef]);

  return { sensors };
};
