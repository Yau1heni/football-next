import { ProtectedRoute } from '@components/protected-route';
import type { ReactNode } from 'react';

const ClubsLayout = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export default ClubsLayout;
