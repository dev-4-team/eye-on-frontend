import type { ReactNode } from 'react';
import ProtestList from '@/components/Protest/ProtestList';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ProtestList />
      {children}
    </div>
  );
}
