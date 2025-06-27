import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AddNewGroupRequest } from '../models/model';
import { addNewGroup } from '../apis/api';

const useAddNewGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addNewGroup'],
    mutationFn: (params: AddNewGroupRequest) => {
      if (!params.user_id || params.user_id === '')
        return Promise.reject(
          new Error('fail to add new Group because no user_id'),
        );
      return addNewGroup(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUser-groupList'] });
      queryClient.invalidateQueries({ queryKey: ['friend-list-by-group'] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export default useAddNewGroup;
