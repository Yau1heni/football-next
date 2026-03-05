export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  club: {
    mask: '/club/[id]',
    create: (id: string) => `/club/${id}`,
  },
  login: {
    mask: '/login',
    create: () => '/login',
  },
  register: {
    mask: '/register',
    create: () => '/register',
  },
  articles: {
    mask: '/articles',
    create: () => '/articles',
  },
  article: {
    mask: '/article/[id]',
    create: (id: string) => `/article/${id}`,
  },
} as const;
