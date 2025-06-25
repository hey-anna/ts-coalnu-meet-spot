import {
  Box,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { SelsectedFriendsList } from '../../../models/user';
import type { Dispatch, SetStateAction } from 'react';

const allColumnStyles = [
  { flex: 1, minWidth: 80 },
  { flex: 1, minWidth: 80 },
  { flex: 1, minWidth: 80 },
  { flex: 1, minWidth: 60 },
  { flex: 1, minWidth: 60 },
];

const allHeaders = ['이름', '그룹', '위치', '추가', '제거'];

export const GroupManagerFriendsList = ({
  filteredFriends,
  setSearchName,
  searchName,
  setSelectedFriendsList,
}: {
  filteredFriends: SelsectedFriendsList;
  setSearchName: Dispatch<SetStateAction<string>>;
  searchName: string;
  setSelectedFriendsList: Dispatch<SetStateAction<SelsectedFriendsList>>;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        border: '1px solid',
        borderColor: '#dddddd',
        borderRadius: 2,
        padding: 2,
        backgroundColor: '#ffffff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
        }}
      >
        <TextField
          placeholder="이름으로 검색"
          variant="outlined"
          size="small"
          fullWidth
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            borderRadius: 4,
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 2,
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: 2,
          minHeight: 240,
          maxHeight: 400,
          overflowY: 'auto',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', p: 1, backgroundColor: '#f5f5f5' }}>
          {allHeaders.map((header, index) => (
            <Box
              key={header}
              sx={{
                ...allColumnStyles[index],
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

        {filteredFriends.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 160,
            }}
          >
            <Typography color="text.secondary">
              검색 결과가 없습니다.
            </Typography>
          </Box>
        ) : (
          filteredFriends.map((row, rowIndex) => {
            const displayRow = {
              name:
                row.name.length > 5 ? row.name.slice(0, 5) + '...' : row.name,
              group:
                row.group && row.group.length > 5
                  ? row.group.slice(0, 5) + '...'
                  : row.group,
              station:
                row.station && row.station.name.length > 5
                  ? row.station.name.slice(0, 5) + '...'
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
                    ...allColumnStyles[0],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Tooltip title={row.name} arrow>
                    <Typography
                      noWrap
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minWidth: 60,
                        textAlign: 'center',
                      }}
                    >
                      {displayRow.name}
                    </Typography>
                  </Tooltip>
                </Box>

                <Box
                  sx={{
                    ...allColumnStyles[1],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Tooltip title={row.group} arrow>
                    <Typography
                      noWrap
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minWidth: 60,
                        textAlign: 'center',
                      }}
                    >
                      {displayRow.group}
                    </Typography>
                  </Tooltip>
                </Box>

                <Box
                  sx={{
                    ...allColumnStyles[2],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Tooltip title={row.station?.name} arrow>
                    <Typography
                      noWrap
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minWidth: 60,
                        textAlign: 'center',
                      }}
                    >
                      {displayRow.station}
                    </Typography>
                  </Tooltip>
                </Box>

                <Box
                  sx={{
                    ...allColumnStyles[3],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      minWidth: 40,
                      textAlign: 'center',
                    }}
                    onClick={() => {
                      setSelectedFriendsList((prev) => {
                        if (prev.length >= 4) return prev;
                        if (
                          prev.some(
                            (friend) =>
                              friend.name === row.name &&
                              friend.group === row.group,
                          )
                        ) {
                          console.log('이미 있음');
                          return prev;
                        }
                        return [...prev, row];
                      });
                    }}
                  >
                    추가
                  </Typography>
                </Box>

                <Box
                  sx={{
                    ...allColumnStyles[4],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      minWidth: 40,
                      textAlign: 'center',
                    }}
                    onClick={() => {
                      console.log('그룹에서 제거');
                    }}
                  >
                    제거
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};
