import { useQuery } from '@tanstack/react-query';
import type { Group, User } from '../models/model';
import { getCurrentUserGroup } from '../apis/api';

const useGetCurrentUserGroup = (params: User) => {
  return useQuery<Group[], Error>({
    queryKey: ['getUser-groupList', params.id],
    queryFn: () => {
      return getCurrentUserGroup(params.id);
    },
    enabled: !!params.id,
  });
};

export default useGetCurrentUserGroup;
