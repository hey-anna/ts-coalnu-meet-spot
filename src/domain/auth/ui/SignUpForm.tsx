import { Button, FormControl, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import useSignUp from '../hooks/useSignUp';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: signupWithEmail, isSuccess } = useSignUp();

  // 🔽 onSubmit 함수는 여기서 정의
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    console.log('Email:', email);
    console.log('Password:', password);

    const data = signupWithEmail({ email: email, password: password });
  };

  return (
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
        회원가입
      </Button>
    </form>
  );
};

export default SignUpForm;
