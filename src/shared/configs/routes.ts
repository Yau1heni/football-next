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
} as const;
