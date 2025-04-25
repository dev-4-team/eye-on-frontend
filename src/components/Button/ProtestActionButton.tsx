import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ProtestActionButton = ({ className, children, ...rest }: Props & ButtonProps) => {
  return (
    <Button
      {...rest}
      variant={'gps'}
      className={cn('pt-2 bg-red-400 shadow-md text-white font-bold border-spacing-0', className)}
    >
      {children}
    </Button>
  );
};

export default ProtestActionButton;
