'use client';

import { Skeleton } from '@components/ui/skeleton';
import { Typography } from '@components/ui/typography';
import { CONTENT_CONTAINER_EMBLEM_SIZE } from '@constants/images';
import Image from 'next/image';
import type { FC, ReactNode } from 'react';

import styles from './content-container.module.scss';

type ContentContainerProps = {
  children: ReactNode;
  title?: string;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  isSkeleton?: boolean;
  image?: string;
};

export const ContentContainer: FC<ContentContainerProps> = (props) => {
  const { children, title, titleTag = 'h2', image, isSkeleton } = props;

  return (
    <section className={styles.contentContainer}>
      <div className={styles.contentHeader}>
        <div>
          {isSkeleton ? (
            <Skeleton variant={'text'} width={200} height={32} />
          ) : (
            <Typography
              tag={titleTag}
              className={styles.sectionTitle}
              maxLines={2}
              view={'sectionTitle'}
            >
              {title}
            </Typography>
          )}
        </div>
        {image != null && image !== '' && (
          <Image
            src={image}
            alt={'Эмблема'}
            width={CONTENT_CONTAINER_EMBLEM_SIZE}
            height={CONTENT_CONTAINER_EMBLEM_SIZE}
            sizes={`${CONTENT_CONTAINER_EMBLEM_SIZE}px`}
          />
        )}
      </div>
      {children}
    </section>
  );
};
