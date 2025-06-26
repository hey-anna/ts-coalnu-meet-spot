import useAddFriendListToGroup from '@/domain/user/hooks/useAddFriendListToGroup';
import useGetCurrentUserGroup from '@/domain/user/hooks/useGetCurrentUserGroup';
import useGetUserFriendByGroup from '@/domain/user/hooks/useGetUserFriendByGroup';
import useGetUserFriendList from '@/domain/user/hooks/useGetUserFriendList';
import useGetUserNoGroupFriend from '@/domain/user/hooks/useGetUserNoGroupFriend';
import { useUserStore } from '@/domain/user/store/userStore';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const YejinGetFriendListpage = () => {
  const { user } = useUserStore();

  const { data: noGroupFriendList } = useGetUserNoGroupFriend(user?.id);
  const { data: groupByFriendList } = useGetUserFriendByGroup(user?.id);
  const { data: friendData } = useGetUserFriendList({
    id: user?.id || '',
    email: user?.email || '',
  });

  const { mutate: friendListAddToGroup } = useAddFriendListToGroup();

  const insertFriendData = {
    group_id: 1,
    // 내 친구만이 뜰테니까 이 친구가 내 친구인지 검사 할 필요는 없나?
    friend_id_list: [4, 5, 6],
  };

  const handleSaveAll = () => {
    friendListAddToGroup(insertFriendData);
  };

  return (
    <Box>
      <Typography variant="h5">그룹에 속하지 않은 친구 리스트</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>start_station</TableCell>
            <TableCell>group id</TableCell>
            <TableCell>group name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {noGroupFriendList?.map((friend, index) => (
            <TableRow key={index}>
              <TableCell>{friend.id}</TableCell>
              <TableCell>{friend.name}</TableCell>
              <TableCell>{friend.start_station}</TableCell>
              <TableCell>
                {friend.friend_link_group.length > 0
                  ? friend.friend_link_group
                      .map((group) => group.group_id)
                      .join(', ')
                  : null}
              </TableCell>
              <TableCell>
                {friend.friend_link_group.length > 0
                  ? friend.friend_link_group
                      .map((group) => group.group.group_name)
                      .join(', ')
                  : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        sx={{ border: 'solid 1px', margin: '20px 0' }}
        onClick={handleSaveAll}
      >
        4,5,6 친구들 한번에 1번 그룹에 추가
      </Button>

      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        결과 확인
      </Typography>

      <Typography>친구 리스트</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>start_station</TableCell>
            <TableCell>group id</TableCell>
            <TableCell>group name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {friendData?.map((friend, index) => (
            <TableRow key={index}>
              <TableCell>{friend.id}</TableCell>
              <TableCell>{friend.name}</TableCell>
              <TableCell>{friend.start_station}</TableCell>
              <TableCell>
                {friend.friend_link_group.length > 0
                  ? friend.friend_link_group
                      .map((group) => group.group_id)
                      .join(', ')
                  : null}
              </TableCell>
              <TableCell>
                {friend.friend_link_group.length > 0
                  ? friend.friend_link_group
                      .map((group) => group.group.group_name)
                      .join(', ')
                  : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default YejinGetFriendListpage;
