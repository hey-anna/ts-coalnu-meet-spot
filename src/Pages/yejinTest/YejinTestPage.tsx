import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../domain/user/store/userStore';
import {
  Box,
  Button,
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

const SubmitButton = styled(Button)(({ theme }) => ({
  border: 'solid 1px',
  borderColor: theme.palette.primary.main,
  marginLeft: '10px',
}));

const YejinTestPage = () => {
  const { user } = useUserStore();
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [newGroupError, setNewGroupError] = useState<string>('');
  const { mutate: addNewGroup } = useAddNewGroup();

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

  const handleSaveGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('세로운 그룹 이름 : ', newGroupName);

    if (!user?.id) {
      return setNewGroupError('로그인 먼저 해주세요');
    }

    const isExisted = checkNewGroupName(newGroupName);

    console.log('isExisted : ', isExisted);

    if (!isExisted) {
      setNewGroupError('');
      addNewGroup({ user_id: user?.id, group_name: newGroupName });
    }
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
          <SubmitButton type="submit">저장</SubmitButton>
        </form>
      </Box>
      <Typography>Friend Insert Test</Typography>
      <FriendInset />
      <Typography variant="h5">select 결과</Typography>
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
              <TableCell>subway_line</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {friendData?.map((friend, index) => (
              <TableRow key={index}>
                <TableCell>{friend.id}</TableCell>
                <TableCell>{friend.name}</TableCell>
                <TableCell>{friend.start_station}</TableCell>
                <TableCell>{friend.friend_group_id}</TableCell>
                <TableCell>{friend.friend_group?.group_name}</TableCell>
                <TableCell>{friend.subway_line}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default YejinTestPage;
