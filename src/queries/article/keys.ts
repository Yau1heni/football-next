export const getArticleQueryKeys = (articleId: string) => ['article', articleId] as const;

export const getArticleUserReactionQueryKeys = (articleId: string, userId: string) =>
  ['articleUserReaction', { articleId, userId }] as const;

export const getArticleLastViewDateQueryKeys = (articleId: string, userId: string) =>
  ['articleLastViewDate', { articleId, userId }] as const;
