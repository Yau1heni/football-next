import type { FC } from 'react';

import styles from './field.module.scss';

/** Диаметр центрального круга в % от viewBox (9.15 * 2). */
const CENTER_CIRCLE_SIZE_PERCENT = 18.3;

export const FieldSvg: FC = () => (
  <>
    <svg className={styles.fieldSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <rect className={styles.grass} x={0} y={0} width={100} height={100} />
      <g className={styles.lines} strokeWidth={0.8} fill="none">
        <rect x={2} y={2} width={96} height={96} />
        <line x1={50} y1={2} x2={50} y2={98} />
        <circle cx={50} cy={50} r={0.5} />
        <rect x={2} y={20} width={16} height={60} />
        <rect x={2} y={32} width={6} height={36} />
        <rect x={82} y={20} width={16} height={60} />
        <rect x={92} y={32} width={6} height={36} />
      </g>
    </svg>
    <div
      className={styles.centerCircle}
      style={{
        width: `${CENTER_CIRCLE_SIZE_PERCENT}%`,
        paddingBottom: `${CENTER_CIRCLE_SIZE_PERCENT}%`,
      }}
      aria-hidden
    />
  </>
);
