import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFriend } from '../apis/api';

const useDeleteFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-friend'],
    mutationFn: (id: number) => {
      return deleteFriend(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-list-by-group'] });
      queryClient.invalidateQueries({ queryKey: ['friend-list'] });
      queryClient.invalidateQueries({ queryKey: ['get-no-group-friendList'] });
    },
  });
};

export default useDeleteFriend;
