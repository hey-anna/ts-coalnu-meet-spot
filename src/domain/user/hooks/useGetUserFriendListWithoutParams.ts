import { useQuery } from '@tanstack/react-query';
import type { FriendWithGroup } from '../models/model';
import { getUserFriendList } from '../apis/api';
import { useUserStore } from '../store/userStore';

const useGetUserFriendListWithoutParams = () => {
  const user = useUserStore((state) => state.user);
  const userId = user?.id;
  return useQuery<FriendWithGroup[], Error, FriendWithGroup[]>({
    queryKey: ['friend-list', userId],
    queryFn: async () => {
      if (!userId || userId === '') {
        throw new Error('fail to fetch category because no user id');
      }

      const result = await getUserFriendList(userId);
      return result ?? [];
    },
    enabled: !!userId,
  });
};

export default useGetUserFriendListWithoutParams;
