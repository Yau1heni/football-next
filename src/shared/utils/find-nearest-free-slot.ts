/**
 * Возвращает индекс ближайшего свободного слота к точке (px, py) в процентах поля (0–100).
 * Занятые слоты задаются множеством индексов.
 */
export const findNearestFreeSlotIndex = (
  slotList: { x: number; y: number }[],
  occupied: Set<number>,
  px: number,
  py: number
): number => {
  let best = -1;
  let bestDist = Infinity;
  slotList.forEach((s, i) => {
    if (occupied.has(i)) return;
    const d = (s.x - px) ** 2 + (s.y - py) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
};
