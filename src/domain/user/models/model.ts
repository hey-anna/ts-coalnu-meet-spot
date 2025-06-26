export interface User {
  email: string;
  id: string;
}

export interface Group {
  id: number; // 그룹별 식별 번호
  user_id: string; // 그룹 주인 user의 uuid
  group_name: string; // 그룹 이름
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

// 친구 정보 그룹 리스트 정보와 함께 받기
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
}

// 새로운 친구 추가 요청
export type AddNewFriendRequest = Omit<Friend, 'id'> & {
  friend_group_id: number | null;
};

// 친구 목록 검색 요청
export interface FilteredUserFriendList {
  user_id: string;
  group_id: number | null;
}

//// 필요한 api 목록

export type FriendInfo = {
  id?: number;
  name: string;
  start_station: string;
};

// 1. 그룹 정보 + 그룹에 속한 친구 목록
// request : user_id 하나
// response는 아래 타입
export type GroupFriendsInfo = {
  id: number;
  group_name: string;
  memberInfos: FriendInfo[];
};

// 2. 그룹에 안속한 친구 목록
// request: user_id
// response : Friend[]
export type NoneGroupFriendsInfo = FriendInfo[];

// 3. 그룹 추가 하기
export type addGroupRequest = {
  user_id: number;
  group_name: string;
  memberInfos: FriendInfo[]; // 화면에서는 새로 추가하는 친구의 경우 이 두 정보 밖에 없음
};
