type Point = { x: number; y: number };

/** Преобразует массив точек в SVG path (d) для линии. */
export const pointsToPath = (points: Point[]): string => {
  if (points.length === 0) return '';
  const [first, ...rest] = points;
  const restPath = rest.map((p) => `L ${p.x} ${p.y}`).join(' ');
  return `M ${first.x} ${first.y} ${restPath}`;
};
