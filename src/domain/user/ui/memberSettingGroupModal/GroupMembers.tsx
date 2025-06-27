import { Box, Chip, styled, Typography } from '@mui/material';
import type { FriendInfo, GroupFriendsInfo } from '../../models/model';

const GroupCard = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid primary.main`,
  borderRadius: '12px',
  padding: '16px 12px',
  textAlign: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  boxShadow: `0 4px 16px rgba(108, 92, 231, 0.25)`,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 20px rgba(108, 92, 231, 0.35)`,
  },
  // 모바일에서 더 작은 패딩
  [theme.breakpoints.down('sm')]: {
    padding: '12px 8px',
  },
}));

const GroupName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.1rem',
  marginBottom: theme.spacing(1.2),
  lineHeight: 1.3,
  // 모바일에서 더 작은 폰트
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.95rem',
    marginBottom: theme.spacing(1),
  },
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.8),
  justifyContent: 'center',
  flexWrap: 'wrap',
  // 모바일에서 더 작은 간격
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.5),
  },
}));

const StationTag = styled(Chip)(({ theme }) => ({
  fontSize: '0.7rem',
  height: 20,
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  color: 'white',
  border: 'none',
  '& .MuiChip-label': {
    padding: '0 6px',
    fontWeight: 500,
  },
  // 모바일에서 더 작은 태그
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
    height: 18,
    '& .MuiChip-label': {
      padding: '0 5px',
    },
  },
}));

export const GroupMembers = ({
  groupFriendInfos,
  handleAddSelectedFriendByGroup,
}: {
  handleAddSelectedFriendByGroup: (friendInfo: GroupFriendsInfo) => void;
  groupFriendInfos: GroupFriendsInfo[];
}) => {
  return (
    <Box
      sx={{
        p: 2.5,
        marginTop: 3,
        padding: 2.5,
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.04)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mb: 2, fontSize: '1.1rem' }}
      >
        내 그룹 목록
      </Typography>
      {groupFriendInfos.length > 0 ? (
        <GroupCardGrid
          groupFriendInfos={groupFriendInfos}
          handleAddSelectedFriendByGroup={handleAddSelectedFriendByGroup}
        />
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            그룹 데이터를 불러오는 중입니다...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const GroupCardGrid = ({
  groupFriendInfos,
  handleAddSelectedFriendByGroup,
}: {
  handleAddSelectedFriendByGroup: (friendInfo: GroupFriendsInfo) => void;
  groupFriendInfos: GroupFriendsInfo[];
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        },
        gap: 1.5,
        padding: 0,
      }}
    >
      {groupFriendInfos.map((group, index) => (
        <GroupCard
          key={`group.group_name-${index}`}
          onClick={() => handleAddSelectedFriendByGroup(group)}
        >
          <GroupName>{group.group_name}</GroupName>
          <TagsContainer>
            {group.memberInfos.map((member) => (
              <StationTag key={member.name} label={member.name} size="small" />
            ))}
          </TagsContainer>
        </GroupCard>
      ))}
    </Box>
  );
};
