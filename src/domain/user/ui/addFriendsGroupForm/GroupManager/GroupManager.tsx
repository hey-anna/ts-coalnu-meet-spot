import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { Box, Typography } from '@mui/material';

import type { SelsectedFriendsList } from '@/domain/user/models/user';

import { GroupManagerCreateGroup } from './GroupManagerCreateGroup';
import { GroupManagerFriendsList } from './GroupManagerFriendsList';
import { GroupManagerGroupList } from './GroupManagerGroupList';

// 데이터 지금 없어서 강제로 해놓음
const groups = ['토트넘', 'PSG', '전북 현대', '동호회', '게임 친구'];
const allFriendsList = [
  {
    name: '손흥민',
    group: '토트넘',
    station: { code: 'c1', name: '당산', line: '9호선' },
  },
  {
    name: '이강인',
    group: 'PSG',
    station: { code: 'c1', name: '강남', line: '9호선' },
  },
  {
    name: '전진우',
    group: '전북 현대',
    station: { code: 'c1', name: '용산', line: '1호선' },
  },
  {
    name: '황인범',
    group: '토트넘',
    station: { code: 'c1', name: '이태원', line: '6호선' },
  },
];

export const GroupManager = ({
  setSelectedFriendsList,
}: {
  setSelectedFriendsList: Dispatch<SetStateAction<SelsectedFriendsList>>;
}) => {
  const [createGroupName, setCreateGroupName] = useState<string | null>(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchName, setSearchName] = useState<string>('');

  const addGroup = () => {
    setCreateGroupName(null);
    setIsCreatingGroup(false);
    console.log(createGroupName);
  };

  const filteredFriends = useMemo(() => {
    return allFriendsList
      .filter((f) => (!selectedGroup ? true : f.group === selectedGroup))
      .filter((f) =>
        searchName.trim() === '' ? true : f.name.includes(searchName.trim()),
      );
  }, [selectedGroup, searchName]);

  useEffect(() => {
    if (!isCreatingGroup) setCreateGroupName(null);
  }, [isCreatingGroup]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 4,
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>
        <Typography
          variant="subtitle2"
          color="user.main"
          sx={{ fontWeight: 600 }}
        >
          친구 그룹
        </Typography>
      </Box>

      {isCreatingGroup ? (
        <GroupManagerCreateGroup
          setCreateGroupName={setCreateGroupName}
          addGroup={addGroup}
        />
      ) : null}

      <GroupManagerGroupList
        groups={groups}
        isCreatingGroup={isCreatingGroup}
        setIsCreatingGroup={setIsCreatingGroup}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />

      <GroupManagerFriendsList
        filteredFriends={filteredFriends}
        setSearchName={setSearchName}
        searchName={searchName}
        setSelectedFriendsList={setSelectedFriendsList}
      />
    </Box>
  );
};
