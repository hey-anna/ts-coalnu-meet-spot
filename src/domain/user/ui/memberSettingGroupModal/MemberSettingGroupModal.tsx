// MemberSettingGroupModal.tsx
import ModalPortal from '@/shared/component/ModalPortal';
import {
  Box,
  Stack,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import StationSearch from '../../../recommendation/ui/recommendStation/recommendStationSearch';
import { useUserStore } from '../../store/userStore';
import type { FriendInfo, GroupFriendsInfo, User } from '../../models/model';
import { getUserFriendList } from '../../apis/api';
import { MemberSettingGroupSelectedList } from './MemberSettingGroupSelectedList';
import type { StationData } from '@/shared/models/station';
import { GroupMembers } from './GroupMembers';
import { NoneGroupMembers } from './NoneGroupMembers';

const dummyGroupFriendInfos: GroupFriendsInfo[] = [
  {
    id: 1,
    group_name: '밥친구1',
    memberInfos: [
      {
        id: 1,
        name: '최우석',
        start_station: '당산',
      },
      {
        id: 2,
        name: '정예진',
        start_station: '용산',
      },
      {
        id: 3,
        name: '양시영',
        start_station: '강남',
      },
    ],
  },
  {
    id: 2,
    group_name: '밥친구2',
    memberInfos: [
      {
        id: 21,
        name: '최우석2',
        start_station: '당산',
      },
      {
        id: 22,
        name: '정예진2',
        start_station: '용산',
      },
      {
        id: 23,
        name: '양시영2',
        start_station: '강남',
      },
    ],
  },
  {
    id: 3,
    group_name: '밥친구3',
    memberInfos: [
      {
        id: 31,
        name: '최우석3',
        start_station: '당산',
      },
      {
        id: 32,
        name: '정예진3',
        start_station: '용산',
      },
      {
        id: 33,
        name: '양시영3',
        start_station: '강남',
      },
    ],
  },
  {
    id: 4,
    group_name: '밥친구4',
    memberInfos: [
      {
        id: 41,
        name: '최우석4',
        start_station: '당산',
      },
      {
        id: 42,
        name: '정예진4',
        start_station: '용산',
      },
      {
        id: 43,
        name: '양시영4',
        start_station: '강남',
      },
    ],
  },
  {
    id: 5,
    group_name: '밥친구5',
    memberInfos: [
      {
        id: 51,
        name: '최우석5',
        start_station: '당산',
      },
      {
        id: 52,
        name: '정예진5',
        start_station: '용산',
      },
    ],
  },
];

const noneGroupMemberInfos: FriendInfo[] = [
  {
    id: 61,
    name: '그룹 안속한 친구',
    start_station: '당산',
  },
  {
    id: 62,
    name: '그룹 안속한 친구2',
    start_station: '용산',
  },
  {
    id: 63,
    name: '그룹 안속한 친구3',
    start_station: '강남',
  },
];

export const MemberSettingGroupModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [groupName, setGroupName] = useState('');
  const [isShowNewFriendInput, setIsShowNewFriendInput] = useState(false);
  const [newFriendName, setNewFreindName] = useState('');
  const [selectedStations, setSelectedStations] = useState<string>();
  const [selectedFriends, setSelectedFriends] = useState<FriendInfo[]>([
    {
      id: 61,
      name: '그룹 안속한 친구',
      start_station: '당산',
    },
    {
      id: 62,
      name: '그룹 안속한 친구2',
      start_station: '용산',
    },
    {
      id: 63,
      name: '그룹 안속한 친구3',
      start_station: '강남',
    },
  ]);

  const { user } = useUserStore();
  // TODO: React Query hook으로 교체 권장
  // const { data: memberList } = useGetUserFriendList(user as User);

  const handleStationSelect = (stationName: string) => {
    setSelectedStations(stationName);
  };

  const handleRemoveFriend = (friendName: string, startPosition: string) => {
    setSelectedFriends((prev) =>
      prev.filter(
        (f) => !(f.name === friendName && f.start_station === startPosition),
      ),
    );
  };

  const handleClearAllFriends = () => {
    setSelectedFriends([]);
  };

  const handleAddSelectedFriend = () => {
    setSelectedFriends((prev) => {
      console.log(newFriendName, selectedStations);
      if (prev.length >= 3) {
        console.log('3명이상은 안돼');
        return prev;
      }

      const isExistFriend = prev.some(
        (p) => p.name === newFriendName && p.start_station === selectedStations,
      );

      if (!isExistFriend) {
        console.log('추가');
        return [
          ...prev,
          { name: newFriendName, start_station: selectedStations },
        ];
      }

      console.log('이미 있는 친구');
      return prev;
    });
  };

  const handleAddSelectedFriendByGroup = (group: GroupFriendsInfo) => {
    if (selectedFriends.length + group.memberInfos.length >= 4) {
      return;
    }

    setSelectedFriends((prev) => {
      const hasOverlap = group.memberInfos.some((m) =>
        prev.some(
          (f) => f.name === m.name && f.start_station === m.start_station,
        ),
      );

      // 겹치는 친구가 하나라도 있으면 추가하지 않고 그대로
      if (hasOverlap) {
        return prev;
      }

      // 겹치는 친구 없으면 멤버들을 모두 추가
      return [...prev, ...group.memberInfos];
    });
  };

  const handleAddSelectedFriendByNoneGroup = (friend: FriendInfo) => {
    if (selectedFriends.length >= 3) {
      console.log('많음');
      return;
    }

    setSelectedFriends((prev) => {
      const isExist = prev.some(
        (p) =>
          p.name === friend.name && p.start_station === friend.start_station,
      );

      if (isExist) {
        return prev;
      }

      return [
        ...prev,
        { name: friend.name, start_station: friend.start_station },
      ];
    });
  };

  const handleSaveGroup = () => {
    // 저장 로직 여기에
  };

  // useEffect(() => {
  //   setSelectedFriends();
  // }, []);

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
              flex: 1,
              borderRadius: 2,
              minWidth: isMobile ? 150 : 300,
              maxWidth: 500,
              minHeight: 500,
              maxHeight: { sm: '80vh', md: 600 },
              overflow: 'auto',
            }}
          >
            {/* Header */}
            <Box
              sx={{ borderBottom: '1px solid', borderColor: 'divider', p: 2 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={onClose} sx={{ p: 0 }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography variant="h5" color="primary.main" fontWeight={500}>
                그룹 추가
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                함께 약속에 참여할 친구 그룹을 추가할 수 있어요.
              </Typography>
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, p: 3 }}>
              <Stack spacing={2}>
                {/* 그룹 이름 */}
                <Box>
                  <Typography variant="subtitle2">그룹 이름</Typography>
                  <TextField
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="그룹 이름을 입력하세요"
                    fullWidth
                    sx={{ mt: 1 }}
                  />
                </Box>

                <GroupMembers
                  groupFriendInfos={dummyGroupFriendInfos}
                  handleAddSelectedFriendByGroup={
                    handleAddSelectedFriendByGroup
                  }
                />

                <NoneGroupMembers
                  noneGroupMemberInfos={noneGroupMemberInfos}
                  handleAddSelectedFriendByNoneGroup={
                    handleAddSelectedFriendByNoneGroup
                  }
                />

                {/* 새 친구 등록 토글 */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 12,
                    cursor: 'pointer',
                    color: 'primary.main',
                    '&:hover': { color: 'primary.secondary' },
                  }}
                  onClick={() => setIsShowNewFriendInput((prev) => !prev)}
                >
                  그룹에 새로운 친구 등록하기
                </Typography>

                {/* 새 친구 입력 + 검색 */}
                {isShowNewFriendInput && (
                  <Box
                    sx={{
                      width: '100%',
                      maxHeight: 300,
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        // position: 'sticky',
                        // top: 0,
                        // zIndex: 10,
                        // backgroundColor: 'background.paper',
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <TextField
                        placeholder="친구 이름을 입력하세요"
                        fullWidth
                        onChange={(e) => setNewFreindName(e.target.value)}
                      />
                      <Button
                        sx={{
                          height: '100%',
                          minHeight: 50,
                          width: '20%',
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
                        onClick={() => handleAddSelectedFriend()}
                      >
                        추가
                      </Button>
                    </Box>

                    <StationSearch
                      onStationSelect={handleStationSelect}
                      placeholder="친구의 위치를 추가해요"
                    />
                  </Box>
                )}

                {/* 선택된 친구 목록 */}
                <MemberSettingGroupSelectedList
                  selectedFriends={selectedFriends}
                  handleRemoveFriend={handleRemoveFriend}
                  handleClearAllFriends={handleClearAllFriends}
                />

                <Box>
                  <Button
                    onClick={handleSaveGroup}
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
                    설정하기
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </ModalPortal>
  );
};
