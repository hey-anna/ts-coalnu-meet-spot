import React from 'react';
import {
  Box,
  Typography,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Friend, GetUserFriendByGroupResponse } from '../../models/model';

const GridContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '16px',
  padding: '16px 0',
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '12px',
    padding: '12px 0',
  },
  
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: '8px',
    padding: '8px 0',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    gap: '6px',
    padding: '6px 0',
  },
}));

const FriendCard = styled('div')<{ 
  selected?: boolean; 
  partiallySelected?: boolean; 
  groupColor?: string;
}>(({ selected, partiallySelected, groupColor, theme }) => ({
  padding: '16px',
  border: '2px solid',
  borderColor: selected 
    ? groupColor || '#1976d2' 
    : partiallySelected 
      ? '#ff9800' 
      : '#e0e0e0',
  borderRadius: '16px',
  cursor: 'pointer',
  backgroundColor: selected 
    ? `${groupColor}15` 
    : partiallySelected 
      ? '#fff3e0' 
      : '#ffffff',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: groupColor || '#1976d2',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
    borderRadius: '12px',
    borderWidth: '1.5px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: '10px',
    borderRadius: '10px',
  },
}));

const CardHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
  
  [theme.breakpoints.down('sm')]: {
    marginBottom: '8px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    marginBottom: '6px',
  },
}));

const GroupColorDot = styled('div')<{ color: string }>(({ color, theme }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: '8px',
  
  [theme.breakpoints.down('sm')]: {
    width: '10px',
    height: '10px',
    marginRight: '6px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    width: '8px',
    height: '8px',
    marginRight: '5px',
  },
}));

const FriendName = styled('div')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  flex: 1,
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '13px',
  },
}));

const FriendCount = styled('span')(({ theme }) => ({
  fontSize: '14px',
  color: '#666',
  fontWeight: 400,
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '11px',
  },
}));

const FriendPreview = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginBottom: '12px',
  
  [theme.breakpoints.down('sm')]: {
    gap: '4px',
    marginBottom: '8px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    gap: '3px',
    marginBottom: '6px',
  },
}));

const FriendTag = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 8px',
  backgroundColor: '#f5f5f5',
  borderRadius: '12px',
  fontSize: '12px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: '3px 6px',
    borderRadius: '8px',
    fontSize: '11px',
    gap: '3px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: '2px 5px',
    borderRadius: '6px',
    fontSize: '10px',
    gap: '2px',
  },
}));

const StationTag = styled('span')(({ theme }) => ({
  fontSize: '10px',
  color: '#888',
  backgroundColor: '#fff',
  padding: '2px 6px',
  borderRadius: '8px',
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '9px',
    padding: '1px 4px',
    borderRadius: '6px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '8px',
    padding: '1px 3px',
    borderRadius: '4px',
  },
}));

const MoreFriends = styled('div')(({ theme }) => ({
  fontSize: '12px',
  color: '#666',
  fontStyle: 'italic',
  padding: '4px 8px',
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '11px',
    padding: '3px 6px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '10px',
    padding: '2px 5px',
  },
}));

const SelectionStatus = styled('div')(({ theme }) => ({
  marginTop: '8px',
  
  [theme.breakpoints.down('sm')]: {
    marginTop: '6px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    marginTop: '4px',
  },
}));

const StatusBadge = styled('div')<{ status: 'full' | 'partial' | 'none' }>(({ status, theme }) => ({
  fontSize: '11px',
  padding: '4px 8px',
  borderRadius: '8px',
  textAlign: 'center',
  backgroundColor: status === 'full' 
    ? '#e8f5e8' 
    : status === 'partial' 
      ? '#fff3e0' 
      : '#f5f5f5',
  color: status === 'full' 
    ? '#2e7d32' 
    : status === 'partial' 
      ? '#f57c00' 
      : '#666',
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    padding: '3px 6px',
    borderRadius: '6px',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '9px',
    padding: '2px 5px',
    borderRadius: '5px',
  },
}));

// Props 인터페이스
interface FriendCardProps {
  friendGroups: GetUserFriendByGroupResponse[];
  selectedFriends: Friend[];
  onFriendSelect: (friend: Friend) => void;
  onGroupSelect: (friends: Friend[]) => void;
}

