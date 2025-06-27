import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroup } from '../apis/api';

const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteGroup'],
    mutationFn: (group_id: number) => {
      return deleteGroup(group_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-list-by-group'] });
      queryClient.invalidateQueries({ queryKey: ['getUser-groupList'] });
    },
  });
};

export default useDeleteGroup;
