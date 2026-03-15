/** Нормализованные координаты 0–100 (viewBox поля) */
export type Position = { x: number; y: number };

/** Игрок на доске: на поле (x, y или slotId) или на скамейке (нет координат) */
export type PlayerOnBoard = {
  id: string;
  number: number;
  /** Позиция на поле (проценты). Нет — на скамейке */
  position?: Position;
  /** Привязка к слоту формации */
  slotIndex?: number;
};

/** Слот формации — точка привязки в нормализованных координатах */
export type FormationSlot = Position;

/** Описание формации: массив слотов по порядку */
export type FormationShape = FormationSlot[];

/** Режим тактической доски */
export type TacticsViewMode = 'drag' | 'draw';

/** Цвет штриха рисования */
export type DrawingStrokeColor = 'black' | 'white' | 'red' | 'green';
