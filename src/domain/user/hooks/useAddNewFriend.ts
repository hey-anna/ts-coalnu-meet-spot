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
  });
};

export default useAddNewFriend;

export interface AddNewFriendRequest {
  // id: number;
  user_id: string;
  name: string;
  start_station: string;
  friend_group_id: number | null;
}
