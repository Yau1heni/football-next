'use client';

import { Button } from '@components/ui/button';
import { ArrowRightIcon } from '@components/ui/icons';
import { Typography } from '@components/ui/typography';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import { ColoredDots } from '../colored-dots';
import styles from './page-title.module.scss';

type PageTitleProps = {
  title?: string;
  teamColors?: string[];
  showBack?: boolean;
  flag?: string | null;
};

export const PageTitle: FC<PageTitleProps> = (props) => {
  const { title, teamColors = [], flag, showBack } = props;

  const router = useRouter();
  return (
    <div className={styles.pageTitle}>
      {showBack && (
        <Button
          variant={'ghost'}
          onClick={() => router.back()}
          className={styles.goBack}
          aria-label={'вернуться назад'}
        >
          <ArrowRightIcon
            width={32}
            height={32}
            viewBox={'0 0 32 32'}
            color={'accent'}
            aria-label={'вернуться назад'}
          />
        </Button>
      )}
      {title && (
        <Typography tag={'h1'} maxLines={2} weight={'bold'} className={styles.title}>
          {title}
        </Typography>
      )}
      {teamColors.length > 0 && <ColoredDots colors={teamColors} />}
      {flag && <Image src={flag} alt={'flag'} width={64} height={64} loading={'eager'} />}
    </div>
  );
};
