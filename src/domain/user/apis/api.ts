import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../../../shared/config/supabaseClient';
import type {
  AddFriendListToGroupRequest,
  AddNewFriendRequest,
  AddNewGroupRequest,
  DeleteFriendFromGroupRequest,
  Friend,
  FriendLinkGroupRequest,
  FriendWithGroup,
  GetUserFriendByGroupResponse,
  Group,
  UpdateFriendRequest,
  UpdateGroupRequest,
  User,
  UserInfoReQuest,
  UserSubInfo,
} from '../models/model';

// 현재 로그인한 user의 정보
export const getCurrentUserInfo = async (): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.getUser();

    let userData: User;

    if (error) {
      console.error('GetCurrentUserInfo 실패 원인:', error.message); // 여기서 원인 확인 가능
      throw new Error(error.message);
    } else {
      userData = { ...userData, id: data.user.id, email: data.user.email };
      const userInfo = await getCurrentUserSubInfo(data.user.id);
      userData = {
        ...userData,
        user_name: userInfo.user_name,
        user_start_station: userInfo.user_start_station,
      };
    }

    return userData;
  } catch (error) {
    throw new Error('fail to getCurrent user info');
  }
};

// 현재 로그인 한 유저의 추가 정보 가져오기

export const getCurrentUserSubInfo = async (
  id: string,
): Promise<UserSubInfo> => {
  try {
    const { data } = await supabase
      .from('user_info')
      .select()
      .eq('user_id', id)
      .single();

    return data;
  } catch (error) {
    throw new Error('fail to fetch current user sub info');
  }
};

// 현재 로그인한 user가 가지고 있는 group list
export const getCurrentUserGroup = async (id: string): Promise<Group[]> => {
  try {
    const { data } = await supabase
      .from('friend_group')
      .select('*')
      .eq('user_id', id);

    return data;
  } catch (error) {
    throw new Error("fail to fetch user's friend group list");
  }
};

// 현재 로그인한 user의 전체 친구 리스트 (그룹 정보 포함)
export const getUserFriendList = async (
  id: string,
): Promise<FriendWithGroup[]> => {
  try {
    const { data } = await supabase
      .from('friend')
      .select(
        `*, friend_link_group:friend_link_group(
          group_id,
          group:group_id(
            group_name
          )
        )`,
      )
      .eq('user_id', id);

    return data;
  } catch (error) {
    throw new Error('fail to fetch user friend list');
  }
};

// 완전 새로운 그룹 추가 api
export const addNewGroup = async (
  params: AddNewGroupRequest,
): Promise<Group> => {
  try {
    const { data, error } = await supabase
      .from('friend_group')
      .insert(params)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    if (!error.code) {
      throw new Error('fail to add new Group');
    } else {
      throw error;
    }
  }
};

// 완전 새로운 친구 추가
export const addNewFriend = async (
  params: AddNewFriendRequest,
): Promise<Friend> => {
  try {
    const { friend_group_id, ...friendInfo } = params;

    const { data, error } = await supabase
      .from('friend')
      .insert(friendInfo)
      .select()
      .single<Friend>();

    if (error) {
      throw error;
    }

    // 그룹을 정해서 추가할 경우
    if (friend_group_id) {
      await addFriendLinkGroup({
        friend_id: data.id,
        group_id: friend_group_id,
      });
    }

    return data;
  } catch (error) {
    if (!error.code) {
      throw new Error('fail to add new friend');
    } else {
      throw error;
    }
  }
};

// 친구 + 그룹 연결 테이블 insert api
export const addFriendLinkGroup = async (
  params: FriendLinkGroupRequest,
): Promise<void> => {
  try {
    const { data } = await supabase
      .from('friend_link_group')
      .insert(params)
      .select()
      .single();

    return data;
  } catch (error) {
    throw new Error('fail to add friend link groups');
  }
};

// 그룹없는 친구 필터해서 가져오기
export const getUserNoGroupFriend = async (
  id: string,
): Promise<FriendWithGroup[] | null> => {
  try {
    const { data } = await supabase
      .from('friend')
      .select(
        `*,
        friend_link_group:friend_link_group(group_id)`,
      )
      .eq('user_id', id)
      .is('friend_link_group', null);

    return data;
  } catch (error) {
    throw new Error('fail to fetch get filtered friend list');
  }
};

// 친구 목록 그룹 별 묶어서 가져오기
export const getUserFriendByGroup = async (
  id: string,
): Promise<GetUserFriendByGroupResponse[] | null> => {
  try {
    const { data } = await supabase
      .from('friend_group')
      .select(
        `*,
        friend_link_group:friend_link_group(
          friend(
            id,
            name,
            start_station
          )
        )`,
      )
      .eq('user_id', id);

    return data;
  } catch (error) {
    throw new Error();
  }
};

// 친구 여러명 그룹에 한번에 추가하기
export const addFriendListToGroup = async (
  params: AddFriendListToGroupRequest,
): Promise<void> => {
  try {
    if (params.friend_id_list.length > 0) {
      for (const friendId of params.friend_id_list) {
        await addFriendLinkGroup({
          friend_id: friendId,
          group_id: params.group_id,
        });
      }
    }
  } catch (error) {
    throw new Error('fail to friend list add link group');
  }
};

export const deleteFriendFromGroup = async (
  params: DeleteFriendFromGroupRequest,
) => {
  try {
    const { data } = await supabase
      .from('friend_link_group')
      .delete()
      .eq('friend_id', params.friend_id)
      .eq('group_id', params.group_id);
  } catch (error) {
    throw new Error('fail to delete friend from group');
  }
};

export const deleteGroup = async (group_id: number): Promise<void> => {
  try {
    await supabase.from('friend_group').delete().eq('id', group_id);
  } catch (error) {
    throw new Error('fail to delete group');
  }
};

// 그룹 정보 수정
export const updateGroupInfo = async (params: UpdateGroupRequest) => {
  const { group_id, ...groupInfo } = params;
  try {
    const { error } = await supabase
      .from('friend_group')
      .update(groupInfo)
      .eq('id', group_id);

    if (error) {
      throw error;
    }
  } catch (error) {
    if (!error.code) {
      throw new Error('fail to update group info');
    } else {
      throw error;
    }
  }
};

// 친구 완전 삭제
export const deleteFriend = async (id: number) => {
  try {
    await supabase.from('friend').delete().eq('id', id);
  } catch (error) {
    throw new Error('fail to delete friend');
  }
};

// 친구 정보 수정
export const updateFriendInfo = async (params: UpdateFriendRequest) => {
  try {
    const { friend_id, ...updateFriendInfo } = params;

    const { error } = await supabase
      .from('friend')
      .update(updateFriendInfo)
      .eq('id', friend_id);

    if (error) {
      throw error;
    }
  } catch (error) {
    if (!error.code) {
      throw new Error('fail to update friend');
    } else {
      throw error;
    }
  }
};

// 사용자 정보 추가
export const createUserInfo = async (params: UserInfoReQuest) => {
  try {
    const { data } = await supabase
      .from('user_info')
      .insert(params)
      .select()
      .single();
  } catch (error) {
    throw new Error('fail to create user info');
  }
};
