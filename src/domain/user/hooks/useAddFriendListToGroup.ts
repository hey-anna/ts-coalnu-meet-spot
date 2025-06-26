import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AddFriendListToGroupRequest } from '../models/model';
import { addFriendListToGroup } from '../apis/api';

const useAddFriendListToGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-friend-list-to-group'],
    mutationFn: (params: AddFriendListToGroupRequest) => {
      return addFriendListToGroup(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-list'] });
    },
  });
};

export default useAddFriendListToGroup;
