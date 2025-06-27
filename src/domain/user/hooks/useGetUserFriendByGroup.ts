import { useQuery } from '@tanstack/react-query';
import { getUserFriendByGroup } from '../apis/api';
import type { GetUserFriendByGroupResponse } from '../models/model';

const useGetUserFriendByGroup = (id: string) => {
  return useQuery<GetUserFriendByGroupResponse[], Error>({
    queryKey: ['friend-list-by-group'],
    queryFn: () => {
      return getUserFriendByGroup(id);
    },
    enabled: !!id,
  });
};

export default useGetUserFriendByGroup;
