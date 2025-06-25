import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ModalPortal from '../../../../shared/component/ModalPortal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { getSubwayInfoList } from '../../../../shared/lib/utils';
import type { SelsectedFriendsList, Station } from '../../models/user';
import { AddFriendsInput } from './addFriendsInput/AddFriendsInput';
import { AddFriendsGroupList } from './addFriendsGroupList/AddFriendsGroupList';

const groups = ['토트넘', 'PSG', '전북 현대', '동호회', '게임 친구'];

const AddFriendsForm = ({
  onClose,
  setSelectedFriendsList,
}: {
  onClose: () => void;
  setSelectedFriendsList: Dispatch<SetStateAction<SelsectedFriendsList>>;
}) => {
  const [name, setName] = useState<string>('');
  const [station, setStation] = useState<Station | null>(null);
  const subwayInfoList = useMemo(() => getSubwayInfoList(), []);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 그룹데이터는 훅으로 불러오기 groups 사용안하기

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
            minWidth: 300,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: 4,
              borderRadius: 2,
              minWidth: isMobile ? 150 : 300,
              maxWidth: 500,
              maxHeight: {
                sm: '80vh',
                md: 600,
              },
              overflowY: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flex: 1,
                justifyContent: 'flex-end',
                maxHeight: 10,
              }}
            >
              <IconButton
                onClick={onClose}
                sx={{
                  width: 32,
                  height: 32,
                  padding: 0,
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  color: 'grey.700',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'custom.bgHove',
                    color: 'primary.main',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" color="text.primary">
                친구 추가
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                친구의 위치와 정보를 입력해주세요.
              </Typography>
            </Box>

            <AddFriendsInput
              name={name}
              setName={setName}
              subwayInfoList={subwayInfoList}
              station={station}
              setStation={setStation}
            />

            <AddFriendsGroupList
              groups={groups}
              setSelectedGroup={setSelectedGroup}
              selectedGroup={selectedGroup}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                flex: 2,
                gap: 1,
              }}
            >
              <Button
                onClick={() => {
                  onClose();
                  setSelectedFriendsList((prev) => {
                    if (prev.length >= 4) return prev;
                    if (prev.some((friend) => friend.name === name))
                      return prev;
                    console.log({ name, station, group: selectedGroup });
                    return [...prev, { name, station, group: selectedGroup }];
                  });
                  console.log('친구 추가 훅');
                }}
                sx={{
                  backgroundImage:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  paddingX: 3,
                  paddingY: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundImage:
                      'linear-gradient(135deg, #5a63e0 0%, #6c3b92 100%)',
                  },
                  minWidth: '100%',
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
