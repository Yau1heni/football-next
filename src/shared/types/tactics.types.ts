/** Нормализованные координаты 0–100 (viewBox поля) */
export type Position = { x: number; y: number };

/** Точка штриха рисования на поле (нормализованные координаты) */
export type DrawingPoint = { x: number; y: number };

/** Штрих рисования: массив точек и цвет */
export type DrawingStroke = {
  points: DrawingPoint[];
  color: DrawingStrokeColor;
};

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

/** Данные схемы тактики для сохранения в Firestore */
export type SaveTacticsPayload = {
  name: string;
  formationId: string;
  players: PlayerOnBoard[];
  drawingStrokes: DrawingStroke[];
};

/** Значение даты из Firestore (serverTimestamp) или число мс — для formatTimestamp */
export type FirestoreTimestampLike = number | { toDate?: () => Date } | null | undefined;

/** Элемент списка сохранённых тактик (из Firestore) */
export type SavedTacticListItem = {
  id: string;
  name: string;
  createdAt: FirestoreTimestampLike;
};

/** Полные данные сохранённой тактики (для применения на доску) */
export type SavedTacticDetail = SaveTacticsPayload & {
  id: string;
  createdAt: unknown;
};
