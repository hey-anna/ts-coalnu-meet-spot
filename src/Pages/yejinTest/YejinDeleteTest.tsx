import useGetUserFriendByGroup from '@/domain/user/hooks/useGetUserFriendByGroup';
import { useUserStore } from '@/domain/user/store/userStore';
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useDeleteFriendFromGroup from '@/domain/user/hooks/useDeleteFriendFromGroup';
import useDeleteGroup from '@/domain/user/hooks/useDeleteGroup';
import useGetCurrentUserGroup from '@/domain/user/hooks/useGetCurrentUserGroup';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { colorPalette } from '@/shared/config/config';
import useUpdateGroupInfo from '@/domain/user/hooks/useUpdateGroupInfo';
import useGetUserFriendList from '@/domain/user/hooks/useGetUserFriendList';
import useDeleteFriend from '@/domain/user/hooks/useDeleteFriend';
import useUpdateFriendInfo from '@/domain/user/hooks/useUpdateFriendInfo';
import type { ErrorMsg } from '@/domain/user/models/model';

const FriendButton = styled(Button)(({ theme }) => ({
  color: 'white',
  borderColor: 'white',
  borderRadius: '15px',

  '&:hover': {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
  },
}));

const YejinDeleteTest = () => {
  const { user } = useUserStore();
  const { data } = useGetUserFriendByGroup(user?.id);
  const { mutate: deleteFriendFromGroup } = useDeleteFriendFromGroup();
  const { mutate: deleteGroup } = useDeleteGroup();
  const { data: groupData } = useGetCurrentUserGroup({
    id: user?.id,
    email: user?.email,
    user_name: '',
    user_start_station: '',
  });
  const { data: friendData } = useGetUserFriendList({
    id: user?.id,
    email: user?.email,
    user_name: '',
    user_start_station: '',
  });
  const { mutate: updateGroupInfoHook, error: updateGroupInfoError } =
    useUpdateGroupInfo();
  const { mutate: deleteFriend } = useDeleteFriend();
  const { mutate: updateFriendInfoHook, error: updateFriendInfoError } =
    useUpdateFriendInfo();

  const [updateGroupInfo, setUpdateGroupInfo] = useState<{
    group_name: string;
    group_color: string;
  }>({
    group_name: '',
    group_color: '',
  });

  const [updateFriendInfo, setUpdateFriendInfo] = useState<{
    name: string;
    start_station: string;
  }>({
    name: '',
    start_station: '',
  });

  const [showGroupInputBox, setShowGroupInputBox] = useState<number | null>(
    null,
  );
  const [newGroupError, setNewGroupError] = useState<string>('');
  const [showFriendInputBox, setShowFriendInputBox] = useState<number | null>(
    null,
  );
  const [newFriendError, setNewFriendError] = useState<string>('');

  const handleDeleteFriendFromGroup = (group_id: number, friend_id: number) => {
    console.log('group_id : ', group_id, ' friend_id : ', friend_id);

    deleteFriendFromGroup({ group_id, friend_id });
  };

  const handleDeleteGroup = (group_id: number) => {
    console.log('삭제 대상 그룹 : ', group_id);
    deleteGroup(group_id);
  };

  const handleUpdateGroup = (group_id) => {
    console.log(group_id);
    console.log('updateGroupInfo : ', updateGroupInfo);
    // const isExisted = checkNewGroupName(updateGroupInfo.group_name);

    // console.log('isExisted : ', isExisted);

    setNewGroupError('');
    updateGroupInfoHook({
      group_id,
      ...(updateGroupInfo.group_name && {
        group_name: updateGroupInfo.group_name || null,
      }),
      ...(updateGroupInfo.group_color && {
        group_color: updateGroupInfo.group_color || null,
      }),
    });
    //   if (!isExisted) {
    // }
  };

  useEffect(() => {
    const error = updateGroupInfoError as ErrorMsg;

    if (error?.code == '23505') {
      setNewGroupError('이미 있는 그룹명입니다.');
    } else {
      setNewGroupError('');
    }
  }, [updateGroupInfoError]);

  useEffect(() => {
    const error = updateFriendInfoError as ErrorMsg;

    console.log('화면단 : ', error);
    if (error?.code == '23505') {
      setNewFriendError('같은 이름, 같은 출발지의 친구가 이미 있습니다.');
    } else {
      setNewFriendError('');
    }
  }, [updateFriendInfoError]);

  const handleInputShow = (group_id) => {
    setShowGroupInputBox(group_id);
  };

  // function checkNewGroupName(name: string): boolean {
  //   if (groupData?.some((group) => group.group_name === name)) {
  //     setNewGroupError('이미 있는 그룹명입니다.');
  //     return true;
  //   } else {
  //     setNewGroupError('');
  //     return false;
  //   }
  // }

  function handleDeleteFriend(friend_id: number) {
    deleteFriend(friend_id);
  }

  function handleUpdateFriend(friend_id) {
    console.log('friend_id : ', friend_id);
    console.log('updateFriendInfo : ', updateFriendInfo);

    updateFriendInfoHook({
      friend_id,
      ...(updateFriendInfo.name && {
        name: updateFriendInfo.name || null,
      }),
      ...(updateFriendInfo.start_station && {
        start_station: updateFriendInfo.start_station || null,
      }),
    });
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ margin: '20px 0' }}>
        친구 목록
      </Typography>

      <Grid container spacing={2}>
        {friendData?.map((friend) => (
          <Grid
            display="flex"
            gap="5px"
            justifyContent="space-between"
            size={{ xs: 12, sm: 6 }}
            sx={{
              border: 'solid 1px black',
              padding: '10px',
            }}
          >
            <Typography variant="h6">{friend.name}</Typography>
            <Typography variant="h6">{friend.start_station}</Typography>
            <IconButton onClick={(e) => setShowFriendInputBox(friend.id)}>
              <ModeEditIcon />
            </IconButton>
            <Box>
              <Box
                gap="5px"
                alignItems="center"
                sx={{
                  display: showFriendInputBox === friend.id ? 'flex' : 'none',
                }}
              >
                <TextField
                  type="text"
                  value={updateFriendInfo.name}
                  onChange={(e) =>
                    setUpdateFriendInfo({
                      ...updateFriendInfo,
                      name: e.target.value,
                    })
                  }
                />

                <TextField
                  type="text"
                  value={updateFriendInfo.start_station}
                  onChange={(e) =>
                    setUpdateFriendInfo({
                      ...updateFriendInfo,
                      start_station: e.target.value,
                    })
                  }
                />

                <Button
                  sx={{ color: 'black', border: 'solid 1px black' }}
                  onClick={() => handleUpdateFriend(friend.id)}
                >
                  저장
                </Button>
              </Box>
            </Box>

            <IconButton onClick={() => handleDeleteFriend(friend.id)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        ))}
        {newFriendError && <Box sx={{ color: 'red' }}>{newFriendError}</Box>}
      </Grid>

      <Typography variant="h5" sx={{ margin: '20px 0' }}>
        그룹 목록
      </Typography>

      <Grid container spacing={2}>
        {groupData?.map((group) => (
          <Grid
            display="flex"
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{
              backgroundColor: `${group.group_color}`,
              color: 'white',
              padding: '10px',
            }}
          >
            <Typography variant="h6">{group.group_name}</Typography>
            <IconButton onClick={(e) => handleInputShow(group.id)}>
              <ModeEditIcon />
            </IconButton>
            <Box
              gap="5px"
              alignItems="center"
              sx={{
                display: showGroupInputBox === group.id ? 'flex' : 'none',
              }}
            >
              <TextField
                type="text"
                value={updateGroupInfo.group_name}
                onChange={(e) =>
                  setUpdateGroupInfo({
                    ...updateGroupInfo,
                    group_name: e.target.value,
                  })
                }
                error={Boolean(newGroupError)}
                helperText={newGroupError ? newGroupError : null}
              />
              <Select
                id="group_color"
                value={updateGroupInfo.group_color}
                label="group_color"
                onChange={(e) =>
                  setUpdateGroupInfo({
                    ...updateGroupInfo,
                    group_color: e.target.value,
                  })
                }
                sx={{
                  border: 'solid 1px white',
                  backgroundColor: 'white',
                  width: '100px',
                }}
              >
                {colorPalette &&
                  colorPalette.map((color, colorIndex) => (
                    <MenuItem value={color} key={colorIndex}>
                      {color}
                    </MenuItem>
                  ))}
              </Select>

              <Button
                sx={{ color: 'white', border: 'solid 1px white' }}
                onClick={() => handleUpdateGroup(group.id)}
              >
                저장
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ margin: '20px 0' }}>
        그룹별 친구 목록
      </Typography>

      <Grid container spacing={2}>
        {data?.map((group) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={group.id}
            sx={{
              backgroundColor: `${group.group_color}`,
              color: 'white',
              padding: '10px',
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: '10px' }}
            >
              <Typography variant="h6">{group.group_name}</Typography>
              <IconButton
                sx={{ color: 'white' }}
                onClick={() => handleDeleteGroup(group.id)}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box display="flex" gap="8px" flexWrap="wrap">
              {group.friend_link_group.length > 0 &&
                group.friend_link_group.map((item) => (
                  <FriendButton
                    onClick={() =>
                      handleDeleteFriendFromGroup(group.id, item.friend.id)
                    }
                    variant="outlined"
                    endIcon={<CloseIcon />}
                    key={item.friend.id}
                  >
                    {item.friend.name}
                  </FriendButton>
                ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default YejinDeleteTest;
