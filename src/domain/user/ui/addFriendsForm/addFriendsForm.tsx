import { useState } from 'react';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Group } from '../../models/model';
import ModalPortal from '@/shared/component/ModalPortal';
import { AddFriendsGroupList } from './addFriendsGroupList/AddFriendsGroupList';
import StationSearch from '../../../recommendation/ui/recommendStation/recommendStationSearch';

const groups: Group[] = [
  { id: 1, user_id: 'cws3299', group_name: '밥친구1' },
  { id: 2, user_id: 'cws3299', group_name: '밥친구2' },
  { id: 3, user_id: 'cws3299', group_name: '밥친구3' },
  { id: 4, user_id: 'cws3299', group_name: '밥친구4' },
  { id: 5, user_id: 'cws3299', group_name: '밥친구5' },
];

const AddFriendsForm = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [selectedStation, setSelectedStation] = useState<string | undefined>();
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleStationSelect = (stationName: string) => {
    setSelectedStation(stationName);
  };

  const handleAddFriend = () => {
    console.log({ name, selectedStation, selectedGroup });
  };

  return (
    <ModalPortal>
      {({ overlayRef }) => (
        <Box
          ref={overlayRef}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1300,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              width: isMobile ? '90vw' : 500,
              height: { xs: '90vh', sm: '80vh', md: '700px' },
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                p: 2,
                flexShrink: 0,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={onClose} sx={{ p: 0 }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography variant="h5" color="primary.main" fontWeight={500}>
                친구 추가
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                함께할 친구를 추가할 수 있어요.
              </Typography>
            </Box>

            <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
              <Box
                sx={{
                  p: 2.5,
                  mt: 3,
                  borderRadius: 2,
                  border: '1px solid rgba(0,0,0,0.04)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <Typography variant="subtitle2">친구 정보 입력</Typography>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <TextFieldsIcon
                        sx={{ mr: 1.5, color: 'action.active' }}
                      />
                    ),
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="친구 이름을 입력하세요"
                  fullWidth
                  sx={{
                    mt: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '14px',
                      backgroundColor: '#f8f9fa',
                      '& fieldset': { border: '1px solid rgba(0,0,0,0.06)' },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.light,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                    },
                  }}
                />

                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    overflowY: 'auto',
                    mt: 1,
                    position: 'relative',
                    '&::-webkit-scrollbar': { display: 'none' },
                  }}
                >
                  {!selectedStation && (
                    <Typography
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'text.secondary',
                        pointerEvents: 'none',
                      }}
                    >
                      위치를 선택해주세요
                    </Typography>
                  )}

                  <StationSearch
                    onStationSelect={handleStationSelect}
                    placeholder="친구의 위치를 추가해요"
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  p: 2.5,
                  mt: 3,
                  borderRadius: 2,
                  border: '1px solid rgba(0,0,0,0.04)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <AddFriendsGroupList
                  groups={groups}
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                />
              </Box>

              <Button
                onClick={handleAddFriend}
                sx={{
                  mt: 2,
                  width: '100%',
                  backgroundImage:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundImage:
                      'linear-gradient(135deg, #5a63e0 0%, #6c3b92 100%)',
                  },
                }}
              >
                친구 추가
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </ModalPortal>
  );
};

export default AddFriendsForm;
