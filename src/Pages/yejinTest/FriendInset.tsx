import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import type {
  AddNewFriendRequest,
  Friend,
} from '../../domain/user/models/model';
import { useUserStore } from '../../domain/user/store/userStore';
import useGetCurrentUserGroup from '../../domain/user/hooks/useGetCurrentUserGroup';
import './yejinTest.css';
import useAddNewFriend from '../../domain/user/hooks/useAddNewFriend';

const SubmitButton = styled(Button)(({ theme }) => ({
  border: 'solid 1px',
  borderColor: theme.palette.primary.main,
  marginLeft: '10px',
}));

const FriendInset = () => {
  const { user } = useUserStore();
  const [newFriend, setNewFriend] = useState<AddNewFriendRequest>({
    user_id: user?.id || '',
    name: '',
    start_station: '',
    friend_group_id: null,
    subway_line: null,
  });

  const [newFriendError, setNewFriendError] = useState<{
    label: string;
    message: string;
  }>({
    label: '',
    message: '',
  });

  useEffect(() => {
    if (user) {
      setNewFriend({ ...newFriend, user_id: user?.id });
    }
  }, [user]);

  const { data: groupData } = useGetCurrentUserGroup({
    id: user?.id || '',
    email: user?.email || '',
  });

  const { mutate: addNewFriend } = useAddNewFriend();

  const handleSaveFriend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('추가할 newFriend의 정보 : ', newFriend);

    if (!user) {
      return setNewFriendError({
        label: 'id',
        message: '로그인 해주세요',
      });
    } else {
      setNewFriend({ ...newFriend, user_id: user.id });
    }

    if (newFriend.name == '')
      return setNewFriendError({
        label: 'name',
        message: '이름을 입력해주세요',
      });

    if (newFriend.start_station == '')
      return setNewFriendError({
        label: 'start_station',
        message: '출발지를 입력해주세요',
      });

    setNewFriendError({ label: '', message: '' });

    addNewFriend(newFriend);
  };

  return (
    <Box>
      <form onSubmit={handleSaveFriend} className="friendInfoForm">
        <TextField
          id="name"
          label="name"
          type="text"
          value={newFriend.name}
          onChange={(e) =>
            setNewFriend({ ...newFriend, name: e.currentTarget.value })
          }
          error={newFriendError.label === 'name'}
          helperText={
            newFriendError.label === 'name' ? newFriendError.message : null
          }
        />

        <TextField
          id="start_station"
          label="start_station"
          type="text"
          value={newFriend.start_station}
          onChange={(e) =>
            setNewFriend({ ...newFriend, start_station: e.currentTarget.value })
          }
          error={newFriendError.label === 'start_station'}
          helperText={
            newFriendError.label === 'start_station'
              ? newFriendError.message
              : null
          }
        />

        <FormControl
          sx={{ width: '150px' }}
          error={newFriendError.label === 'friend_group'}
        >
          <InputLabel id="demo-simple-select-error-label">
            friend group
          </InputLabel>
          <Select
            id="friend_group"
            value={
              newFriend.friend_group_id === null
                ? ''
                : String(newFriend.friend_group_id)
            }
            label="friend_group"
            onChange={(e) =>
              setNewFriend({
                ...newFriend,
                friend_group_id:
                  e.target.value === '' ? null : Number(e.target.value),
              })
            }
          >
            {groupData && groupData.length > 0 ? (
              // groupData.map((group) => (
              //   <MenuItem value={group.id} key={group.id}>
              //     {group.group_name}
              //   </MenuItem>
              // ))
              [
                <MenuItem key="none" value="">
                  없음
                </MenuItem>,
                ...groupData.map((group) => (
                  <MenuItem value={group.id} key={group.id}>
                    {group.group_name}
                  </MenuItem>
                )),
              ]
            ) : (
              <MenuItem disabled>그룹이 없습니다</MenuItem>
            )}
          </Select>
          <FormHelperText>
            {newFriendError.label === 'friend_group'
              ? newFriendError.message
              : null}
          </FormHelperText>
        </FormControl>

        <TextField
          id="subway_line"
          label="subway_line"
          type="text"
          value={newFriend.subway_line}
          onChange={(e) =>
            setNewFriend({ ...newFriend, subway_line: e.currentTarget.value })
          }
          error={newFriendError.label === 'subway_line'}
          helperText={
            newFriendError.label === 'subway_line'
              ? newFriendError.message
              : null
          }
        />

        <SubmitButton type="submit">저장</SubmitButton>
      </form>
      {newFriendError.label == 'id' && (
        <Typography>{newFriendError.message}</Typography>
      )}
    </Box>
  );
};

export default FriendInset;
