import { useQuery } from '@tanstack/react-query';
import { getUserNoGroupFriend } from '../apis/api';
import type { FriendWithGroup } from '../models/model';

const useGetUserNoGroupFriend = (id: string) => {
  return useQuery<FriendWithGroup[]>({
    queryKey: ['get-filtered-friendList'],
    queryFn: () => {
      return getUserNoGroupFriend(id);
    },
    enabled: !!id,
  });
};

export default useGetUserNoGroupFriend;
