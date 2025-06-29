import {
  Box,
  Chip,
  Paper,
  styled,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router';
import {
  AuthPageContainer,
  AuthFormContainer,
  AuthTitle,
  AuthButton,
  AuthLink,
  AuthMessage,
} from './authStyle';
import TrainIcon from '@mui/icons-material/Train';
import ClearIcon from '@mui/icons-material/Clear'; // 추가된 아이콘
import { getLineColor, STATION_CONFIG } from '@/shared/config/stationConfig';
import type { StationData } from '@/shared/models/station';

const SignUpForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState('');
  const [stationSearchQuery, setStationSearchQuery] = useState<string>('');
  const [showStationDropdown, setShowStationDropdown] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const {
    mutate: signupWithEmail,
    isSuccess,
    isPending,
    isError,
    error,
  } = useSignUp();
  const navigate = useNavigate();

  const [validationErrorMsg, setValidationErrorMsg] = useState<{
    label: string;
    message: string;
  }>({
    label: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      return; // 에러는 helperText로 표시됨
    }

    signupWithEmail({
      email: email,
      password: password,
      user_name: userName,
      user_start_station: selectedStation,
    });

    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowMessage(true);
  };

  // 이메일 형식 검사
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

  function emailValidChk(value: string) {
    if (pattern.test(value) === false) {
      setValidationErrorMsg({
        label: 'email',
        message: '이메일 형식이 맞지 않습니다.',
      });
      return false;
    } else {
      setValidationErrorMsg({ label: '', message: '' });
      return true;
    }
  }

  const filteredStations =
    stationSearchQuery.length > 0
      ? STATION_CONFIG.DATA.filter(
          (station: StationData) =>
            station.station_nm
              .toLowerCase()
              .includes(stationSearchQuery.toLowerCase()) ||
            station.line_num.includes(stationSearchQuery),
        ).slice(0, 8) // 최대 8개 결과만 표시
      : [];

  const handleStationSelect = (station: StationData) => {
    const displayText = `${station.station_nm} (${station.line_num})`;
    setSelectedStation(station.station_nm);
    setStationSearchQuery(displayText);
    setShowStationDropdown(false);
  };

  const handleStationSearch = (query: string) => {
    setStationSearchQuery(query);
    setShowStationDropdown(query.length > 0);

    // 검색어가 있으면 선택된 역 초기화 (새로 입력하는 경우)
    if (query !== selectedStation) {
      setSelectedStation('');
    }
  };

  // 지하철역 검색창 초기화 함수 추가
  const handleClearStation = () => {
    setStationSearchQuery('');
    setSelectedStation('');
    setShowStationDropdown(false);
  };

  return (
    <AuthPageContainer>
      <AuthFormContainer noValidate autoComplete="off" onSubmit={handleSubmit}>
        <AuthTitle variant="h4">회원가입</AuthTitle>

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
                opacity: 0.8,
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
              onChange={(e) => {
                setEmail(e.target.value);
                emailValidChk(e.target.value);
              }}
              placeholder="example@email.com"
              required
              fullWidth
              error={validationErrorMsg.label == 'email'}
              helperText={
                validationErrorMsg.label == 'email'
                  ? validationErrorMsg.message
                  : null
              }
            />

            <TextField
              id="password-input"
              label="비밀번호"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length < 8) {
                  setValidationErrorMsg({
                    label: 'password',
                    message: '비밀번호는 8자 이상입니다.',
                  });
                } else {
                  setValidationErrorMsg({ label: '', message: '' });
                }
              }}
              placeholder="8자 이상의 비밀번호"
              required
              fullWidth
              error={validationErrorMsg.label == 'password'}
              helperText={
                validationErrorMsg.label == 'password'
                  ? validationErrorMsg.message
                  : null
              }
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

            <TextField
              id="user_name"
              label="사용자이름"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="사용자 이름"
              required
              fullWidth
            />

            {/* 출발역 입력창 - 다른 TextField와 동일한 디자인 */}
            <StationSearchContainer>
              <TextField
                id="user_start_station"
                label="출발역"
                value={stationSearchQuery}
                onChange={(e) => handleStationSearch(e.target.value)}
                onFocus={() => {
                  if (stationSearchQuery.length > 0) {
                    setShowStationDropdown(true);
                  }
                }}
                onBlur={() => {
                  // 약간의 지연을 두어 클릭 이벤트가 처리되도록 함
                  setTimeout(() => setShowStationDropdown(false), 200);
                }}
                placeholder="역 이름을 검색하세요"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <TrainIcon
                      sx={{
                        color: 'text.secondary',
                        mr: 1,
                        fontSize: { xs: '18px', sm: '20px' },
                      }}
                    />
                  ),
                  // 삭제 버튼 추가
                  endAdornment: stationSearchQuery && (
                    <IconButton
                      aria-label="clear search"
                      onClick={handleClearStation}
                      edge="end"
                      size="small"
                      sx={{
                        color: 'text.secondary',
                        padding: '4px',
                        fontSize: { xs: '16px', sm: '18px' },
                        '&:hover': {
                          color: 'text.primary',
                          backgroundColor: 'rgba(0,0,0,0.04)',
                        },
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  ),
                }}
                sx={{
                  // 드롭다운이 열릴 때 하단 보더 제거
                  '& .MuiOutlinedInput-root': {
                    ...(showStationDropdown &&
                      filteredStations.length > 0 && {
                        '& fieldset': {
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        },
                      }),
                  },
                }}
              />

              {/* 드롭다운 */}
              {showStationDropdown && filteredStations.length > 0 && (
                <StationDropdown elevation={3}>
                  {filteredStations.map((station) => (
                    <StationOption
                      key={`${station.station_cd}-${station.line_num}`}
                      onClick={() => handleStationSelect(station)}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: { xs: 0.8, sm: 1 },
                        }}
                      >
                        <TrainIcon
                          sx={{
                            fontSize: { xs: '14px', sm: '16px' },
                            color: 'text.secondary',
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                        >
                          {station.station_nm}
                        </Typography>
                      </Box>
                      <LineChip
                        label={station.line_num}
                        size="small"
                        sx={{
                          backgroundColor: `${getLineColor(station.line_num)}15`,
                          color: getLineColor(station.line_num),
                          border: `1px solid ${getLineColor(station.line_num)}30`,
                          fontSize: { xs: '0.6rem', sm: '0.7rem' },
                          height: { xs: 20, sm: 22 },
                        }}
                      />
                    </StationOption>
                  ))}
                </StationDropdown>
              )}
            </StationSearchContainer>

            <AuthLink onClick={() => navigate('/login')}>
              이미 계정이 있으신가요? 로그인하기
            </AuthLink>

            <AuthButton
              type="submit"
              className={isPending ? 'loading' : ''}
              disabled={
                isPending ||
                !email ||
                !userName ||
                !selectedStation ||
                password.length < 8 ||
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
            <AuthTitle
              variant="body2"
              sx={{ fontSize: '14px !important', fontWeight: '500 !important' }}
            >
              {error?.message || '회원가입에 실패했습니다.'}
            </AuthTitle>
          </AuthMessage>
        )}
      </AuthFormContainer>
    </AuthPageContainer>
  );
};

export default SignUpForm;

// 스타일 컴포넌트들
const StationSearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const StationDropdown = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: 'calc(100% - 1px)', // TextField와 정확히 붙도록
  left: 0,
  right: 0,
  backgroundColor: 'white',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  maxHeight: '200px',
  overflowY: 'auto',
  zIndex: 1300,
  border: '1px solid rgba(0,0,0,0.23)',
  borderTop: 'none', // 상단 보더 제거로 TextField와 연결

  // 스크롤바 스타일
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '3px',
  },

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    maxHeight: '180px',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    maxHeight: '160px',
  },
}));

const StationOption = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  transition: 'background-color 0.2s ease',

  '&:hover': {
    backgroundColor: '#f5f5f5',
  },

  '&:last-child': {
    borderBottom: 'none',
  },

  // 모바일 대응
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 1.5),
  },

  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1, 1.2),
  },
}));

const LineChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.7rem',
  height: 22,
  borderRadius: '11px',
  '& .MuiChip-label': {
    padding: '0 8px',
    fontWeight: 500,
  },

  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
    height: 20,
    '& .MuiChip-label': {
      padding: '0 6px',
    },
  },
}));
