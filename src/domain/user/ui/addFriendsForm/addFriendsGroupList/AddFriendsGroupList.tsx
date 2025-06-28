import type { Group } from '@/domain/user/models/model';
import { Box, Button, Typography } from '@mui/material';

export interface AddFriendsGroupListProps {
  groups: Group[];
  setSelectedGroup: (group: Group) => void;
  selectedGroup?: Group;
}

export const AddFriendsGroupList: React.FC<AddFriendsGroupListProps> = ({
  groups,
  setSelectedGroup,
  selectedGroup,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 1,
      }}
    >
      <Typography
        variant="subtitle2"
        color="text.primary"
        sx={{ fontWeight: 600 }}
      >
        친구 그룹 목록
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 1.5,
        }}
      >
        {groups.map((group) => {
          const isSelected = selectedGroup?.id === group.id;
          return (
            <Button
              key={group.id}
              variant={isSelected ? 'contained' : 'outlined'}
              onClick={() => setSelectedGroup(group)}
              title={group.group_name} // 전체 텍스트를 툴팁으로 표시
              sx={{
                borderRadius: 20,
                height: 40,
                minWidth: 0, // 최소 너비 제한 해제
                // selected 시 색상
                backgroundColor: isSelected ? 'primary.main' : 'transparent',
                color: isSelected ? '#fff' : 'text.primary',
                borderColor: 'primary.main',
                // 텍스트 오버플로우 처리
                '& .MuiButton-startIcon': {
                  margin: 0,
                },
                '& .MuiButton-endIcon': {
                  margin: 0,
                },
                // 버튼 내부 텍스트 스타일
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                fontSize: {
                  xs: '0.8rem',    // 모바일에서 작은 글자
                  sm: '0.875rem',  // 데스크톱에서 기본 글자
                },
                fontWeight: 500,
                px: 2, // 좌우 패딩을 충분히 확보
                '&:hover': {
                  backgroundColor: isSelected
                    ? 'primary.dark'
                    : 'rgba(102, 126, 234, 0.1)',
                  borderColor: 'primary.main',
                  transform: 'translateY(-2px)',
                  boxShadow: isSelected
                    ? '0 6px 20px rgba(108, 92, 231, 0.35)'
                    : undefined,
                },
                // 아이폰 SE 대응
                '@media (max-width: 375px)': {
                  fontSize: '0.75rem',
                  px: 1.5,
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                  display: 'block',
                }}
              >
                {group.group_name}
              </Box>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};