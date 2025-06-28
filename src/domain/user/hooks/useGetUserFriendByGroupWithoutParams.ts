import { useQuery } from '@tanstack/react-query';
import { getUserFriendByGroup } from '../apis/api';
import type { GetUserFriendByGroupResponse } from '../models/model';
import { useUserStore } from '../store/userStore';

const useGetUserFriendByGroupWithoutParams = () => {
  const user = useUserStore((state) => state.user);
  const userId = user?.id;
  return useQuery<GetUserFriendByGroupResponse[], Error>({
    queryKey: ['friend-list-by-group'],
    queryFn: () => {
      return getUserFriendByGroup(userId);
    },
    enabled: !!userId,
  });
};

export default useGetUserFriendByGroupWithoutParams;
