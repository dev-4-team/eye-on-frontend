import ProtestList from '@/components/Protest/ProtestList';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ProtestList />
      {children}
    </div>
  );
}
