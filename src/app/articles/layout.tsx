'use client';

import { ProtectedRoute } from '@components/protected-route';
import type { ReactNode } from 'react';

const ArticlesLayout = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export default ArticlesLayout;
