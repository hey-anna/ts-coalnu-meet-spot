import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateFriendRequest } from '../models/model';
import { updateFriendInfo } from '../apis/api';

const useUpdateFriendInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-friend-info'],
    mutationFn: (params: UpdateFriendRequest) => {
      return updateFriendInfo(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-list-by-group'] });
      queryClient.invalidateQueries({ queryKey: ['friend-list'] });
      queryClient.invalidateQueries({ queryKey: ['get-no-group-friendList'] });
    },
  });
};

export default useUpdateFriendInfo;
