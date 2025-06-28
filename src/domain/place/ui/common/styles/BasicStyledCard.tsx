import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const BasicStyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  
  // 모바일에서는 통합 카드로 보이도록 수정
  [theme.breakpoints.down('sm')]: {
    boxShadow: 'none', // 그림자 제거
    borderRadius: 0, // 모서리 둥글기 제거
    backgroundColor: theme.palette.background.paper, // 배경 투명
    border: 'none', // 테두리 제거
  }
}));

export default BasicStyledCard;