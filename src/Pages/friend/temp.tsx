import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Fab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Autocomplete,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  ExpandMore as ExpandMoreIcon,
  PersonAdd as PersonAddIcon,
  Train as TrainIcon,
} from '@mui/icons-material';
import { styled, ThemeProvider } from '@mui/material/styles';
import {
  getLineColor,
  STATION_CONFIG,
} from '../../shared/config/stationConfig';
import type { StationData } from '../../shared/models/station';

import { FriendDialog } from '../../domain/friend/Dialog/FriendDialog';
import { GroupDialog } from '../../domain/friend/Dialog/GroupDialog';
import theme from '@/styles/mui/theme';
import { FriendHeader } from '../../domain/friend/FriendHeader';
import { FriendList } from '../../domain/friend/Content/FriendList';
import { GroupList } from '../../domain/friend/Content/GroupList';
import { useUserStore } from '@/domain/user/store/userStore';
import useGetUserFriendByGroup from '@/domain/user/hooks/useGetUserFriendByGroup';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { redirect, useNavigate } from 'react-router';

// 타입 정의
interface Friend {
  id: string;
  name: string;
  station: string;
  avatar?: string;
}

interface FriendGroup {
  id: string;
  name: string;
  members: Friend[];
  color: string;
}

// 스타일 변수들
const pageContainerStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: 3,
  backgroundColor: theme.palette.background.default,
  minHeight: '80vh',
};

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: 3,
};

const fabStyle = {
  position: 'fixed',
  bottom: 24,
  right: 24,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.user.main,
  },
};

const friendItemStyle = {
  borderRadius: 1,
  marginBottom: 1,
  backgroundColor: theme.palette.custom.bgTertiary,
  border: `1px solid ${theme.palette.custom.borderLight}`,
  '&:hover': {
    backgroundColor: theme.palette.custom.bgHover,
  },
};

// 색상 선택 컴포넌트

// 메인 컴포넌트

interface Friend {
  id: string;
  name: string;
  station: string;
  avatar?: string;
}

interface FriendGroup {
  id: string;
  name: string;
  members: Friend[];
  color: string;
}

// const FreindGroupPage = () => {
//   return (
//     <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
//       <Suspense fallback={<div>loading...</div>}>
//         <FriendGroupManagement />
//       </Suspense>
//     </ErrorBoundary>
//   );
// };

// const FriendGroupManagement = () => {
//   const { user } = useUserStore();
//   console.info(user?.id);
//   const navigate = useNavigate();

//   if (!user?.id) navigate('/login');

//   useEffect(() => {
//     if (!user?.id) navigate('/login');
//   }, []);

//   console.log(user.id);

//   return <FriendGroupManageMent user={user} />;
// };

// const FriendGroupManageMent = (user) => {
//   const { data: friendGroups } = useGetUserFriendByGroup(user?.id);
//   console.info('데이터 찍히냐', friendGroups);

//   return <div>아아</div>;
// };

