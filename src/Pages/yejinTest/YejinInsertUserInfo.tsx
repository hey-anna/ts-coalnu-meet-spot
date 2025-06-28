import useCreateUserInfo from '@/domain/user/hooks/useCreateUserInfo';
import type { UserInfoReQuest } from '@/domain/user/models/model';
import { useUserStore } from '@/domain/user/store/userStore';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const SaveButton = styled(Button)(({ theme }) => ({
  border: 'solid 1px',
  borderColor: theme.palette.primary.main,
}));

const YejinInsertUserInfo = () => {
  const { user } = useUserStore();
  const [userInfo, setUserInfo] = useState<UserInfoReQuest>({
    user_id: user?.id || '',
    user_name: '',
    user_start_station: '',
  });
  const { mutate: createUserInfo } = useCreateUserInfo();

  useEffect(() => {
    if (user) {
      setUserInfo({ ...userInfo, user_id: user?.id });
    }
  }, [user]);

  const handleSaveUserInfo = () => {
    console.log('userInfo : ', userInfo);
    createUserInfo(userInfo);
  };

  return (
    <Box>
      <Typography>사용자 .UUID : {user?.id}</Typography>

      <Box display="flex" gap="10px" alignItems="center">
        <TextField
          id="user_name"
          label="이름"
          type="text"
          value={userInfo.user_name}
          onChange={(e) =>
            setUserInfo({ ...userInfo, user_name: e.target.value })
          }
          placeholder="이름"
          required
          // error={validationErrorMsg.label == 'email'}
          // helperText={
          //   validationErrorMsg.label == 'email'
          //     ? validationErrorMsg.message
          //     : null
          // }
        />

        <TextField
          id="user_start_station"
          label="출발역"
          type="text"
          value={userInfo.user_start_station}
          onChange={(e) =>
            setUserInfo({ ...userInfo, user_start_station: e.target.value })
          }
          placeholder="출발역"
          required
          // error={validationErrorMsg.label == 'email'}
          // helperText={
          //   validationErrorMsg.label == 'email'
          //     ? validationErrorMsg.message
          //     : null
          // }
        />

        <SaveButton onClick={handleSaveUserInfo}>저장하기</SaveButton>
      </Box>
    </Box>
  );
};

export default YejinInsertUserInfo;
