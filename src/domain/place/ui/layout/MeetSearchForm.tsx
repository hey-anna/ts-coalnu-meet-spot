import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material';
import BasicStyledCard from '../common/styles/BasicStyledCard';
import type { StationSubwaySearchResult } from '../../models/stationSubwayPath.response';

interface MeetSearchFormProps {
  keyword: string;
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedStationName: string;
  onStationSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stationList: StationSubwaySearchResult[];
}

const MeetSearchForm = ({
  keyword,
  onKeywordChange,
  selectedStationName,
  onStationSelect,
  stationList,
}: MeetSearchFormProps) => {
  return (
    <BasicStyledCard sx={{ mt: 3 }}>
      <Box p={3}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, fontSize: '1.2rem', mb: 2 }}
        >
          도착할 지하철역을 선택해주세요
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="역 이름 검색"
            // type="search"
            placeholder="예: 종각, 강남"
            value={keyword}
            onChange={onKeywordChange}
            fullWidth
          />
          <TextField
            select
            label="도착역 선택"
            // value={selectedStationName || ''}
            value={
              stationList.find((s) => s.stationName === selectedStationName)
                ? selectedStationName
                : ''
            }
            onChange={onStationSelect}
            fullWidth
            // helperText={
            //   keyword && stationList.length === 0
            //     ? '검색 결과가 없습니다.'
            //     : ' '
            // }
          >
            {/* 검색 결과 없을 때 안내 메시지 표시 */}
            {stationList.length === 0 && keyword && (
              <MenuItem disabled>선택할 수 있는 역이 없습니다</MenuItem>
            )}

            {/* 검색 결과 있을 때만 실제 항목 렌더링 */}
            {stationList.map((s) => (
              <MenuItem key={s.stationID} value={s.stationName}>
                {s.stationName}
              </MenuItem>
            ))}
          </TextField>
          {/* {stationList.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              검색 결과가 없습니다.
            </Typography>
          )} */}
        </Stack>
      </Box>
    </BasicStyledCard>
  );
};

export default MeetSearchForm;
