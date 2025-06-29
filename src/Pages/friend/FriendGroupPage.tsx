import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {
  getLineColor,
  STATION_CONFIG,
} from '../../shared/config/stationConfig';
import type { StationData } from '../../shared/models/station';

import { FriendDialog } from '../../domain/user/ui/FriendManageMent/Dialog/FriendDialog';
import { GroupDialog } from '../../domain/user/ui/FriendManageMent/Dialog/GroupDialog';
import theme from '@/styles/mui/theme';
import { FriendList } from '../../domain/user/ui/FriendManageMent/Content/FriendList';
import { GroupList } from '../../domain/user/ui/FriendManageMent/Content/GroupList';
import { useUserStore } from '@/domain/user/store/userStore';
import useGetUserFriendByGroup from '@/domain/user/hooks/useGetUserFriendByGroup';

import {
  allFriendResponsePort,
  friendGroupResponsePort,
} from '@/domain/user/port/friendDataPort';
import useGetUserFriendList from '@/domain/user/hooks/useGetUserFriendList';
import useAddNewFriend from '@/domain/user/hooks/useAddNewFriend';
import useDeleteFriend from '@/domain/user/hooks/useDeleteFriend';
import useDeleteGroup from '@/domain/user/hooks/useDeleteGroup';
import useDeleteFriendFromGroup from '@/domain/user/hooks/useDeleteFriendFromGroup';
import useAddFriendListToGroup from '@/domain/user/hooks/useAddFriendListToGroup';
import useAddNewGroup from '@/domain/user/hooks/useAddNewGroup';
import useUpdateGroupInfo from '@/domain/user/hooks/useUpdateGroupInfo';
import { FriendHeader } from '@/domain/user/ui/FriendManageMent/FriendHeader';
import type { ErrorMsg } from '@/domain/user/models/model';

// 타입 정의
interface Friend {
  id: number;
  name: string;
  station: string;
  avatar?: string;
}

interface FriendGroup {
  id: number;
  name: string;
  members: Friend[];
  color: string;
}

