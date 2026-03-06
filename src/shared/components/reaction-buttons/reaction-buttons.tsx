'use client';

import { Button } from '@components/ui/button';
import { DislikeIcon, LikeIcon } from '@components/ui/icons';
import { Typography } from '@components/ui/typography';
import { REACTION, type ReactionType } from '@shared-types/articles.types';
import cn from 'classnames';
import type { FC } from 'react';

import styles from './reaction-buttons.module.scss';

export type ReactionButtonsSize = 's' | 'm';

export type ReactionButtonsProps = {
  likesCount: number;
  dislikesCount: number;
  userReaction: ReactionType | null;
  /** Server Action или колбэк для лайка (именование *Action — требование Next.js для сериализуемых пропсов). */
  onLikeAction: () => void;
  /** Server Action или колбэк для дизлайка (именование *Action — требование Next.js для сериализуемых пропсов). */
  onDislikeAction: () => void;
  size?: ReactionButtonsSize;
  className?: string;
  disabled?: boolean;
};

const ICON_SIZE_MAP = { s: 16, m: 20 } as const;

export const ReactionButtons: FC<ReactionButtonsProps> = (props) => {
  const {
    likesCount,
    dislikesCount,
    userReaction,
    onLikeAction,
    onDislikeAction,
    size = 'm',
    className,
    disabled = false,
  } = props;

  const iconSize = ICON_SIZE_MAP[size];

  return (
    <div
      className={cn(
        styles.reactionButtons,
        size === 's' ? styles.reactionButtonsSizeS : styles.reactionButtonsSizeM,
        className
      )}
    >
      <Button
        variant={'ghost'}
        className={cn(styles.trigger, userReaction === REACTION.LIKE && styles.triggerActive)}
        onClick={onLikeAction}
        aria-label={'Лайк'}
        disabled={disabled}
      >
        <LikeIcon
          width={iconSize}
          height={iconSize}
          className={cn(styles.icon, userReaction === REACTION.LIKE && styles.iconFilled)}
        />
        <Typography tag={'span'} className={styles.count}>
          {likesCount}
        </Typography>
      </Button>
      <Button
        variant={'ghost'}
        className={cn(styles.trigger, userReaction === REACTION.DISLIKE && styles.triggerActive)}
        onClick={onDislikeAction}
        aria-label={'Дизлайк'}
        disabled={disabled}
      >
        <DislikeIcon
          width={iconSize}
          height={iconSize}
          className={cn(styles.icon, userReaction === REACTION.DISLIKE && styles.iconFilled)}
        />
        <Typography tag={'span'} className={styles.count}>
          {dislikesCount}
        </Typography>
      </Button>
    </div>
  );
};
