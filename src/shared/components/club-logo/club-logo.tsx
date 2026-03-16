'use client';

import { HeartIcon } from '@components/ui/icons';
import { CLUB_LOGO_SIZE_M, CLUB_LOGO_SIZE_S, DEFAULT_CLUB_IMAGE } from '@constants/images';
import cn from 'classnames';
import Image from 'next/image';
import type { FC } from 'react';

import styles from './club-logo.module.scss';

type ClubLogoProps = {
  logo: string | null;
  isFavorite?: boolean;
  size?: 's' | 'm';
  className?: string;
  loading?: 'eager' | 'lazy';
};

export const ClubLogo: FC<ClubLogoProps> = (props) => {
  const { logo, isFavorite = false, size = 'm', className, loading = 'lazy' } = props;

  return (
    <div
      className={cn(
        styles.clubLogo,
        size === 's' ? styles.clubLogoSizeS : styles.clubLogoSizeM,
        className
      )}
    >
      <Image
        className={styles.image}
        src={logo ?? DEFAULT_CLUB_IMAGE}
        alt={'Логотип клуба'}
        width={size === 's' ? CLUB_LOGO_SIZE_S : CLUB_LOGO_SIZE_M}
        height={size === 's' ? CLUB_LOGO_SIZE_S : CLUB_LOGO_SIZE_M}
        sizes={size === 's' ? '120px' : '280px'}
        loading={loading}
      />
      {isFavorite && (
        <span className={styles.favoriteBadge}>
          <HeartIcon aria-label={'В избранном'} />
        </span>
      )}
    </div>
  );
};
