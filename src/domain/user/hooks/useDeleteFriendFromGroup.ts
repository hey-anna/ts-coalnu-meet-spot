import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DeleteFriendFromGroupRequest } from '../models/model';
import { deleteFriendFromGroup } from '../apis/api';

const useDeleteFriendFromGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-friend-from-group'],
    mutationFn: (params: DeleteFriendFromGroupRequest) => {
      return deleteFriendFromGroup(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-list-by-group'] });
    },
  });
};

export default useDeleteFriendFromGroup;
