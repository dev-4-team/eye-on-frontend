import { ProtestCheerCount } from '@/apis/cheer';
import { useQuery } from '@tanstack/react-query';

export const UseProtestCheerCount = (protestId: string, isSocketReady: boolean) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['cheer', protestId],
        queryFn: () => ProtestCheerCount(protestId),
        refetchInterval: 3000,
        enabled: !isSocketReady,
        refetchIntervalInBackground: true,
    });
    return { data: data?.data, isLoading, isError };
};
