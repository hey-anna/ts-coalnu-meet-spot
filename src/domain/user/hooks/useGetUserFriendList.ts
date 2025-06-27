import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { FriendWithGroup, User } from '../models/model';
import { getUserFriendList } from '../apis/api';

const useGetUserFriendList = (params: User) => {
  return useQuery<
    FriendWithGroup[],
    Error,
    FriendWithGroup[],
    [string, string]
  >({
    queryKey: ['friend-list', params.id],
    queryFn: () => {
      if (!params.id || params.id == '')
        throw new Error('fail to fetch category because no user id');
      return getUserFriendList(params.id);
    },
    // suspense: true,
  });
};

export default useGetUserFriendList;

// 무한 스크롤은 추후

// return useInfiniteQuery({
//   queryKey:['friend-list',params.id],
//   queryFn:({pageParam = 0}) => {
//     // if(!params.id || params.id ='') throw new Error('fail to fetch category because no user id')
//     return getUserFriendList(params)
//   },
//   initialPageParam:0,
//   getNextPageParam:(lastPage) =>{

//   }
// })
