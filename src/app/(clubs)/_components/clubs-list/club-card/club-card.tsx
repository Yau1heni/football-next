'use client';

import { HtmlContent } from '@components/html-content';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { HeartIcon } from '@components/ui/icons/heart-icon';
import { Typography } from '@components/ui/typography';
import { routes } from '@configs/routes';
import { DEFAULT_CLUB_IMAGE } from '@constants/images';
import type { Club } from '@shared-types/clubs.types';
import Link from 'next/link';
import { memo, type MouseEvent } from 'react';

import styles from './club-card.module.scss';

const CLUB_IMAGE_WIDTH = 240;
const CLUB_IMAGE_HEIGHT = 240;

type ClubCardProps = {
  club: Club;
  isFavorite?: boolean;
  onToggleFavorite?: (clubId: string, isCurrentlyFavorite: boolean, clubName?: string) => void;
  isToggleLoading?: boolean;
  imageLoading?: 'eager' | 'lazy';
};

export const ClubCard = memo<ClubCardProps>((props) => {
  const {
    club,
    isFavorite = false,
    onToggleFavorite,
    isToggleLoading = false,
    imageLoading,
  } = props;

  const handleToggleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(club.id, isFavorite, club.name);
  };

  return (
    <Link className={styles.clubCard} href={routes.club.create(club.id)}>
      <Card
        title={club.name}
        image={club.logo || DEFAULT_CLUB_IMAGE}
        imageWidth={CLUB_IMAGE_WIDTH}
        imageHeight={CLUB_IMAGE_HEIGHT}
        imageClassName={styles.cardImageCompact}
        imageLoading={imageLoading}
        subtitle={club.country}
        statusSlot={isFavorite && <HeartIcon aria-label={'В избранном'} />}
        captionSlot={
          <Typography tag={'div'} maxLines={3}>
            <HtmlContent html={club.history} />
          </Typography>
        }
        actionSlot={
          <Button
            className={styles.actionSlot}
            onClick={handleToggleClick}
            loading={isToggleLoading}
          >
            <Typography view={'button'} maxLines={1} color={'light'}>
              {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            </Typography>
          </Button>
        }
      />
    </Link>
  );
});

ClubCard.displayName = 'ClubCard';
