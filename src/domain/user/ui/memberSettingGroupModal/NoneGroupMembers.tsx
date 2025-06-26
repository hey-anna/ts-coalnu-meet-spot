import { Box, styled, Typography } from '@mui/material';
import type { FriendInfo } from '../../models/model';

const NoneGroupMemberCard = styled(Box)(({ theme }) => ({
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

export const NoneGroupMembers = ({
  noneGroupMemberInfos,
  handleAddSelectedFriendByNoneGroup,
}: {
  noneGroupMemberInfos: FriendInfo[];
  handleAddSelectedFriendByNoneGroup: (friendInfo: FriendInfo) => void;
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
        일반 친구 목록
      </Typography>
      {NoneGroupMembers.length > 0 ? (
        <NoneGroupMember
          noneGroupMemberInfos={noneGroupMemberInfos}
          handleAddSelectedFriendByNoneGroup={
            handleAddSelectedFriendByNoneGroup
          }
        />
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            친구 데이터를 불러오는 중입니다...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const NoneGroupMember = ({
  noneGroupMemberInfos,
  handleAddSelectedFriendByNoneGroup,
}: {
  noneGroupMemberInfos: FriendInfo[];
  handleAddSelectedFriendByNoneGroup: (friendInfo: FriendInfo) => void;
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
      {noneGroupMemberInfos.map((member, index) => (
        <NoneGroupMemberCard
          key={index}
          onClick={() => handleAddSelectedFriendByNoneGroup(member)}
        >
          <Typography>{member.name}</Typography>
        </NoneGroupMemberCard>
      ))}
    </Box>
  );
};
