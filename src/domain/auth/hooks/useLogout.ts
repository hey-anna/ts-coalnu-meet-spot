import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '../../user/store/userStore';
import { Logout } from '../apis/api';
import { useNavigate } from 'react-router';

const useLogout = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => {
      return Logout();
    },
    onSuccess: () => {
      setUser(null);
      navigate('/');
    },
  });
};

export default useLogout;
