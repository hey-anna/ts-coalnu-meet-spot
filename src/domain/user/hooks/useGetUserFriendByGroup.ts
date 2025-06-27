import { useQuery } from '@tanstack/react-query';
import { getUserFriendByGroup } from '../apis/api';

const useGetUserFriendByGroup = (id: string) => {
  return useQuery({
    queryKey: ['friend-list_by-group'],
    queryFn: () => {
      return getUserFriendByGroup(id);
    },
    enabled: !!id,
  });
};

export default useGetUserFriendByGroup;
