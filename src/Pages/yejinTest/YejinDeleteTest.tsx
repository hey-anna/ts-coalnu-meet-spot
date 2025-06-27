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
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useDeleteFriendFromGroup from '@/domain/user/hooks/useDeleteFriendFromGroup';
import useDeleteGroup from '@/domain/user/hooks/useDeleteGroup';
import useGetCurrentUserGroup from '@/domain/user/hooks/useGetCurrentUserGroup';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { colorPalette } from '@/shared/config/config';
import useUpdateGroupInfo from '@/domain/user/hooks/useUpdateGroupInfo';

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
  });
  const { mutate: updateGroupInfoHook } = useUpdateGroupInfo();

  const [updateGroupInfo, setUpdateGroupInfo] = useState<{
    group_name: string;
    group_color: string;
  }>({
    group_name: '',
    group_color: '',
  });

  const [showInputBox, setShowInputBox] = useState<number | null>(null);
  const [newGroupError, setNewGroupError] = useState<string>('');

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
    const isExisted = checkNewGroupName(updateGroupInfo.group_name);

    console.log('isExisted : ', isExisted);

    if (!isExisted) {
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
    }
  };

  const handleInputShow = (group_id) => {
    setShowInputBox(group_id);
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
    <Box>
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
                display: showInputBox === group.id ? 'flex' : 'none',
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
