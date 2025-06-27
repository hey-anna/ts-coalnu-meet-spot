import { useQuery } from '@tanstack/react-query';
import type { FriendWithGroup, User } from '../models/model';
import { getUserFriendList } from '../apis/api';

const useGetUserFriendList = (params: User) => {
  return useQuery<FriendWithGroup[], Error, FriendWithGroup[]>({
    queryKey: ['friend-list', params.id],
    queryFn: async () => {
      if (!params.id || params.id === '') {
        throw new Error('fail to fetch category because no user id');
      }

      const result = await getUserFriendList(params.id);

      // ✅ null 방지: 항상 배열 반환
      return result ?? [];
    },
    suspense: true,
  });
};

export default useGetUserFriendList;