const FriendGroupManagement: React.FC = () => {
  const { user } = useUserStore();
  const { data: friendGroupResponse } = useGetUserFriendByGroup(user?.id);
  const { data: friendResponse } = useGetUserFriendList(user);

  // friendGroupResponse 가 바뀔 때만 port 연산
  const friendGroups = useMemo(
    () => friendGroupResponsePort(friendGroupResponse ?? []),
    [friendGroupResponse],
  );

  // friendResponse 가 바뀔 때만 port 연산
  const allFriends = useMemo(
    () => allFriendResponsePort(friendResponse ?? []),
    [friendResponse],
  );

  const { mutate: addNewFriend, error: addNewFriendError } = useAddNewFriend();
  const { mutate: deleteFriend } = useDeleteFriend();
  const { mutate: deleteGroup } = useDeleteGroup();
  const { mutate: deleteFriendFromGroup } = useDeleteFriendFromGroup();
  const { mutate: friendListAddToGroup } = useAddFriendListToGroup();
  const { mutate: addNewGroup, error: addNewGroupError } = useAddNewGroup();
  const { mutate: updateGroupInfoHook, error: updateGroupInfoError } =
    useUpdateGroupInfo();

  // 다이얼로그 상태
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [friendDialogOpen, setFriendDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<FriendGroup | null>(null);

  // 그룹 편집 상태
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedFriendsForGroup, setSelectedFriendsForGroup] = useState<
    number[]
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
      updateGroupInfoHook({
        group_id: editingGroup.id,
        group_name: groupForm.name,
        group_color: groupForm.color,
      });
    } else {
      addNewGroup({
        user_id: user?.id,
        group_name: groupForm.name,
        group_color: groupForm.color,
      });
    }

    setGroupDialogOpen(false);
    setTimeout(() => {
      setEditingGroup(null);
    }, 1000);

    setGroupForm({ name: '', color: theme.palette.primary.main });
  };

  // 그룹 삭제
  const handleDeleteGroup = (groupId: number) => {
    deleteGroup(groupId);
  };

  // 친구 추가
  const handleAddFriend = () => {
    if (!friendForm.name.trim() || !selectedStation) return;
    addNewFriend({
      user_id: user.id,
      name: friendForm.name,
      start_station: selectedStation.station_nm,
      friend_group_id: null,
    });
    setFriendDialogOpen(false);
    setFriendForm({ name: '', station: '' });
    setSelectedStation(null);
    setInputValue(''); // 입력값 초기화
    setSearchResults([]);
  };

  // 그룹에 친구 추가
  const handleAddFriendToGroup = (groupId: number, friendId: number) => {
    const friend = allFriends.find((f) => f.id === friendId);
    if (!friend) return;

    friendListAddToGroup({
      group_id: groupId,
      friend_id_list: [friendId],
    });
  };

  // 선택된 친구들을 그룹에 추가
  const handleAddSelectedFriendsToGroup = (groupId: number) => {
    // 🔍 해당 그룹 찾기
    const targetGroup = friendGroups.find((group) => group.id === groupId);
    const existingMemberIds =
      targetGroup?.members.map((member) => member.id) ?? [];

    if (existingMemberIds.length + selectedFriendsForGroup.length >= 4) {
      alert('그룹에는 3명이상의 친구를 추가할 수 없습니다.');
      return;
    }

    selectedFriendsForGroup.forEach((friendId) => {
      if (!existingMemberIds.includes(friendId)) {
        handleAddFriendToGroup(groupId, friendId);
      }
    });

    setSelectedFriendsForGroup([]);
  };

  // 친구 선택/해제
  const handleToggleFriendSelection = (friendId: number) => {
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
  const handleRemoveFriendFromGroup = (groupId: number, friendId: number) => {
    deleteFriendFromGroup({ group_id: groupId, friend_id: friendId });
  };

  // 친구 삭제
  const handleDeleteFriend = (friendId: number) => {
    deleteFriend(friendId);
    // 친구 삭제 -> 그룹에 속한 친구도 트리거로 자동삭제
  };

  // 다이얼로그 닫을 때 검색 상태 초기화
  const handleCloseFriendDialog = () => {
    setFriendDialogOpen(false);
    setFriendForm({ name: '', station: '' });
    setSelectedStation(null);
    setInputValue('');
    setSearchResults([]);
  };

  useEffect(() => {
    const error = updateGroupInfoError as ErrorMsg;

    if (!error) {
      return;
    }

    if (error?.code == '23505') {
      alert('이미 있는 그룹명입니다.');
    } else {
      alert(error?.message);
    }
  }, [updateGroupInfoError]);

  useEffect(() => {
    const error = addNewGroupError as ErrorMsg;

    if (!error) {
      return;
    }

    if (error?.code == '23505') {
      alert('이미 있는 그룹명입니다.');
    } else {
      alert(error?.message);
    }
  }, [addNewGroupError]);

  useEffect(() => {
    const error = addNewFriendError as ErrorMsg;

    if (!error) {
      return;
    }

    if (error?.code == '23505') {
      alert('이미 있는 친구 정보입니다.');
    } else {
      alert(error?.message);
    }
  }, [addNewFriendError]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={pageContainerStyle}>
        {/* 헤더 */}
        <FriendHeader
          setGroupDialogOpen={setGroupDialogOpen}
          setFriendDialogOpen={setFriendDialogOpen}
        />

        <Box sx={gridContainerStyle}>
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

        <GroupDialog
          groupDialogOpen={groupDialogOpen}
          setGroupDialogOpen={setGroupDialogOpen}
          editingGroup={editingGroup}
          groupForm={groupForm}
          setGroupForm={setGroupForm}
          handleSaveGroup={handleSaveGroup}
          setEditingGroup={setEditingGroup}
        />

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

// 스타일 변수들
const pageContainerStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  backgroundColor: theme.palette.background.default,
  minHeight: '80vh',
};

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: 3,
};
