import useGetCurrentUserGroup from '@/domain/user/hooks/useGetCurrentUserGroup';
import useGetUserFriendByGroup from '@/domain/user/hooks/useGetUserFriendByGroup';
import useGetUserNoGroupFriend from '@/domain/user/hooks/useGetUserNoGroupFriend';
import { useUserStore } from '@/domain/user/store/userStore';
import {
  Box,
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
  // const { data: groupByFriendList } = useGetUserFriendByGroup(user?.id);

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
    </Box>
  );
};

export default YejinGetFriendListpage;
