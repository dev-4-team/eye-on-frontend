import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSendCheerMutation = (protestId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (protestId: string) =>
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV_URL}/api/cheer/protest/${protestId}`, {
        method: 'POST',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cheer', protestId] });
    },
  });
};