const todayFriendCard: React.FC<FriendCardProps> = ({
  friendGroups,
  selectedFriends,
  onFriendSelect, 
  onGroupSelect
}) => {
  // FriendWithGroup 데이터를 그룹별로 정리하는 함수
  const isGroupFullySelected = (group: GetUserFriendByGroupResponse) => {
    return group.friend_link_group.every(linkGroup => 
      selectedFriends.some(selected => selected.id === linkGroup.friend.id)
    );
  };

  // 그룹의 일부 친구가 선택되었는지 확인하는 함수
  const isGroupPartiallySelected = (group: GetUserFriendByGroupResponse) => {
    const hasSelected = group.friend_link_group.some(linkGroup => 
      selectedFriends.some(selected => selected.id === linkGroup.friend.id)
    );
    return hasSelected && !isGroupFullySelected(group);
  };

  // 그룹 클릭 시 처리 함수
  const handleGroupClick = (group: GetUserFriendByGroupResponse) => {
    const isFullySelected = isGroupFullySelected(group);
    
    if (isFullySelected) {
      // 그룹의 모든 친구 제거
      const friendsToRemove = group.friend_link_group.map(linkGroup => linkGroup.friend.id);
      const newSelectedFriends = selectedFriends.filter(
        friend => !friendsToRemove.includes(friend.id)
      );
      
      // 부모의 onFriendsChange에 전체 배열 전달
      if (onGroupSelect) { // 새로운 prop 필요
        onGroupSelect(newSelectedFriends);
      }
    } else {
      // 그룹의 모든 친구 추가
      const friendsToAdd = group.friend_link_group
        .map(linkGroup => ({
          ...linkGroup.friend,
          user_id: '' // Friend 타입에 맞게 변환
        }))
        .filter(friend => !selectedFriends.some(selected => selected.id === friend.id));
      
      const newSelectedFriends = [...selectedFriends, ...friendsToAdd];
      
      if (onGroupSelect) {
        onGroupSelect(newSelectedFriends);
      }
    }
  };

  return (
    <GridContainer>
      {friendGroups.map((group) => {  // organizeByGroups() 제거하고 직접 friendGroups 사용
        const isFullySelected = isGroupFullySelected(group);
        const isPartiallySelected = isGroupPartiallySelected(group);
        const selectedCount = selectedFriends.filter(selected => 
          group.friend_link_group.some(linkGroup => linkGroup.friend.id === selected.id)  // 수정
        ).length;
        
        return (
          <FriendCard 
            key={group.id}  // group.group_id → group.id
            selected={isFullySelected}
            partiallySelected={isPartiallySelected}
            groupColor={group.group_color}
            onClick={() => handleGroupClick(group)}
          >
            <CardHeader>
              <GroupColorDot color={group.group_color} />
              <FriendName>{group.group_name}</FriendName>
              <FriendCount>({group.friend_link_group.length}명)</FriendCount>  {/* 수정 */}
            </CardHeader>
            
            {/* 그룹 내 친구들 미리보기 */}
            <FriendPreview>
              {group.friend_link_group.slice(0, 3).map(linkGroup => (  // 수정
                <FriendTag key={linkGroup.friend.id}>
                  {linkGroup.friend.name}
                  <StationTag>{linkGroup.friend.start_station}</StationTag>
                </FriendTag>
              ))}
              {group.friend_link_group.length > 3 && (  // 수정
                <MoreFriends>+{group.friend_link_group.length - 3}명 더</MoreFriends>
              )}
            </FriendPreview>
            
            {/* 선택 상태 표시 */}
            <SelectionStatus>
              {isFullySelected && (
                <StatusBadge status="full">✅ 모든 친구 선택됨</StatusBadge>
              )}
              {isPartiallySelected && (
                <StatusBadge status="partial">
                  ⚪ {selectedCount}/{group.friend_link_group.length} 선택됨  {/* 수정 */}
                </StatusBadge>
              )}
              {!isFullySelected && !isPartiallySelected && (
                <StatusBadge status="none">⭕ 선택 안됨</StatusBadge>
              )}
            </SelectionStatus>
          </FriendCard>
        );
      })}
    </GridContainer>
  );
};

export default todayFriendCard;