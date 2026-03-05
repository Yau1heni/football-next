'use client';

import { EmptyIcon, ErrorIcon } from '@components/ui/icons';
import { Typography } from '@components/ui/typography';
import cn from 'classnames';
import type { FC, ReactNode } from 'react';

import styles from './state-message.module.scss';
import { DEFAULT_TEXTS, type StateMessageVariant } from './state-message-constant';

export type { StateMessageVariant };

export type StateMessageProps = {
  variant: StateMessageVariant;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export const StateMessage: FC<StateMessageProps> = (props) => {
  const { variant, title, description, action, className } = props;

  const defaults = DEFAULT_TEXTS[variant];
  const finalTitle = title ?? defaults.title;
  const finalDescription = description ?? defaults.description;
  const icon = variant === 'error' ? <ErrorIcon /> : <EmptyIcon />;

  return (
    <div
      className={cn(styles.stateMessage, styles[variant], className)}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      <div className={styles.icon}>{icon}</div>
      <Typography tag={'h2'} view={'sectionTitle'} weight={'bold'} className={styles.title}>
        {finalTitle}
      </Typography>
      {finalDescription && (
        <Typography view={'p-16'} color={'secondary'} className={styles.description}>
          {finalDescription}
        </Typography>
      )}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};
