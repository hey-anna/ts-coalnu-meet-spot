import type {
  FriendWithGroup,
  GetUserFriendByGroupResponse,
} from '../models/model';

interface Friend {
  id: number;
  name: string;
  station: string;
  avatar?: string;
}

interface FriendGroup {
  id: number;
  name: string;
  members: Friend[];
  color: string;
}

export const friendGroupResponsePort = (
  responseApiDatas: GetUserFriendByGroupResponse[],
): FriendGroup[] => {
  console.log('실데이터', responseApiDatas);

  if (!responseApiDatas?.length) {
    return [];
  }

  const outputGroupData: FriendGroup[] = [];

  for (let ix = 0, ixLen = responseApiDatas.length; ix < ixLen; ix++) {
    const groupData = responseApiDatas[ix];
    const friendGroup: FriendGroup = {
      id: groupData.id,
      name: groupData.group_name,
      members: [],
      color: groupData.group_color,
    };

    const Friends = groupData.friend_link_group;

    for (let jx = 0, jxLen = Friends.length; jx < jxLen; jx++) {
      const item = Friends[jx];
      friendGroup.members.push({
        id: item.friend.id,
        name: item.friend.name,
        station: item.friend.start_station,
      });
    }

    outputGroupData.push(friendGroup);
  }

  return outputGroupData;
};

export const allFriendResponsePort = (
  responseApiDatas: FriendWithGroup[],
): Friend[] => {
  if (!responseApiDatas?.length) {
    return [];
  }

  const outputFriendData: Friend[] = [];

  for (let ix = 0, ixLen = responseApiDatas.length; ix < ixLen; ix++) {
    const friendData = responseApiDatas[ix];
    outputFriendData.push({
      id: friendData.id,
      name: friendData.name,
      station: friendData.start_station,
    });
  }

  return outputFriendData;
};
