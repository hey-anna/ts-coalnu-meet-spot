import { useQuery } from '@tanstack/react-query';

const useGetFilteredUserFriend = () => {
  return useQuery({
    queryKey: ['get-filtered-friendList'],
    queryFn: () => {},
  });
};
