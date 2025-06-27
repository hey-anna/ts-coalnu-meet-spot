import { useMutation } from '@tanstack/react-query';
import type { UserInfoReQuest } from '../models/model';
import { createUserInfo } from '../apis/api';

const useCreateUserInfo = () => {
  return useMutation({
    mutationKey: ['create-user-info'],
    mutationFn: (params: UserInfoReQuest) => {
      if (!params.user_id) {
        throw new Error('fail to create user info because not include user_id');
      }
      return createUserInfo(params);
    },
  });
};

export default useCreateUserInfo;
