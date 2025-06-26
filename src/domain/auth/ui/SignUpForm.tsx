import { TextField } from '@mui/material';
import { useState } from 'react';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router';
import {
  AuthPageContainer,
  AuthFormContainer,
  AuthTitle,
  AuthButton,
  AuthLink,
  AuthMessage
} from './authStyle';

const SignUpForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { mutate: signupWithEmail, isSuccess, isPending, isError, error } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      return; // 에러는 helperText로 표시됨
    }

    console.log('Email:', email);
    console.log('Password:', password);

    signupWithEmail({ email: email, password: password });

    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowMessage(true);
  };

  return (
    <AuthPageContainer>
      <AuthFormContainer
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <AuthTitle variant="h4">
          회원가입
        </AuthTitle>
        
        {showMessage ? (
          <AuthMessage className="success">
            <AuthTitle variant="h6" sx={{ fontSize: '20px !important', mb: 1 }}>
              이메일을 확인해주세요 📧
            </AuthTitle>
            <AuthTitle 
              variant="body2" 
              sx={{ 
                fontSize: '14px !important', 
                fontWeight: '400 !important',
                lineHeight: 1.5,
                opacity: 0.8
              }}
            >
              회원가입 완료를 위해 이메일 인증이 필요합니다.
              <br />
              이메일을 받지 못하셨다면 해당 이메일 주소는 사용할 수 없습니다.
            </AuthTitle>

            <AuthButton onClick={() => navigate('/login')} sx={{ mt: 2 }}>
              로그인하러 가기
            </AuthButton>
          </AuthMessage>
        ) : (
          <>
            <TextField
              id="email-input"
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              fullWidth
            />

            <TextField
              id="password-input"
              label="비밀번호"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상의 비밀번호"
              required
              fullWidth
            />

            <TextField
              id="confirm-password-input"
              label="비밀번호 확인"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              required
              fullWidth
              error={password !== confirmPassword && confirmPassword !== ''}
              helperText={
                password !== confirmPassword && confirmPassword !== '' 
                  ? '비밀번호가 일치하지 않습니다.' 
                  : ''
              }
            />

            <AuthLink onClick={() => navigate('/login')}>
              이미 계정이 있으신가요? 로그인하기
            </AuthLink>

            <AuthButton 
              type="submit" 
              className={isPending ? 'loading' : ''}
              disabled={
                isPending || 
                !email || 
                !password || 
                !confirmPassword || 
                password !== confirmPassword
              }
            >
              {isPending ? '' : '회원가입하기'}
            </AuthButton>
          </>
        )}

        {/* 에러 메시지 */}
        {isError && !showMessage && (
          <AuthMessage className="error">
            <AuthTitle variant="body2" sx={{ fontSize: '14px !important', fontWeight: '500 !important' }}>
              {error?.message || '회원가입에 실패했습니다.'}
            </AuthTitle>
          </AuthMessage>
        )}
      </AuthFormContainer>
    </AuthPageContainer>
  );
};

export default SignUpForm;