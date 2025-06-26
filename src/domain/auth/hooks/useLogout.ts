import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '../../user/store/userStore';
import { Logout } from '../apis/api';

const useLogout = () => {
  const { setUser } = useUserStore();

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
