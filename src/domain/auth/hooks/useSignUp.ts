import { useMutation } from '@tanstack/react-query';
import type { SignUpRequest } from '../models/model';
import { signupWithEmail } from '../apis/api';

const useSignUp = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (params: SignUpRequest) => {
      console.log('params info : ', params);

      return signupWithEmail(params);
    },
  });
};

export default useSignUp;
