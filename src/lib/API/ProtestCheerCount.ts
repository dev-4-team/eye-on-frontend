import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const ProtestsCheerCount = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV_URL}/api/cheer/protest`);
    const data = await response.json();
    return data;
};

export const ProtestCheerCount = async (protestId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV_URL}/api/cheer/protest/${protestId}`);
    const data = await response.json();
    return data;
};

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

export const SendCheerMutation = (protestId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (protestId: string) =>
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV_URL}/api/cheer/protest/${protestId}`, {
                method: 'POST',
            }),
        onSuccess: () => {
            console.log('보냄');
            queryClient.invalidateQueries({ queryKey: ['cheer', protestId] });
        },
    });
};
