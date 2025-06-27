// import { PushPin } from '@mui/icons-material';
import { Box, Typography, Stack } from '@mui/material';

interface FriendLegendProps {
  friends: {
    name: string;
    from: string; // 출발역
    color: string;
  }[];
}

const FriendMarkerLegend = ({ friends }: FriendLegendProps) => {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 1,
        width: 'fit-content',
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        📍 친구 위치
      </Typography>
      <Stack spacing={1}>
        {/* {friends.map(({ name, color }) => (
          <Box key={name} sx={{ display: 'flex', alignItems: 'center' }}>
            <PushPin sx={{ color, mr: 1 }} />
            <Typography variant="body2">{name}</Typography>
          </Box>
        ))} */}
        {friends.map(({ name, from, color }) => (
          <Box key={name} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: color,
                mr: 1,
              }}
            />
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
              {name} <span style={{ color: '#666' }}>({from})</span>
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default FriendMarkerLegend;
