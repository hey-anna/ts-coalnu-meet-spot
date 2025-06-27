import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { Train as TrainIcon } from '@mui/icons-material';

export const FriendDialog = ({
  friendDialogOpen,
  handleCloseFriendDialog,
  friendForm,
  setFriendForm,
  searchResults,
  selectedStation,
  inputValue,
  setInputValue,
  handleStationSearch,
  setSelectedStation,
  getLineColor,
  handleAddFriend,
}) => {
  return (
    <Dialog
      open={friendDialogOpen}
      onClose={handleCloseFriendDialog}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>새 친구 추가</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="친구 이름"
          fullWidth
          variant="outlined"
          value={friendForm.name}
          onChange={(e) =>
            setFriendForm((prev) => ({ ...prev, name: e.target.value }))
          }
          sx={{ mb: 2 }}
        />
        <Autocomplete
          options={searchResults}
          getOptionLabel={(option) => option?.station_nm || ''}
          value={selectedStation}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            handleStationSearch(newInputValue);
          }}
          onChange={(event, newValue) => {
            setSelectedStation(newValue);
          }}
          isOptionEqualToValue={(option, value) =>
            option.fr_code === value.fr_code
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="출발역 검색"
              placeholder="지하철역을 검색하세요"
              variant="outlined"
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.fr_code}>
              <TrainIcon
                sx={{
                  mr: 1,
                  color: getLineColor(option.line_num),
                }}
              />
              <Box>
                <Typography variant="body2">{option.station_nm}</Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: getLineColor(option.line_num),
                    fontWeight: 600,
                  }}
                >
                  {option.line_num}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {' | '}
                  {option.fr_code}
                </Typography>
              </Box>
            </Box>
          )}
          noOptionsText={
            inputValue.trim() === ''
              ? '지하철역 이름을 입력해주세요'
              : '검색 결과가 없습니다'
          }
          loadingText="검색 중..."
          freeSolo={false}
          clearOnBlur={false}
          selectOnFocus={true}
          filterOptions={(x) => x}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseFriendDialog}>취소</Button>
        <Button onClick={handleAddFriend} variant="contained">
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};
