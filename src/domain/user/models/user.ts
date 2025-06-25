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
