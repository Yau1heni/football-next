import type {
  DrawingStrokeColor,
  FormationShape,
  TacticsViewMode,
} from '@shared-types/tactics.types';

/** Количество игроков в выборе (основной состав + запасные) */
export const TACTICS_ROSTER_SIZE = 15;

/** Минимум игроков на поле для сохранения схемы */
export const MIN_PLAYERS_ON_FIELD_TO_SAVE = 11;

/** Максимальное количество сохранённых схем у пользователя */
export const MAX_SAVED_TACTICS = 5;

/** Множитель перевода доли (0–1) в проценты (0–100) для координат на поле */
export const RATIO_TO_PERCENT_FACTOR = 100;

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

/** Опции переключателя режима «Расставлять / Рисовать» */
export const VIEW_MODE_OPTIONS: { value: TacticsViewMode; label: string }[] = [
  { value: 'drag', label: 'Расставлять' },
  { value: 'draw', label: 'Рисовать' },
];

/** Цвета маркера (hex для отображения на зелёном поле) */
export const STROKE_COLOR_HEX: Record<DrawingStrokeColor, string> = {
  black: '#1a1a1a',
  white: '#ffffff',
  red: '#c62828',
  green: '#b8e62a',
};

/** Опции выбора цвета маркера (value + ariaLabel для доступности) */
export const STROKE_COLOR_OPTIONS: { value: DrawingStrokeColor; ariaLabel: string }[] = [
  { value: 'black', ariaLabel: 'Черный' },
  { value: 'white', ariaLabel: 'Белый' },
  { value: 'red', ariaLabel: 'Красный' },
  { value: 'green', ariaLabel: 'Зелёный' },
];
