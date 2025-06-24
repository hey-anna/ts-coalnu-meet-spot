import { Button, FormControl, OutlinedInput, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useLogin from '../hooks/useLogin';
import { useLoginUserStore } from '../../user/store/userStore';
import useLogout from '../hooks/useLogout';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {
    mutate: loginWithEmail,
    isSuccess,
    isError,
    error,
    isPending,
  } = useLogin();
  const { mutate: logout, isSuccess: logoutSuccess } = useLogout();

  const { user } = useLoginUserStore();

  useEffect(() => {
    if (user) {
      console.log('로그인 한 user 정보 : ', user);
    }
  }, [user]); // user가 바뀔 때만 실행

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    if (!user) {
      console.log('Email:', email);
      console.log('Password:', password);

      loginWithEmail({ email: email, password: password });
    } else {
      logout();
    }
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormControl sx={{ width: '25ch', mb: 2 }}>
          <OutlinedInput
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ width: '25ch', mb: 2 }}>
          <OutlinedInput
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          {user ? '로그아웃' : '로그인'}
        </Button>
      </form>

      {user && (
        <>
          <div>user email : {user.email}</div>
          <div>user uuid : {user.id}</div>
        </>
      )}

      {!user && logoutSuccess && (
        <Typography color="success">로그아웃 성공!</Typography>
      )}
      {isError && <Typography color="error">{error.message}</Typography>}
      {isSuccess && user && (
        <Typography color="primary">로그인 성공!</Typography>
      )}
    </>
  );
};

export default LoginForm;
