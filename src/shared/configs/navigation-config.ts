import { routes } from '@configs/routes';

export const navigationConfig = [
  { title: 'Клубы', to: routes.main.mask },
  { title: 'Статьи', to: routes.articles.mask },
  { title: 'Турнирная таблица', to: routes.standings.mask },
  { title: 'Тактика', to: routes.tactics.mask },
] as const;
