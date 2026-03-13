import { ContentContainer } from '@components/content-container';
import { HtmlContent } from '@components/html-content';
import type { FC } from 'react';

import styles from './club-history.module.scss';

type ClubHistoryProps = {
  text: string;
};

export const ClubHistory: FC<ClubHistoryProps> = ({ text }) => {
  if (!text) return null;

  return (
    <ContentContainer title={'История'}>
      <div className={styles.clubHistory}>
        <HtmlContent html={text} />
      </div>
    </ContentContainer>
  );
};
