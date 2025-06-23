import { useState } from 'react';
import { useUserStore } from '../../User/store/userStore';
import { Box } from '@mui/material';

// zustand 기본 테스트
const TestPage = () => {
  const { userIdList, addUserId, removeUserId } = useUserStore();
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.custom?.bgHover,
          borderColor: theme.palette.custom?.borderLight,
        })}
      >
        커스텀 색상 사용 박스
      </Box>
      {userIdList.map((id) => (
        <div>
          <p>{id}</p>
          <button onClick={() => removeUserId(id)}>제거</button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="유저 아이디 입력"
      />
      <button onClick={() => addUserId(inputValue)}></button>
    </div>
  );
};

export default TestPage;
