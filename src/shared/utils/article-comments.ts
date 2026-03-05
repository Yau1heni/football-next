import { LOCALE_RU, RU_COMMENT_LABELS } from '@constants/plural-forms';

import { plural } from './plural';

/** Подпись количества комментариев в нужной форме (1 комментарий, 2 комментария, 5 комментариев). */
export const getCommentsCountLabel = (count: number, locale = LOCALE_RU): string =>
  plural(count, RU_COMMENT_LABELS, locale);
