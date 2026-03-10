/**
 * Нужно ли засчитать просмотр: последний просмотр был в другой день (по UTC) или его не было.
 * @param lastViewMs — мс последнего засчитанного просмотра (timestamp с сервера) или null
 */
export const shouldCountArticleView = (lastViewMs: number | null): boolean => {
  if (lastViewMs == null) return true;
  const now = new Date();
  const startOfTodayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return lastViewMs < startOfTodayUtc;
};
