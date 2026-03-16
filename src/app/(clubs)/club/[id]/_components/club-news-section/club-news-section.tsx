'use client';

import { ArticleCard } from '@components/article-card';
import { ContentContainer } from '@components/content-container';
import { useClubArticlesQuery } from '@queries/articles';
import type { FC } from 'react';

import styles from './club-news-section.module.scss';

type ClubNewsSectionProps = {
  clubName: string;
};

export const ClubNewsSection: FC<ClubNewsSectionProps> = ({ clubName }) => {
  const { data: relatedArticles = [] } = useClubArticlesQuery(clubName);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <ContentContainer title={'Последние новости о клубе'}>
      <ul className={styles.newsList}>
        {relatedArticles.map((article, index) => (
          <li key={article.id} className={styles.newsItem}>
            <ArticleCard article={article} index={index} />
          </li>
        ))}
      </ul>
    </ContentContainer>
  );
};
