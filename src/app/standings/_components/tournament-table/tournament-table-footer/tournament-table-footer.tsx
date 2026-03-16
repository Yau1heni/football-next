import { ColoredDots } from '@components/colored-dots';
import { Typography } from '@components/ui/typography';

import { FORM_LEGEND_ITEMS } from '../get-tournament-columns';
import styles from './tournament-table-footer.module.scss';

const FORM_LABELS = ['победа', 'ничья', 'поражение'] as const;

export const TournamentTableFooter = () => (
  <div className={styles.footerLegend}>
    <Typography view={'p-14'}>И — игры</Typography>
    <Typography view={'p-14'} className={styles.hideMobile}>
      В — победы
    </Typography>
    <Typography view={'p-14'} className={styles.hideMobile}>
      Н — ничьи
    </Typography>
    <Typography view={'p-14'} className={styles.hideMobile}>
      П — поражения
    </Typography>
    <Typography view={'p-14'} className={styles.hideMobile}>
      Голы — забито:пропущено
    </Typography>
    <Typography view={'p-14'} className={styles.hideTablet}>
      Разн. — разница голов
    </Typography>
    <Typography view={'p-14'}>О — очки</Typography>
    <div className={styles.formLegend + ' ' + styles.hideTablet}>
      <Typography view={'p-14'}>Форма — последние результаты</Typography>
      <span className={styles.formLegendDots}>
        {FORM_LEGEND_ITEMS.map((item, index) => (
          <span key={item.letter} className={styles.formLegendItem}>
            {index > 0 && (
              <Typography view={'p-14'} className={styles.formLegendSep}>
                ·
              </Typography>
            )}
            <ColoredDots items={[item]} />
            <Typography view={'p-14'}>{FORM_LABELS[index]}</Typography>
          </span>
        ))}
      </span>
    </div>
  </div>
);
