import { Box, CardContent, Grid, Stack, Typography } from '@mui/material';
import BasicStyledCard from '../common/styles/BasicStyledCard';
import { DirectionsTransit } from '@mui/icons-material';

interface MeetFriendsTimeCardProps {
  results: {
    name: string;
    time: number | null;
    transfers: number;
  }[];
}

const MeetFriendsTimeCard = ({ results }: MeetFriendsTimeCardProps) => {
  // Grid size 계산 함수
  const getGridSize = (resultsLength: number) => {
    return {
      // 모바일: 3명까지 한줄, 4명부터 두줄
      xs: resultsLength <= 3 ? 12 / Math.min(resultsLength, 3) : 6,
      // 웹: 4명까지 한줄
      sm: 12 / Math.min(resultsLength, 4)
    };
  };

  return (
    <BasicStyledCard>
      <CardContent sx={{ 
        p: { xs: 2, sm: 3 }, // 모바일에서 패딩 줄임
      }}>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ 
            fontWeight: 600, 
            fontSize: { xs: '1.1rem', sm: '1.2rem' }, // 모바일 최적화
            mb: { xs: 1.5, sm: 2 }
          }}
        >
          친구들 이동 시간
        </Typography>
        
        <Grid container spacing={{ xs: 1, sm: 2 }}> {/* 모바일에서 간격 줄임 */}
          {results.length === 0 ? (
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  py: { xs: 3, sm: 4 },
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                친구 이동 정보가 없습니다. 도착역을 선택해주세요.
              </Box>
            </Grid>
          ) : (
            results.map((res) => (
              <Grid key={res.name} size={getGridSize(results.length)}>
                <Box
                  sx={{
                    p: { xs: 1.5, sm: 2 }, // 모바일에서 패딩 줄임
                    borderRadius: 2,
                    backgroundColor: 'background.default',
                    boxShadow: 1,
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: 2,
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { 
                        xs: '1.1rem', // 모바일
                        sm: '1.3rem'  // 웹
                      },
                      color: res.time === null ? 'error.main' : 'primary.main',
                    }}
                  >
                    {res.time !== null ? `${res.time}분` : '정보 없음'}
                  </Typography>
                  
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mt: 0.5, color: 'text.secondary' }}
                  >
                    <DirectionsTransit sx={{ 
                      fontSize: { xs: 14, sm: 16 } // 모바일에서 아이콘 크기 줄임
                    }} /> 
                    <Typography variant="caption" sx={{
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }}>
                      이동역 : {res.transfers === 0 ? '0개' : `${res.transfers}개`}
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      mt: 0.5,
                      color: 'text.secondary',
                      fontSize: { xs: '0.875rem', sm: '1rem' }, // 모바일 최적화
                      fontWeight: 500
                    }}
                  >
                    {res.name}
                  </Typography>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </CardContent>
    </BasicStyledCard>
  );
};

export default MeetFriendsTimeCard;