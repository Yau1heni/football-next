import type { FormationShape } from '@shared-types/tactics.types';

/** Количество игроков в выборе (основной состав + запасные) */
export const TACTICS_ROSTER_SIZE = 15;

/** Формации: id → массив слотов {x,y} в нормализованных координатах 0–100. Ворота слева (вратарь x≈8). */
export const FORMATIONS: Record<string, FormationShape> = {
  '4-4-2': [
    { x: 8, y: 50 },
    { x: 18, y: 90 },
    { x: 18, y: 63 },
    { x: 18, y: 37 },
    { x: 18, y: 10 },
    { x: 38, y: 90 },
    { x: 38, y: 63 },
    { x: 38, y: 37 },
    { x: 38, y: 10 },
    { x: 58, y: 62 },
    { x: 58, y: 38 },
  ],
  '4-3-3': [
    { x: 8, y: 50 },
    { x: 18, y: 90 },
    { x: 18, y: 63 },
    { x: 18, y: 37 },
    { x: 18, y: 10 },
    { x: 38, y: 70 },
    { x: 38, y: 50 },
    { x: 38, y: 30 },
    { x: 58, y: 80 },
    { x: 58, y: 50 },
    { x: 58, y: 20 },
  ],
  '5-3-2': [
    { x: 8, y: 50 },
    { x: 18, y: 90 },
    { x: 18, y: 70 },
    { x: 18, y: 50 },
    { x: 18, y: 30 },
    { x: 18, y: 10 },
    { x: 38, y: 70 },
    { x: 38, y: 50 },
    { x: 38, y: 30 },
    { x: 58, y: 62 },
    { x: 58, y: 38 },
  ],
  '3-5-2': [
    { x: 8, y: 50 },
    { x: 18, y: 75 },
    { x: 18, y: 50 },
    { x: 18, y: 25 },
    { x: 38, y: 90 },
    { x: 38, y: 70 },
    { x: 38, y: 50 },
    { x: 38, y: 30 },
    { x: 38, y: 10 },
    { x: 58, y: 62 },
    { x: 58, y: 38 },
  ],
};

export const DEFAULT_FORMATION_ID = '4-4-2';

export const FORMATION_OPTIONS = Object.keys(FORMATIONS).map((id) => ({ key: id, value: id }));
