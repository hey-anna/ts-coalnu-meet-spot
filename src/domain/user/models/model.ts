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
  friend_group_id?: number | null;
  subway_line?: string | null;
}

export interface FriendWithGroup extends Friend {
  friend_group?: Group | null;
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

export type StationInfoList = Station[];