const FriendGroupManagement: React.FC = () => {
  const { user } = useUserStore();
  console.log(user);
  const {
    data: friendGroups,
    // error: friendGroupsError,
    // isLoading: friendGroupsLoader,
  } = useGetUserFriendByGroup(user?.id);

  console.log(friendGroups);

  return <div>dkdk</div>;

  const [friendGroups, setFriendGroups] = useState<FriendGroup[]>();

  [
    {
      id: '1',
      name: '대학 친구들',
      members: [
        { id: '1', name: '김철수', station: '홍대입구역' },
        { id: '2', name: '이영희', station: '강남역' },
      ],
      color: theme.palette.primary.main,
    },
    {
      id: '2',
      name: '직장 동료',
      members: [{ id: '3', name: '박민수', station: '신촌역' }],
      color: theme.palette.user.main,
    },
  ];

  const [allFriends, setAllFriends] = useState<Friend[]>([
    { id: '1', name: '김철수', station: '홍대입구역' },
    { id: '2', name: '이영희', station: '강남역' },
    { id: '3', name: '박민수', station: '신촌역' },
    { id: '4', name: '최지원', station: '명동역' },
  ]);

  // 다이얼로그 상태
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [friendDialogOpen, setFriendDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<FriendGroup | null>(null);

  // 그룹 편집 상태
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedFriendsForGroup, setSelectedFriendsForGroup] = useState<
    string[]
  >([]);

  // 폼 상태
  const [groupForm, setGroupForm] = useState({
    name: '',
    color: theme.palette.primary.main,
  });
  const [friendForm, setFriendForm] = useState({ name: '', station: '' });
  const [selectedStation, setSelectedStation] = useState<StationData | null>(
    null,
  );

  // 지하철역 검색 상태
  const [inputValue, setInputValue] = useState(''); // 입력 값을 별도로 관리
  const [searchResults, setSearchResults] = useState<StationData[]>([]);
  const maxResults = 50; // 결과 개수 제한

  // 검색 기능
  const handleStationSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // stationConfig의 DATA에서 검색
    const filtered = STATION_CONFIG.DATA.filter(
      (station: StationData) =>
        station.station_nm.includes(query) ||
        station.line_num.includes(query) ||
        station.fr_code.includes(query),
    ).slice(0, maxResults); // 결과 개수 제한

    setSearchResults(filtered);
  };

  // 그룹 생성/수정
  const handleSaveGroup = () => {
    if (!groupForm.name.trim()) return;

    if (editingGroup) {
      setFriendGroups((prev) =>
        prev.map((group) =>
          group.id === editingGroup.id ? { ...group, ...groupForm } : group,
        ),
      );
    } else {
      const newGroup: FriendGroup = {
        id: Date.now().toString(),
        ...groupForm,
        members: [],
      };
      setFriendGroups((prev) => [...prev, newGroup]);
    }

    setGroupDialogOpen(false);
    setEditingGroup(null);
    setGroupForm({ name: '', color: theme.palette.primary.main });
  };

  // 그룹 삭제
  const handleDeleteGroup = (groupId: string) => {
    setFriendGroups((prev) => prev.filter((group) => group.id !== groupId));
  };

  // 친구 추가
  const handleAddFriend = () => {
    if (!friendForm.name.trim() || !selectedStation) return;

    const newFriend: Friend = {
      id: Date.now().toString(),
      name: friendForm.name,
      station: selectedStation.station_nm,
    };

    setAllFriends((prev) => [...prev, newFriend]);
    setFriendDialogOpen(false);
    setFriendForm({ name: '', station: '' });
    setSelectedStation(null);
    setInputValue(''); // 입력값 초기화
    setSearchResults([]);
  };

  // 그룹에 친구 추가
  const handleAddFriendToGroup = (groupId: string, friendId: string) => {
    const friend = allFriends.find((f) => f.id === friendId);
    if (!friend) return;

    setFriendGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              members: group.members.find((m) => m.id === friendId)
                ? group.members
                : [...group.members, friend],
            }
          : group,
      ),
    );
  };

  // 선택된 친구들을 그룹에 추가
  const handleAddSelectedFriendsToGroup = (groupId: string) => {
    selectedFriendsForGroup.forEach((friendId) => {
      handleAddFriendToGroup(groupId, friendId);
    });
    setSelectedFriendsForGroup([]);
  };

  // 친구 선택/해제
  const handleToggleFriendSelection = (friendId: string) => {
    setSelectedFriendsForGroup((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId],
    );
  };

  // 그룹 펼침/접힘 처리
  const handleGroupExpand = (groupId: string, isExpanded: boolean) => {
    if (isExpanded) {
      setExpandedGroup(groupId);
      setSelectedFriendsForGroup([]);
    } else {
      setExpandedGroup(null);
      setSelectedFriendsForGroup([]);
    }
  };

  // 그룹에서 친구 제거
  const handleRemoveFriendFromGroup = (groupId: string, friendId: string) => {
    setFriendGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              members: group.members.filter((m) => m.id !== friendId),
            }
          : group,
      ),
    );
  };

  // 친구 삭제
  const handleDeleteFriend = (friendId: string) => {
    setAllFriends((prev) => prev.filter((f) => f.id !== friendId));
    setFriendGroups((prev) =>
      prev.map((group) => ({
        ...group,
        members: group.members.filter((m) => m.id !== friendId),
      })),
    );
  };

  // 다이얼로그 닫을 때 검색 상태 초기화
  const handleCloseFriendDialog = () => {
    setFriendDialogOpen(false);
    setFriendForm({ name: '', station: '' });
    setSelectedStation(null);
    setInputValue('');
    setSearchResults([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={pageContainerStyle}>
        {/* 헤더 */}
        <FriendHeader
          setGroupDialogOpen={setGroupDialogOpen}
          setFriendDialogOpen={setFriendDialogOpen}
        />

        {/* 메인 콘텐츠 */}
        <Box sx={gridContainerStyle}>
          {/* 친구 그룹 섹션 */}
          <GroupList
            friendGroups={friendGroups}
            expandedGroup={expandedGroup}
            handleGroupExpand={handleGroupExpand}
            setEditingGroup={setEditingGroup}
            setGroupForm={setGroupForm}
            setGroupDialogOpen={setGroupDialogOpen}
            handleDeleteGroup={handleDeleteGroup}
            handleRemoveFriendFromGroup={handleRemoveFriendFromGroup}
            allFriends={allFriends}
            selectedFriendsForGroup={selectedFriendsForGroup}
            handleAddSelectedFriendsToGroup={handleAddSelectedFriendsToGroup}
            setSelectedFriendsForGroup={setSelectedFriendsForGroup}
          />

          {/* 전체 친구 목록 섹션 */}
          <FriendList
            allFriends={allFriends}
            expandedGroup={expandedGroup}
            friendGroups={friendGroups}
            selectedFriendsForGroup={selectedFriendsForGroup}
            handleToggleFriendSelection={handleToggleFriendSelection}
            handleDeleteFriend={handleDeleteFriend}
          />
        </Box>

        {/* 플로팅 액션 버튼 */}
        {/* <Fab sx={fabStyle} onClick={() => setFriendDialogOpen(true)}>
          <PersonAddIcon />
        </Fab> */}

        {/* 그룹 생성/수정 다이얼로그 */}
        <GroupDialog
          groupDialogOpen={groupDialogOpen}
          setGroupDialogOpen={setGroupDialogOpen}
          editingGroup={editingGroup}
          groupForm={groupForm}
          setGroupForm={setGroupForm}
          handleSaveGroup={handleSaveGroup}
        />

        {/* 친구 추가 다이얼로그 */}
        <FriendDialog
          friendDialogOpen={friendDialogOpen}
          handleCloseFriendDialog={handleCloseFriendDialog}
          friendForm={friendForm}
          setFriendForm={setFriendForm}
          searchResults={searchResults}
          selectedStation={selectedStation}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleStationSearch={handleStationSearch}
          setSelectedStation={setSelectedStation}
          getLineColor={getLineColor}
          handleAddFriend={handleAddFriend}
        />
      </Box>
    </ThemeProvider>
  );
};

export default FriendGroupManagement;
