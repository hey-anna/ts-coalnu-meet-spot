import { useState, useEffect } from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';

const NoticeModal = () => {
  const [open, setOpen] = useState(false);

  //   useEffect(() => {
  //     const hasSeen = localStorage.getItem('popupSeen');
  //     if (!hasSeen) {
  //       setOpen(true);
  //       localStorage.setItem('popupSeen', 'true');
  //     }
  //   }, []);

  useEffect(() => {
    // localStorage 없이 항상 팝업 띄우기
    setOpen(true);
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: 'bold', color: '#7C3AED', mb: 1 }}
        >
          📢 안내드립니다
        </Typography>
        <Box mt={1}>
          <Typography
            variant="body2"
            sx={{ color: '#555', mb: 1, lineHeight: 1.6 }}
          >
            <strong>1. API 요청 관련 안내</strong>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#555', mb: 1, lineHeight: 1.6 }}
            align="left"
          >
            현재 이 사이트는 무료 API를 사용 중이며,
            <br />
            <strong>하루 1,000회 요청 제한</strong>이 있습니다.
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography
            variant="body2"
            sx={{ color: '#555', mb: 1, lineHeight: 1.6 }}
          >
            📍 <strong>후보 장소 1곳당 약 15회</strong>의 요청이 발생하므로,
            <br />
            3~4곳 선택 시 <strong>한 번에 40회 이상</strong> 요청될 수 있습니다.
          </Typography>
        </Box>
        <Box mt={1} mb={2}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            반복 테스트 시 제한에 도달할 수 있으니 참고해주세요 🙏
          </Typography>
        </Box>
        <Box mt={1} mb={2}>
          <Typography
            variant="body2"
            sx={{ color: '#555', mb: 1, lineHeight: 1.6 }}
          >
            <strong>2. 로그인 관련 안내</strong>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            현재{' '}
            <strong>회원가입 및 로그인 기능이 정상 작동하지 않습니다.</strong>
            <br />
            백엔드 연동 문제로 일시적으로 사용이 중단된 상태입니다.
            <br />
            로그인 없이 이용해주세요 🙇‍♀️
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            backgroundColor: '#7C3AED',
            textTransform: 'none',
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
            py: 1,
            '&:hover': { backgroundColor: '#6D28D9' },
          }}
        >
          확인했어요
        </Button>
      </Box>
    </Modal>
  );
};

export default NoticeModal;
