'use client';

import { Typography } from '@components/ui/typography';
import { DEFAULT_IMAGE_HEIGHT, DEFAULT_IMAGE_WIDTH } from '@constants/images';
import cn from 'classnames';
import Image from 'next/image';
import { type FC, type MouseEventHandler, type ReactNode } from 'react';

import styles from './card.module.scss';

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: ReactNode;
  /** Описание карточки */
  subtitle: ReactNode;
  /** Дополнительный classname */
  className?: string;
  /** Ширина изображения (для next/image) */
  imageWidth?: number;
  /** Высота изображения (для next/image) */
  imageHeight?: number;
  /** Дополнительный classname для контейнера изображения */
  imageClassName?: string;
  /** Загрузка: eager для above-the-fold (LCP), иначе lazy */
  imageLoading?: 'eager' | 'lazy';
  /** Слот над заголовком */
  captionSlot?: ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: ReactNode;
  /** Слот для отображения статуа */
  statusSlot?: ReactNode;
  /** Клик на карточку */
  onClickAction?: MouseEventHandler;
  /** Слот для действия */
  actionSlot?: ReactNode;
};

export const Card: FC<CardProps> = (props) => {
  const {
    className,
    image,
    imageWidth = DEFAULT_IMAGE_WIDTH,
    imageHeight = DEFAULT_IMAGE_HEIGHT,
    imageClassName,
    imageLoading,
    title,
    subtitle,
    actionSlot,
    contentSlot,
    captionSlot,
    statusSlot,
    onClickAction,
  } = props;

  const finallyClassName = cn(styles.card, className);

  return (
    <div onClick={onClickAction} className={finallyClassName}>
      <div className={cn(styles.image, imageClassName)}>
        {statusSlot && <div className={styles.statusSlot}>{statusSlot}</div>}
        <Image
          width={imageWidth}
          height={imageHeight}
          src={image}
          alt={'card image'}
          loading={imageLoading}
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.content}>
          {captionSlot && <div className={styles.captionSlot}>{captionSlot}</div>}
          <Typography weight={'bold'} view={'p-20'} maxLines={2}>
            {title}
          </Typography>
          <Typography className={styles.subTitle} maxLines={3}>
            {subtitle}
          </Typography>
        </div>
        <div className={styles.footer}>
          <div className={styles.contentSlot}>{contentSlot}</div>
          {actionSlot}
        </div>
      </div>
    </div>
  );
};
