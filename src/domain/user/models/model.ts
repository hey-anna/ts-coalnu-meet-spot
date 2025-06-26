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
  subway_line?: string | null;
}

export interface FriendLinkGroup {
  friend_id: number;
  group_id: number;
}

export interface FriendWithGroup extends Friend {
  friend_group?:
    | {
        group_id: number;
        group: {
          group_name: string;
        };
      }[]
    | null;
}

export interface AddNewGroupRequest {
  user_id: string;
  group_name: string;
}

export type AddNewFriendRequest = Omit<Friend, 'id'>;

export type Station = {
  code: string;
  name: string;
  line: string;
};

export type FriendInfo = {
  name: string;
  group?: string | null;
  station: Station | null;
};

export type SelsectedFriendsList = FriendInfo[];
