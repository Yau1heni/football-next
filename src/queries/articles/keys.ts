export const getArticlesQueryKeys = () => ['articles'] as const;

export const getClubArticlesQueryKeys = (tag: string) =>
  [...getArticlesQueryKeys(), 'club', tag] as const;
