import { Box, CardContent, Grid, Stack, Typography } from '@mui/material';
import {
  AccessTime,
  DirectionsTransit,
  Room,
  SentimentSatisfiedAlt,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import BasicStyledCard from '../common/styles/BasicStyledCard';
import SatisfactionTooltip from '../common/components/SatisfactionTooltip';

interface MeetPointCardProps {
  selectedStationName: string;
  averageTime: number | null;
  averageTransferCount?: number;
  satisfactionRate?: string;
}

const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.5rem',
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: theme.typography.h5.fontSize,
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  minWidth: 48,
  minHeight: 48,
  borderRadius: 8,
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    width: 40,
    height: 40,
    minWidth: 40,
    minHeight: 40,
    borderRadius: 6,
  },
}));

const MeetPointCard = ({
  selectedStationName,
  averageTime,
  averageTransferCount,
  satisfactionRate,
}: MeetPointCardProps) => {
  return (
    <BasicStyledCard>
      <Box position="relative">
        <CardContent sx={{ 
          p: { xs: 2, sm: 3 } // 모바일에서 패딩 줄임
        }}>
          <Box 
            position="absolute" 
            top={{ xs: 12, sm: 16 }} 
            right={{ xs: 12, sm: 16 }} 
            zIndex={1}
          >
            <SatisfactionTooltip />
          </Box>
          
          <Box 
            display="flex" 
            alignItems="center" 
            gap={{ xs: 1.5, sm: 2 }} // 모바일에서 간격 줄임
            mb={{ xs: 2, sm: 3 }}
          >
            <IconWrapper>
              <Room
                sx={{
                  fontSize: { xs: 24, sm: 32 }, // 모바일에서 아이콘 크기 줄임
                  color: '#fff',
                  flexShrink: 0,
                }}
                color="primary"
              />
            </IconWrapper>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '1.25rem', sm: '2rem' }, // 모바일 최적화
                  fontWeight: 'bold',
                  lineHeight: 1.2,
                }}
                fontWeight={700}
              >
                {selectedStationName || '도착역 선택'}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                모든 친구들의 중간 지점
              </Typography>
            </Box>
          </Box>
          
          <Grid container spacing={{ xs: 1, sm: 2 }} mt={1}>
            <Grid size={4} textAlign="center">
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  backgroundColor: '#f8f9ff', // 친구 카드와 동일한 배경색
                  border: '1px solid #e8eaf6', // 친구 카드와 동일한 테두리
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: 1,
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                <StatValue sx={{ color: 'primary.main' }}>
                  {averageTime !== null ? `${averageTime}분` : '-'}
                </StatValue>
                <Stack
                  direction="row"
                  spacing={0.5}
                  justifyContent="center"
                  sx={{ mt: 0.5, color: 'text.secondary' }}
                >
                  <AccessTime 
                    fontSize="small" 
                    color="inherit"
                    sx={{ fontSize: { xs: 14, sm: 16 } }}
                  />
                  <StatLabel>평균 이동 시간</StatLabel>
                </Stack>
              </Box>
            </Grid>
            
            <Grid size={4} textAlign="center">
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  backgroundColor: '#f8f9ff', // 친구 카드와 동일한 배경색
                  border: '1px solid #e8eaf6', // 친구 카드와 동일한 테두리
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: 1,
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                <StatValue sx={{ color: 'primary.main' }}>
                  {averageTransferCount ? `${averageTransferCount}회` : '-'}
                </StatValue>
                <Stack
                  direction="row"
                  spacing={0.5}
                  justifyContent="center"
                  sx={{ mt: 0.5, color: 'text.secondary' }}
                >
                  <DirectionsTransit 
                    fontSize="small" 
                    color="inherit"
                    sx={{ fontSize: { xs: 14, sm: 16 } }}
                  />
                  <StatLabel>평균 환승 횟수</StatLabel>
                </Stack>
              </Box>
            </Grid>
            
            <Grid size={4} textAlign="center">
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  backgroundColor: '#f8f9ff', // 친구 카드와 동일한 배경색
                  border: '1px solid #e8eaf6', // 친구 카드와 동일한 테두리
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: 1,
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                <StatValue sx={{ color: 'primary.main' }}>
                  <Box 
                    component="span" 
                    fontSize={{ xs: '1.25rem', sm: '1.75rem' }}
                  >
                    {satisfactionRate?.trim() ? satisfactionRate : '-'}
                  </Box>
                </StatValue>
                <Stack
                  direction="row"
                  spacing={0.5}
                  justifyContent="center"
                  sx={{ mt: 0.5, color: 'text.secondary' }}
                >
                  <SentimentSatisfiedAlt 
                    fontSize="small" 
                    color="inherit"
                    sx={{ fontSize: { xs: 14, sm: 16 } }}
                  />
                  <StatLabel>이동 만족도</StatLabel>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </BasicStyledCard>
  );
};

export default MeetPointCard;