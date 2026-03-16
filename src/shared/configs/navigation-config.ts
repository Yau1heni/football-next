import { routes } from '@configs/routes';

type NavigationItem = {
  title: string;
  to: string;
  /** Признак защищённого маршрута (требует авторизации) */
  requiresAuth?: boolean;
};

export const navigationConfig: NavigationItem[] = [
  { title: 'Клубы', to: routes.main.mask, requiresAuth: true },
  { title: 'Статьи', to: routes.articles.mask, requiresAuth: true },
  { title: 'Турнирная таблица', to: routes.standings.mask, requiresAuth: true },
  { title: 'Тактика', to: routes.tactics.mask, requiresAuth: true },
];
