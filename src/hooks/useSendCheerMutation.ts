import { postProtestCheer } from '@/api/cheer';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  protestId: string;
}

export const useSendCheerMutation = ({ protestId }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postProtestCheer({ protestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cheer', protestId] });
    },
  });
};
