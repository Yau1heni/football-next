import classnames from 'classnames';
import type { FC, ReactNode } from 'react';

import styles from './field.module.scss';

type FieldContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Соотношение сторон поля ~105/68 */
const FIELD_ASPECT_RATIO = 105 / 68;

export const FieldContainer: FC<FieldContainerProps> = ({ children, className }) => (
  <div
    className={classnames(styles.fieldContainer, className)}
    style={{ aspectRatio: `${FIELD_ASPECT_RATIO} / 1` }}
  >
    {children}
  </div>
);
