export const getTacticsListQueryKeys = (userId: string) => ['tactics', 'list', userId] as const;

export const getTacticDetailQueryKeys = (userId: string, tacticId: string) =>
  ['tactics', 'detail', userId, tacticId] as const;
