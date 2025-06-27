import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AddNewFriendRequest } from '../models/model';
import { addNewFriend } from '../apis/api';

const useAddNewFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addNewFriend'],
    mutationFn: (params: AddNewFriendRequest) => {
      return addNewFriend(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-list'] });
    },
    onError: (error) => {},
  });
};

export default useAddNewFriend;
