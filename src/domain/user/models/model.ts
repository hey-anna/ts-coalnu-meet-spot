export interface User {
  email: string;
  id: string;
  user_name: string;
  user_start_station: string;
}

export interface Group {
  id: number; // 그룹별 식별 번호
  user_id: string; // 그룹 주인 user의 uuid
  group_name: string; // 그룹 이름
  group_color: string;
}

export interface Friend {
  id: number;
  user_id: string;
  name: string;
  start_station: string;
}

export interface FriendLinkGroupRequest {
  friend_id: number;
  group_id: number;
}

// 친구 정보 그룹 리스트 정보와 함께 받기 ( 그룹정보 없는 친구 목록 받을때도 response 타입으로 사용중)
export interface FriendWithGroup extends Friend {
  friend_link_group?:
    | {
        group_id: number;
        group: {
          group_name: string;
        };
      }[]
    | null;
}

// 그룹 추가 요청
export interface AddNewGroupRequest {
  user_id: string;
  group_name: string;
  group_color?: string | null;
}

// 새로운 친구 추가 요청
export type AddNewFriendRequest = Omit<Friend, 'id'> & {
  friend_group_id: number | null;
};

export interface GetUserFriendByGroupResponse {
  id: number; // 그룹 아이디
  group_name: string;
  group_color: string;
  created_at: string;
  // user_id:string     // 받아오는 데이터지만 안따져도 될것같아서 주석했습니다!
  friend_link_group: {
    friend: Pick<Friend, 'id' | 'name' | 'start_station'>;
  }[];
}

export interface AddFriendListToGroupRequest {
  group_id: number;
  friend_id_list: number[];
}

export interface DeleteFriendFromGroupRequest {
  group_id: number;
  friend_id: number;
}

// 그룹 정보 수정 요청
export interface UpdateGroupRequest {
  group_id: number;
  group_name?: string;
  group_color?: string | null;
}

// 친구 정보 수정 요청
export interface UpdateFriendRequest {
  friend_id: number;
  name?: string;
  start_station?: string;
}

export interface ErrorMsg {
  code?: string;
  message?: string;
  details?: string;
}

// 사용자 정보(user_info 테이블) 저장 요청
export interface UserInfoReQuest {
  user_id: string;
  user_name: string;
  user_start_station: string;
}

// 사용자 정보(user_info 테이블)
export interface UserSubInfo {
  user_id: string;
  user_name: string;
  user_start_station: string;
}
