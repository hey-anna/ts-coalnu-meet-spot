import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../domain/user/store/userStore';
import {
  Box,
  Button,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import useGetCurrentUserGroup from '../../domain/user/hooks/useGetCurrentUserGroup';
import useGetUserFriendList from '../../domain/user/hooks/useGetUserFriendList';
import useAddNewGroup from '../../domain/user/hooks/useAddNewGroup';
import FriendInset from './FriendInset';
import { colorPalette } from '@/shared/config/config';
import type { ErrorMsg } from '@/domain/user/models/model';

const SubmitButton = styled(Button)(({ theme }) => ({
  border: 'solid 1px',
  borderColor: theme.palette.primary.main,
  marginLeft: '10px',
}));

const YejinTestPage = () => {
  const { user } = useUserStore();
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [newGroupError, setNewGroupError] = useState<string>('');
  const [selectColor, setSelectColor] = useState<string>('');
  const { mutate: addNewGroup, error: addNewGroupError } = useAddNewGroup();

  const { data: groupData } = useGetCurrentUserGroup({
    id: user?.id || '',
    email: user?.email || '',
  });

  const { data: friendData } = useGetUserFriendList({
    id: user?.id || '',
    email: user?.email || '',
  });

  useEffect(() => {
    console.log('현재 유저가 가지고 있는 group list : ', groupData);
    console.log('현재 유저가 가지고 있는 friend list : ', friendData);
  }, [groupData, friendData]);

  useEffect(() => {
    const error = addNewGroupError as ErrorMsg;

    console.log('화면단 : ', error);

    if (error?.code == '23505') {
      setNewGroupError('같은 이름의 그룹이 이미 있습니다.');
    } else {
      setNewGroupError('');
    }
  }, [addNewGroupError]);

  const handleSaveGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('새로운 그룹 이름 : ', newGroupName);

    if (!user?.id) {
      return setNewGroupError('로그인 먼저 해주세요');
    }

    // const isExisted = checkNewGroupName(newGroupName);

    // console.log('isExisted : ', isExisted);

    setNewGroupError('');

    addNewGroup({
      user_id: user?.id,
      group_name: newGroupName,
      ...(selectColor && { group_color: selectColor || null }),
    });
    // if (!isExisted) {
    // }
  };

  function checkNewGroupName(name: string): boolean {
    if (groupData?.some((group) => group.group_name === name)) {
      setNewGroupError('이미 있는 그룹명입니다.');
      return true;
    } else {
      setNewGroupError('');
      return false;
    }
  }

  return (
    <div>
      예진 테스트 페이지
      {user && (
        <Box sx={{ borderBottom: 'solid 1px black', marginBottom: '20px' }}>
          <div>uuid : {user.id}</div>
          <div>email : {user.email}</div>
        </Box>
      )}
      <Typography variant="h5">group insert test</Typography>
      <Box>
        <form onSubmit={handleSaveGroup}>
          <TextField
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.currentTarget.value)}
            error={Boolean(newGroupError)}
            helperText={newGroupError ? newGroupError : null}
          />

          <Select
            id="group_color"
            value={selectColor}
            label="group_color"
            onChange={(e) => setSelectColor(e.target.value)}
          >
            {colorPalette &&
              colorPalette.map((color, colorIndex) => (
                <MenuItem value={color} key={colorIndex}>
                  {color}
                </MenuItem>
              ))}
          </Select>

          <SubmitButton type="submit">저장</SubmitButton>
        </form>
      </Box>
      <Typography variant="h5" sx={{ margin: '10px' }}>
        Friend Insert Test
      </Typography>
      <FriendInset />
      <Typography variant="h5" sx={{ marginTop: '10px' }}>
        select 결과
      </Typography>
      <Box
        sx={{ marginTop: '20px' }}
        display="flex"
        flexDirection="column"
        gap="10px"
      >
        <Typography>그룹 리스트</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupData?.map((group, index) => (
              <TableRow key={index}>
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.group_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
    </div>
  );
};

export default YejinTestPage;
