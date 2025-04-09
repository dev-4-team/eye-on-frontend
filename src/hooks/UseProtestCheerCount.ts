import { ProtestCheerCount } from '@/apis/cheer';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export const UseProtestCheerCount = (protestId: string) => {
  const pathname = usePathname();
  const isDetail = pathname.includes('protest');
  const currentProtestId = pathname?.split('/').pop();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cheer', protestId],
    queryFn: () => ProtestCheerCount(protestId),
    refetchInterval: 3000,
    enabled: !isDetail || (isDetail && currentProtestId === protestId),
  });
  return { data: data?.data, isLoading, isError };
};
