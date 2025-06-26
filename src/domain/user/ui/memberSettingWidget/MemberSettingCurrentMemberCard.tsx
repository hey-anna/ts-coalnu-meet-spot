import { Box, Chip, styled, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { AddCurrentSearchFriendModal } from '../memberSettingGroupModal/AddCurrentSearchFriendModal';
import { useFriendStore } from '../../store/userStore';

const CurrentMemberCard = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%', // 부모 컨테이너 높이 가득 채우기
  background: '#ffffff',
  color: theme.palette.text.primary,
  border: '1px solid rgba(108, 92, 231, 0.35)',
  borderRadius: '12px',
  padding: '16px 12px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(108, 92, 231, 0.2)',
    '& .MuiTypography-root, & .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  },
}));

export const MemberSettingCurrentMemberCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const friendList = useFriendStore((s) => s.friendList);

  useEffect(() => {
    console.log(friendList);
  }, [friendList]);

  return (
    <>
      <CurrentMemberCard onClick={() => setIsModalOpen(true)}>
        {/* 컨텐츠를 박스에 묶어 전체 영역 차지 */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center',
            gap: 1,
            width: '100%',
          }}
        >
          {friendList.length > 0 ? (
            friendList.map((friend) => (
              <Chip
                key={friend.id ?? friend.name}
                label={friend.name}
                color="primary"
                variant="filled"
              />
            ))
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <AddIcon
                sx={{ fontSize: '1.8rem', mb: 0.5, transition: 'color 0.3s' }}
              />
              <Typography
                fontWeight={600}
                fontSize="0.95rem"
                sx={{ transition: 'color 0.3s' }}
              >
                오늘 만날 친구를 추가해주세요
              </Typography>
            </Box>
          )}
        </Box>

        {/* 모달은 카드 외부에서 조건부 렌더링 */}
        {isModalOpen && (
          <AddCurrentSearchFriendModal onClose={() => setIsModalOpen(false)} />
        )}
      </CurrentMemberCard>
    </>
  );
};
