import { useQuery } from '@tanstack/react-query';
import { getUserNoGroupFriend } from '../apis/api';

const useGetUserNoGroupFriend = (id: string) => {
  return useQuery({
    queryKey: ['get-filtered-friendList'],
    queryFn: () => {
      return getUserNoGroupFriend(id);
    },
    enabled: !!id,
  });
};

export default useGetUserNoGroupFriend;
