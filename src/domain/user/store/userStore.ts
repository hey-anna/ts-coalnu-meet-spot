import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 타입 설정합니다.
type UserStoreType = {
  userIdList: string[];
  userNameList: string[];
  addUserId: (id: string) => void;
  removeUserId: (id: string) => void;
};

export const useUserStore = create<UserStoreType>()(
  // persist ->  로컬스토지와 동기화 합니다.
  persist(
    (set) => ({
      userIdList: ['test1', 'test2'],
      userNameList: [],
      addUserId: (id) =>
        set((state) => {
          if (state.userIdList.includes(id)) return state;
          return {
            userIdList: [...state.userIdList, id],
          };
        }),
      removeUserId: (id) =>
        set((state) => ({
          userIdList: state.userIdList.filter((item) => item !== id),
        })),
    }),
    {
      name: 'user-store',
    },
  ),
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
