import type { Dispatch, SetStateAction } from 'react';
import type { SelsectedFriendsList } from '../../../models/user';
import { Box, Tooltip, Typography } from '@mui/material';

const columnStyles = [
  { flex: 1 }, // 이름
  { flex: 1 }, // 그룹
  { flex: 1 }, // 위치
  { flex: 1 }, // 삭제
];

const headers = ['이름', '그룹', '위치', '삭제'];

export const SelectedFriendsList = ({
  selectedFriendsList,
  setSelectedFriendsList,
}: {
  selectedFriendsList: SelsectedFriendsList;
  setSelectedFriendsList: Dispatch<SetStateAction<SelsectedFriendsList>>;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 2,
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', p: 1, backgroundColor: '#f5f5f5' }}>
        {headers.map((header, index) => (
          <Box
            key={header}
            sx={{
              ...columnStyles[index],
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              {header}
            </Typography>
          </Box>
        ))}
      </Box>

      {selectedFriendsList.map((row, rowIndex) => {
        const displayRow = {
          name: row.name.length > 5 ? row.name.slice(0, 5) + '...' : row.name,
          group:
            row.group && row.group?.length > 5
              ? row.name.slice(0, 5) + '...'
              : row.group,
          station:
            row.station && row.station?.name.length > 5
              ? row.station?.name.slice(0, 5) + '...'
              : row.station?.name,
        };

        return (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              p: 1,
              borderTop: '1px solid #eee',
              '&:hover': { backgroundColor: '#fafafa' },
            }}
          >
            <Box
              sx={{
                ...columnStyles[0],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Tooltip title={row.name} arrow>
                <Typography>{displayRow.name}</Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{
                ...columnStyles[1],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Tooltip title={row.group} arrow>
                <Typography>{displayRow.group}</Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{
                ...columnStyles[2],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Tooltip title={row.station?.name} arrow>
                <Typography>{displayRow.station}</Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{
                ...columnStyles[3],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                onClick={() => {
                  setSelectedFriendsList((prev) =>
                    prev.filter(
                      (item) =>
                        !(item.name === row.name && item.group === row.group),
                    ),
                  );
                }}
              >
                삭제
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
