import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import useSignUp from '../hooks/useSignUp';
import './authdomain.css';
import { useNavigate } from 'react-router';

const LoginButton = styled(Button)(({ theme }) => ({
  border: 'solid 1px',
  borderColor: theme.palette.primary.main,

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

const SignUpForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { mutate: signupWithEmail, isSuccess } = useSignUp();
  const navigate = useNavigate();

  // 🔽 onSubmit 함수는 여기서 정의
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    console.log('Email:', email);
    console.log('Password:', password);

    const data = signupWithEmail({ email: email, password: password });

    setEmail('');
    setPassword('');

    setShowMessage(true);

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '15px',
        }}
      >
        <Typography>이메일을 확인해주세요</Typography>
        <Typography>
          단, 이메일을 못받으셨다면 해당 이메일은 사용이 불가합니다.
        </Typography>
      </Box>
    );
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      className="joinFormContainer"
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        회원가입
      </Typography>
      {showMessage ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <Typography>이메일을 확인해주세요</Typography>
          <Typography>
            단, 이메일을 못받으셨다면 해당 이메일은 사용이 불가합니다.
          </Typography>

          <LoginButton onClick={() => navigate('/login')}>
            로그인하러 가기
          </LoginButton>
        </Box>
      ) : (
        <>
          <TextField
            id="email-input"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary">
            회원가입 하기
          </Button>
        </>
      )}
    </form>
  );
};

export default SignUpForm;
