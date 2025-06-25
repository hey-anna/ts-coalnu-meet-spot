import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type SelectedFriendInfo = {
  name: string;
  group: string;
  station: string;
};
type SelectedFriendList = SelectedFriendInfo[];

type FriendsStoreType = {
  friendInfos: SelectedFriendList;
  addFriendInfo: (friendInfo: SelectedFriendInfo) => void;
  removeFriendInfo: (friendInfo: SelectedFriendInfo) => void;
};

export const friendInfoStore = create<FriendsStoreType>()(
  immer((set) => ({
    friendInfos: [],
    addFriendInfo: (friendInfo) =>
      set((state) => {
        const exists = state.friendInfos.some(
          (freind: SelectedFriendInfo) =>
            freind.name === friendInfo.name &&
            freind.group === friendInfo.group,
        );
        if (!exists && state.friendInfos.length < 4) {
          state.friendInfos.push(friendInfo);
        }
      }),
    removeFriendInfo: (friendInfo) =>
      set((state) => {
        const removeItemIndex = state.friendInfos.findIndex(
          (friend: SelectedFriendInfo) =>
            friend.name === friendInfo.name &&
            friend.group === friendInfo.group,
        );

        if (removeItemIndex !== -1) {
          state.friendInfos.splice(removeItemIndex, 1);
        }
      }),
  })),
);

// 예진
interface User {
  email: string;
  id: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useLoginUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
