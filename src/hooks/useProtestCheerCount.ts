import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProtestCheerCount } from '@/api/cheer';

interface Props {
  protestId: string;
}
export const useProtestCheerCount = ({ protestId }: Props) => {
  const pathname = usePathname();
  const isDetail = pathname.includes('protest');
  const currentProtestId = pathname?.split('/').pop();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cheer', protestId],
    queryFn: () => ProtestCheerCount({ protestId }),
    refetchInterval: query => (query.state.error ? false : 3000),
    enabled: !isDetail || (isDetail && currentProtestId === String(protestId)),
  });
  return { data: data, isLoading, isError };
};
