import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '../../user/store/userStore';
import { Logout } from '../apis/api';
import { useNavigate } from 'react-router';

const useLogout = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => {
      return Logout();
    },
    onSuccess: () => {
      setUser({
        id: '',
        email: '',
        user_name: '',
        user_start_station: '',
      });
      queryClient.clear();
      navigate('/');
    },
  });
};

export default useLogout;
