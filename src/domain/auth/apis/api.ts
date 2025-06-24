import { supabase } from '../../../shared/config/supabaseClient';
import type { LoginRequest, SignUpRequest } from '../models/model';

export const signupWithEmail = async (params: SignUpRequest) => {
  try {
    console.log('sign up api 보내기 전 확인 : ', params);

    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    });

    if (error) {
      console.error('sign up 실패 원인:', error.message); // 여기서 원인 확인 가능
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error('fail to signup with Email');
  }
};

export const loginWithEmail = async (params: LoginRequest) => {
  try {
    console.log('login 보내기 전 확인 : ', params);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (error) {
      console.error('로그인 실패 원인:', error.message); // 여기서 원인 확인 가능
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error('fail to login with email');
  }
};

export const Logout = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    throw new Error('fail to logout');
  }
};
