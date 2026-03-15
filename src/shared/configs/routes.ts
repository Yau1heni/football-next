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
    mask: '/articles/[id]',
    create: (id: string) => `/articles/${id}`,
  },
  standings: {
    mask: '/standings',
    create: () => `/standings`,
  },
  tactics: {
    mask: '/tactics',
    create: () => '/tactics',
  },
} as const;
