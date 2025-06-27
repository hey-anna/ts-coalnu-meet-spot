import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateGroupRequest } from '../models/model';
import { updateGroupInfo } from '../apis/api';

const useUpdateGroupInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-group-info'],
    mutationFn: (params: UpdateGroupRequest) => {
      if (!params.group_id) {
        throw new Error('업데이트 하려는 그룹의 ID가 없습니다.');
      }

      return updateGroupInfo(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUser-groupList'] });
      queryClient.invalidateQueries({ queryKey: ['friend-list-by-group'] });
    },
  });
};

export default useUpdateGroupInfo;
