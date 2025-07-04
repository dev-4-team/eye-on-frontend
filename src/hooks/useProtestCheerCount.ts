import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProtestCheerCount } from '@/api/cheer';

interface Props {
  protestId: string;
}
export const useProtestCheerCount = ({ protestId }: Props) => {
  const pathname = usePathname();
  const isDetail = pathname.includes('protest');
  const currentProtestId = pathname?.split('/').pop();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cheer', protestId],
    queryFn: () => getProtestCheerCount({ protestId }),
    refetchInterval: query => (query.state.error ? false : 3000),
    enabled: !isDetail || (isDetail && currentProtestId === protestId),
  });
  return {
    cheerCount: data,
    cheerCountIsLoading: isLoading,
    cheerCountIsError: isError,
  };
};
