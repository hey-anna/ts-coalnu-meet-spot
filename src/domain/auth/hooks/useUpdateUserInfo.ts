import type { UserInfoReQuest } from '@/domain/user/models/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '../apis/api';
import { useUserStore } from '@/domain/user/store/userStore';

const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-user-info'],
    mutationFn: (params: UserInfoReQuest) => {
      return updateUserInfo(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUser'] });
    },
  });
};

export default useUpdateUserInfo;
