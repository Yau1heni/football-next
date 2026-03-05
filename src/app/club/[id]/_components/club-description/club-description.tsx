'use client';

import { ContentContainer } from '@components/content-container';
import { SocialLinks } from '@components/social-links';
import { Typography } from '@components/ui/typography';
import type { SocialIconType } from '@shared-types/clubs.types';
import type { FC } from 'react';

import styles from './club-description.module.scss';

type ClubDescriptionProps = {
  ground: string;
  country: string;
  founded: number;
  city: string;
  website: string;
  social: SocialIconType[];
};

export const ClubDescription: FC<ClubDescriptionProps> = (props) => {
  const { ground, country, founded, city, website, social } = props;

  return (
    <ContentContainer title={'Информация о клубе'}>
      <div className={styles.clubDescription}>
        <div className={styles.infoBlock}>
          <div className={styles.infoRow}>
            <Typography tag={'span'} className={styles.label}>
              Город
            </Typography>
            <Typography className={styles.value} tag={'span'}>
              {city}
            </Typography>
          </div>
          <div className={styles.infoRow}>
            <Typography tag={'span'} className={styles.label}>
              Страна
            </Typography>
            <Typography className={styles.value} tag={'span'}>
              {country}
            </Typography>
          </div>
          <div className={styles.infoRow}>
            <Typography tag={'span'} className={styles.label}>
              Год основания
            </Typography>
            <Typography className={styles.value} tag={'span'}>
              {founded}
            </Typography>
          </div>
          <div className={styles.infoRow}>
            <Typography tag={'span'} className={styles.label}>
              Стадион
            </Typography>
            <Typography className={styles.value} tag={'span'}>
              {ground}
            </Typography>
          </div>
          {website != null && website !== '' && (
            <a
              href={website}
              target={'_blank'}
              rel={'noopener noreferrer'}
              className={styles.websiteLink}
            >
              {website}
            </a>
          )}
        </div>
        <SocialLinks socials={social} />
      </div>
    </ContentContainer>
  );
};
