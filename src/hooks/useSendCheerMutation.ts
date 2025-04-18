import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  protestId: number;
}

export const useSendCheerMutation = ({ protestId }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (protestId: number) =>
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV_URL}/api/cheer/protest/${protestId}`, {
        method: 'POST',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cheer', protestId] });
    },
  });
};
