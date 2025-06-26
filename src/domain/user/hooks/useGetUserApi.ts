import { useQuery } from '@tanstack/react-query';
import { getCurrentUserInfo } from '../apis/api';

const useGetUserApi = () => {
  return useQuery({
    queryKey: ['getUser'],
    queryFn: () => {
      return getCurrentUserInfo();
    },
    retry: false,
  });
};

export default useGetUserApi;
