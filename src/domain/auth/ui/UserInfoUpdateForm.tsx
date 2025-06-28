import ModalPortal from '@/shared/component/ModalPortal';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Train as TrainIcon } from '@mui/icons-material';

const UserInfoUpdateForm = ({
  isUserInfoUpdateModalOpen,
  handleCloseUserInfoDialog,
  userUpdateInfo,
  setUserUpdateInfo,
  searchResults,
  selectedStation,
  inputValue,
  setInputValue,
  handleStationSearch,
  setSelectedStation,
  getLineColor,
  handleUpdateUserInfo,
}) => {
  return (
    <Dialog
      open={isUserInfoUpdateModalOpen}
      onClose={handleCloseUserInfoDialog}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>내 정보 변경</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="이름"
          fullWidth
          variant="outlined"
          value={userUpdateInfo.name}
          onChange={(e) =>
            setUserUpdateInfo((prev) => ({ ...prev, name: e.target.value }))
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
        <Button onClick={handleCloseUserInfoDialog}>취소</Button>
        <Button onClick={handleUpdateUserInfo} variant="contained">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserInfoUpdateForm;
