import { ProtectedRoute } from '@components/protected-route';
import type { ReactNode } from 'react';

const ArticleLayout = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export default ArticleLayout;
