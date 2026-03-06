import { LOCALE_RU } from '@constants/plural-forms';

type TimestampLike = number | { toDate?: () => Date };

const toDate = (value: TimestampLike): Date | null => {
  if (typeof value === 'number') return new Date(value);
  if (typeof value.toDate === 'function') return value.toDate();
  return null;
};

/**
 * Форматирует timestamp (мс или Firestore Timestamp) в строку даты/времени по локали.
 * @param value — число миллисекунд (epoch) или объект с методом toDate()
 */
export const formatTimestamp = (value: TimestampLike | null | undefined): string => {
  if (value == null) return '';
  const date = toDate(value);
  if (date == null || Number.isNaN(date.getTime())) return '';
  return date.toLocaleString(LOCALE_RU);
};
