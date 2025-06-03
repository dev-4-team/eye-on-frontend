import { postProtestCheer } from '@/api/cheer';
import { EMOJI } from '@/constants/emojis';
import { useConfetti } from '@/hooks/useConfetti';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  protestId: string;
}

export const useSendCheerMutation = ({ protestId }: Props) => {
  const queryClient = useQueryClient();
  const { getConfetti } = useConfetti();
  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: () => postProtestCheer({ protestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cheer', protestId] });
      getConfetti().addConfetti({
        emojis: [EMOJI.FIRE, EMOJI.CHECK, EMOJI.HEART],
        emojiSize: 80,
        confettiNumber: 30,
      });
    },
    onError: () => {
      alert('응원하기가 실패했습니다.');
    },
  });
  return { cheerProtest: mutate, cheerError: isError, cheerSuccess: isSuccess };
};
