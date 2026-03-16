import type { Metadata } from 'next';

import { TacticsPageContent } from './_components/tactics-page-content';

export const metadata: Metadata = {
  title: 'Тактическая доска | #iLoveThisGame',
  description: 'Визуализация футбольной тактики',
};

const TacticsPage = () => <TacticsPageContent />;

export default TacticsPage;
