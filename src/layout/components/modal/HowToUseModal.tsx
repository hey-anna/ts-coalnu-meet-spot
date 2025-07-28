import { Modal, Box, Typography, Button } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

const HowToUseModal = ({ open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 445,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          <strong>Guide</strong> 사용법 안내
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" mb={1.5}>
          1. 친구 이름을 입력하세요.
          <br />
          2. 각 친구의 활동 지하철역을 지정합니다
          <br />
          3. 후보 장소를 3~4곳 선택합니다
          <br />
          4. 최적 만남 장소를 계산해서 추천해드립니다!
        </Typography> */}
        <Typography
          variant="body2"
          color="text.secondary"
          mb={1.5}
          component="div"
        >
          <ol style={{ paddingLeft: '1.2em', margin: 0, lineHeight: '1.8' }}>
            <li>
              친구 이름과 출발역을 입력한 뒤 <strong>추가</strong> 버튼을
              누르세요 (최대 4명)
            </li>
            <li>
              하단에서 만남 후보 장소를 <strong>최대 4개</strong> 선택하세요
            </li>
            <li>
              <strong>"친구와 장소를 선택해주세요"</strong> 버튼을 눌러 결과를
              확인하세요
            </li>
          </ol>
        </Typography>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#7C3AED',
            '&:hover': { backgroundColor: '#6D28D9' },
          }}
          fullWidth
        >
          확인
        </Button>
      </Box>
    </Modal>
  );
};

export default HowToUseModal;
