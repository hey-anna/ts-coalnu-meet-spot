import { useMutation } from '@tanstack/react-query';
import { useLoginUserStore } from '../../user/store/userStore';
import { Logout } from '../apis/api';

const useLogout = () => {
  const { setUser } = useLoginUserStore();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => {
      return Logout();
    },
    onSuccess: () => {
      setUser(null);
    },
  });
};

export default useLogout;
