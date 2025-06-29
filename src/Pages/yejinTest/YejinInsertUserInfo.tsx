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
    createUserInfo(userInfo);
  };

  return (
    <Box>
      <Typography>사용자 .UUID : {user?.id}</Typography>

      <Box
        sx={{ marginBottom: '20px' }}
        display="flex"
        gap="10px"
        alignItems="center"
      >
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

      <div style={{ width: '70%', maxWidth: '450px' }}>
        <div
          style={{
            backgroundColor: '#6c5ce7',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 0',
            gap: '10px',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <img
            style={{ width: '50px', height: '40px' }}
            src="https://res.cloudinary.com/dor26tdln/image/upload/v1751124414/meet-spot-initial-logo_bygyyg.png"
            alt="로고 이니셜 이미지"
          />
          <img
            style={{ width: '100px', height: '23px' }}
            src="https://res.cloudinary.com/dor26tdln/image/upload/v1751124414/meet-spot-font-logo_dnnvmc.png"
            alt="로고 글씨 이미지"
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '15px 0',
            gap: '20px',
          }}
        >
          <h2 style={{ margin: '0px' }}>회원가입에 축하합니다!!</h2>
          <div style={{ margin: '0px' }}>
            아래 링크로 접속하여 이메일 인증을 완료해주세요!
          </div>

          <div style={{ border: 'solid 1px black', padding: '10px 20px' }}>
            <p>
              <a href="qwewqewqe}">Confirm your mail</a>
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#6c5ce7',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 0',
            gap: '10px',
            justifyContent: 'center',
            width: '100%',
            height: '20px',
          }}
        ></div>
      </div>
    </Box>
  );
};

export default YejinInsertUserInfo;
