import { useQuery } from '@tanstack/react-query';
import type { User } from '../models/model';
import { getCurrentUserGroup } from '../apis/api';

const useGetCurrentUserGroup = (params: User) => {
  return useQuery({
    queryKey: ['getUser-groupList', params.id],
    queryFn: () => {
      return getCurrentUserGroup(params.id);
    },
    enabled: !!params.id,
  });
};

export default useGetCurrentUserGroup;
