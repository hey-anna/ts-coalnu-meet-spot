import { idID } from '@mui/material/locale';
import { supabase } from '../../../shared/config/supabaseClient';
import type {
  AddNewFriendRequest,
  AddNewGroupRequest,
  Friend,
  FriendWithGroup,
  Group,
} from '../models/model';

export const getCurrentUserInfo = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('GetCurrentUserInfo 실패 원인:', error.message); // 여기서 원인 확인 가능
      throw new Error(error.message);
    }

    console.log('GetCurrentUserInfo 사용자 정보 : ', data);
    return data;
  } catch (error) {
    throw new Error('fail to getCurrent user info');
  }
};

export const getCurrentUserGroup = async (
  id: string,
): Promise<Group[] | null> => {
  try {
    console.log('현재 user의 id값 : ', id);
    const { data } = await supabase
      .from('friend_group')
      .select('*')
      .eq('user_id', id);

    return data;
  } catch (error) {
    throw new Error("fail to fetch user's friend group list");
  }
};

export const getUserFriendList = async (
  id: string,
): Promise<FriendWithGroup[] | null> => {
  try {
    const { data } = await supabase
      .from('friend')
      .select(`*, friend_group(id, group_name)`)
      .eq('user_id', id);

    return data;
  } catch (error) {
    throw new Error('fail to fetch user friend list');
  }
};

export const addNewGroup = async (
  params: AddNewGroupRequest,
): Promise<Group> => {
  try {
    console.log('insert 전 받은 값 : ', params);
    const { data } = await supabase
      .from('friend_group')
      .insert(params)
      .select()
      .single();

    console.log('반환된 data : ', data);

    return data;
  } catch (error) {
    throw new Error('fail to add new Group');
  }
};

export const addNewFriend = async (
  params: AddNewFriendRequest,
): Promise<FriendWithGroup> => {
  try {
    console.log('api 전달 전의 값 : ', params);
    const { data } = await supabase
      .from('friend')
      .insert(params)
      .select(`*, friend_group(id, group_name)`)
      .single();

    console.log('저장한 친구 데이터 : ', data);

    return data;
  } catch (error) {
    throw new Error('fail to add new friend');
  }
};
