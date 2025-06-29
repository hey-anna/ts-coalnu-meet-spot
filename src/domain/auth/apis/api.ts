import { createUserInfo } from '@/domain/user/apis/api';
import { supabase } from '../../../shared/config/supabaseClient';
import type { LoginRequest, SignUpRequest } from '../models/model';
import type { UserInfoReQuest } from '@/domain/user/models/model';

export const signupWithEmail = async (params: SignUpRequest) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    });

    if (error) {
      console.error('sign up 실패 원인:', error.message); // 여기서 원인 확인 가능
      throw new Error(error.message);
    } else {
      const { user_name, user_start_station } = params;
      const sendParams = {
        user_id: data.user.id,
        user_name,
        user_start_station,
      };

      // user/api에 있습니다.
      await createUserInfo(sendParams);
    }

    return data;
  } catch (error) {
    throw new Error('fail to signup with Email');
  }
};

export const loginWithEmail = async (params: LoginRequest) => {
  try {
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

export const updateUserInfo = async (params: UserInfoReQuest) => {
  try {
    const { user_id, user_name, user_start_station } = params;

    const { data } = await supabase
      .from('user_info')
      .update({ user_name, user_start_station })
      .eq('user_id', user_id)
      .select()
      .single();
  } catch (error) {
    throw new Error('fail to update user Info');
  }
};
