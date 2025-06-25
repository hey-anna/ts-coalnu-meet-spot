import {
  Autocomplete,
  Box,
  InputBase,
  TextField,
  Typography,
} from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import type { Station, StationInfoList } from '../../../models/subway';

export const AddFriendsInput = ({
  name,
  setName,
  subwayInfoList,
  station,
  setStation,
}: {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  subwayInfoList: StationInfoList;
  station: Station | null;
  setStation: Dispatch<SetStateAction<Station | null>>;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          color="text.primary"
          sx={{ fontWeight: 600 }}
        >
          친구 이름
        </Typography>
        <InputBase
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="추가할 친구의 이름을 입력하세요"
          sx={{
            backgroundColor: '#f8f9fa',
            borderRadius: 2,
            px: 2,
            py: 2,
            border: '1px solid',
            borderColor: 'grey.300',
            fontSize: 14,
            '&::placeholder': {
              color: 'text.secondary',
            },
            '&:hover': {
              backgroundColor: 'grey.100',
            },
            maxHeight: 60,
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          color="text.primary"
          sx={{ fontWeight: 600 }}
        >
          위치 (지하철 역)
        </Typography>
        <Autocomplete
          options={subwayInfoList}
          noOptionsText="일치하는 지하철 역이 없어요"
          value={station}
          onChange={(_, newValue) => setStation(newValue)}
          getOptionLabel={(option) =>
            option?.name ? `${option.name} (${option.line})` : ''
          }
          filterOptions={(options, state) =>
            options.filter((option) =>
              option.name
                .toLowerCase()
                .includes(state.inputValue.toLowerCase()),
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="지하철 명을 입력하세요 (예: 홍대입구)"
              sx={{
                backgroundColor: '#f8f9fa',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  paddingX: 2,
                  paddingY: 1.5,
                  fontSize: 14,
                  borderRadius: 2,
                },
                '& input::placeholder': {
                  color: 'text.secondary',
                },
              }}
            />
          )}
        />
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontSize: '12px' }}
        >
          지하철 역명을 입력하면 자동 완성 됩니다.
        </Typography>
      </Box>
    </Box>
  );
};
