import { supabase } from '../../../shared/config/supabaseClient';

export const getCurrentUserInfo = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('GetCurrentUserInfo 실패 원인:', error.message); // 여기서 원인 확인 가능
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error('fail to getCurrent user info');
  }
};
