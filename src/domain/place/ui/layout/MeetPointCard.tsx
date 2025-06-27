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
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  // fontSize: theme.typography.h6.fontSize,
  fontSize: theme.typography.h5.fontSize,
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
  averageTransferCount,
  satisfactionRate,
}: MeetPointCardProps) => {
  return (
    <BasicStyledCard>
      <Box position="relative">
        <CardContent sx={{ p: 3 }}>
          <Box position="absolute" top={16} right={16} zIndex={1}>
            <SatisfactionTooltip />
          </Box>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
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
            <Grid size={4} textAlign="center">
              <StatValue>
                {averageTime !== null ? `${averageTime}분` : '-'}
              </StatValue>
              <Stack
                direction="row"
                spacing={0.5}
                justifyContent="center"
                sx={{ mt: 0.5, color: 'text.secondary' }}
              >
                <AccessTime fontSize="small" color="inherit" />
                <StatLabel>평균 이동 시간</StatLabel>
              </Stack>
            </Grid>
            <Grid size={4} textAlign="center">
              <StatValue>
                {averageTransferCount ? `${averageTransferCount}회` : '-'}
              </StatValue>
              <Stack
                direction="row"
                spacing={0.5}
                justifyContent="center"
                sx={{ mt: 0.5, color: 'text.secondary' }}
              >
                <DirectionsTransit fontSize="small" color="inherit" />
                <StatLabel>평균 환승 횟수</StatLabel>
              </Stack>
            </Grid>
            <Grid size={4} textAlign="center">
              <StatValue>
                <Box component="span" fontSize="1.75rem">
                  {satisfactionRate?.trim() ? satisfactionRate : '-'}
                </Box>
              </StatValue>
              <Stack
                direction="row"
                spacing={0.5}
                justifyContent="center"
                sx={{ mt: 0.5, color: 'text.secondary' }}
              >
                <SentimentSatisfiedAlt fontSize="small" color="inherit" />
                <StatLabel>이동 만족도</StatLabel>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </BasicStyledCard>
  );
};

export default MeetPointCard;
