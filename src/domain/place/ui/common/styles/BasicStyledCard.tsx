import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const BasicStyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

export default BasicStyledCard;
