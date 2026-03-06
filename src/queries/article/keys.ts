export const getArticleQueryKeys = (articleId: string) => ['article', articleId] as const;

export const getArticleUserReactionQueryKeys = (articleId: string, userId: string) =>
  ['articleUserReaction', { articleId, userId }] as const;
