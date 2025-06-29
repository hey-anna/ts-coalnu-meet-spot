import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '../../user/store/userStore';
import type { LoginRequest } from '../models/model';
import { loginWithEmail } from '../apis/api';
import { getCurrentUserInfo } from '../../user/apis/api';
import { useNavigate } from 'react-router';

const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (params: LoginRequest) => {
      return loginWithEmail(params);
    },
    onSuccess: async () => {
      try {
        const userInfo = await getCurrentUserInfo();
        if (userInfo?.email && userInfo.id) {
          setUser({
            id: userInfo.id,
            email: userInfo.email,
            user_name: userInfo.user_name,
            user_start_station: userInfo.user_start_station,
          });
        }
        navigate('/');
      } catch (error) {
        console.error('Failed to get user info after login:', error);
      }
    },
  });
};

export default useLogin;
