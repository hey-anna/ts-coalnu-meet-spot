import { Box, CardContent, Grid, Typography } from '@mui/material';
import { Room } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import BasicStyledCard from '../common/styles/BasicStyledCard';

interface MeetPointCardProps {
  selectedStationName: string;
  averageTime: number | null;
  transferCount?: number;
  satisfactionRate?: string;
}

const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: theme.typography.h6.fontSize,
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
}));

const MeetPointCard = ({
  selectedStationName,
  averageTime,
  transferCount, // 향후 동적 처리
  satisfactionRate, // 향후 동적 처리
}: MeetPointCardProps) => {
  return (
    <BasicStyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <IconWrapper>
            <Room
              sx={{
                fontSize: 32,
                // color: 'primary.main',
                color: '#fff',
                flexShrink: 0,
              }}
              color="primary"
            />
          </IconWrapper>
          <Box>
            <Typography
              // variant="h5"
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                lineHeight: 1.2,
              }}
              fontWeight={700}
            >
              {selectedStationName || '도착역 선택'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              모든 친구들의 중간 지점
            </Typography>
          </Box>
        </Box>
        {/* <Typography variant="h5" fontWeight={700}>
          {selectedStationName || '도착역 선택'}
        </Typography> */}
        <Grid container spacing={2} mt={1}>
          <Grid size={4}>
            <StatValue>
              {averageTime !== null ? `${averageTime}분` : '-'}
            </StatValue>
            <StatLabel>⏱ 평균 이동 시간</StatLabel>
          </Grid>
          <Grid size={4}>
            <StatValue>{transferCount ? `${transferCount}개` : '-'}</StatValue>
            <StatLabel>🚇 환승 노선</StatLabel>
          </Grid>
          <Grid size={4}>
            <StatValue>
              {satisfactionRate?.trim() ? satisfactionRate : '-'}
            </StatValue>
            <StatLabel>😊 만족도</StatLabel>
          </Grid>
        </Grid>
      </CardContent>
    </BasicStyledCard>
  );
};

export default MeetPointCard;
