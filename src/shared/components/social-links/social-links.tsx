'use client';

import { Typography } from '@components/ui/typography';
import type { SocialIconType } from '@shared-types/clubs.types';
import { getSocialIcon } from '@utils/get-social-icon';
import type { FC } from 'react';

import styles from './social-links.module.scss';

type SocialLinksProps = {
  socials: SocialIconType[];
};

const SOCIAL_ICON_SIZE = 24;

export const SocialLinks: FC<SocialLinksProps> = ({ socials }) => {
  if (socials.length === 0) return null;

  return (
    <div className={styles.socialLinks}>
      {socials.map(({ name, link }) => {
        const IconComponent = getSocialIcon(name);
        return (
          <a
            key={name}
            href={link}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={styles.socialLink}
          >
            <IconComponent width={SOCIAL_ICON_SIZE} height={SOCIAL_ICON_SIZE} />
            <Typography className={styles.socialName}>{name}</Typography>
          </a>
        );
      })}
    </div>
  );
};
