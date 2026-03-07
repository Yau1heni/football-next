import { ProtectedRoute } from '@components/protected-route';
import type { ReactNode } from 'react';

const ClubLayout = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export default ClubLayout;
