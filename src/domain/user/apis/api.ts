import type { User } from '@supabase/supabase-js';
import { supabase } from '../../../shared/config/supabaseClient';
import type {
  AddNewFriendRequest,
  AddNewGroupRequest,
  Friend,
  FriendLinkGroupRequest,
  FriendWithGroup,
  Group,
} from '../models/model';

// 현재 로그인한 user의 정보
export const getCurrentUserInfo = async (): Promise<{ user: User } | null> => {
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

// 현재 로그인한 user가 가지고 있는 group list
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

// 현재 로그인한 user의 전체 친구 리스트 (그룹 정보 포함)
export const getUserFriendList = async (
  id: string,
): Promise<FriendWithGroup[] | null> => {
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

// 완전 새로운 친구 추가
export const addNewFriend = async (params: AddNewFriendRequest) => {
  try {
    console.log('api 전달 전의 값 : ', params);
    const { friend_group_id, ...friendInfo } = params;

    const { data } = await supabase
      .from('friend')
      .insert(friendInfo)
      .select()
      .single<Friend>();

    console.log('저장한 친구 데이터 : ', data);

    // 그룹을 정해서 추가할 경우
    if (friend_group_id) {
      await addFriendLinkGroup({
        friend_id: data.id,
        group_id: friend_group_id,
      });
    }

    return data;
  } catch (error) {
    throw new Error('fail to add new friend');
  }
};

// 친구 + 그룹 연결 테이블 insert api
export const addFriendLinkGroup = async (params: FriendLinkGroupRequest) => {
  try {
    const { data } = await supabase
      .from('friend_link_group')
      .insert(params)
      .select()
      .single();

    console.log('그룹 연결 추가 데이터 : ', data);

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

    console.log('그룹이 없는 친구 정보 : ', data);

    return data;
  } catch (error) {
    throw new Error('fail to fetch get filtered friend list');
  }
};

// 친구 목록 그룹 별 묶어서 가져오기
export const getUserFriendByGroup = async (id: string) => {
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

    console.log('그룹별 친구 리스트 : ', data);

    return data;
  } catch (error) {
    throw new Error();
  }
};

// : Promise<FriendWithGroup>
// export const addNewFriend = async (
//   params: AddNewFriendRequest,
// ): Promise<Friend> => {
//   try {
//     console.log('api 전달 전의 값 : ', params);

//     let newGroupId: number | null;

//     if (params.group_name && params.group_name.trim() != '') {
//       const addedGroupData: Group = await addNewGroup({
//         user_id: params.user_id,
//         group_name: params.group_name,
//       });
//       console.log('1단계 그룹 추가 완료 : ', addedGroupData);
//       newGroupId = addedGroupData.id;
//     }

//     const { group_name, ...friendInfo } = params;

//     const { data: addedFriendData, error: friendError } = await supabase
//       .from('friend')
//       .insert(friendInfo)
//       .select()
//       .single<Friend>();

//     console.log('2단계 저장한 친구 데이터 : ', addedFriendData);

//     if (!addedFriendData) throw new Error('friend insert 실패');

//     if (newGroupId) {
//       const { data: linkData, error: linkError } = await supabase
//         .from('friend_link_group')
//         .insert({ friend_id: addedFriendData.id, group_id: newGroupId })
//         .select()
//         .single<FriendWithGroup>();

//       console.log('3단계 추가된 연결 데이터 확인 : ', linkData);

//       if (linkError) console.log('연결 테이블 데이터 저장 실패');
//     }

//     return addedFriendData;
//   } catch (error) {
//     throw new Error('fail to add new friend');
//   }
// };
