import theme from '@/styles/mui/theme';
import {
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Person as PersonIcon,
  Train as TrainIcon,
} from '@mui/icons-material';
import { getLineColor, STATION_CONFIG } from '@/shared/config/stationConfig';
import { styled } from '@mui/material/styles';

// Styled Components
const SectionCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  margin: 0,
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    borderRadius: theme.spacing(1.5),
    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    borderRadius: theme.spacing(1),
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1.2),
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  variant: 'h6',
  fontWeight: 600,
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '1rem',
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  padding: theme.spacing(2),
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(1),
  },
}));

const FriendListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.custom.bgTertiary,
  border: `1px solid ${theme.palette.custom.borderLight}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.custom.bgHover,
  },
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    borderRadius: theme.spacing(0.8),
    marginBottom: theme.spacing(0.8),
    minHeight: '60px', // 터치하기 쉬운 최소 높이
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    borderRadius: theme.spacing(0.6),
    marginBottom: theme.spacing(0.6),
    minHeight: '56px',
  },
}));

const FriendAvatar = styled(Avatar)(({ theme }) => ({
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    width: 32,
    height: 32,
  },
}));

const FriendName = styled(Typography)(({ theme }) => ({
  variant: 'body1',
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.85rem',
  },
}));

const ChipContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.8),
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    gap: theme.spacing(0.6),
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.7rem',
  height: '20px',
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.65rem',
    height: '18px',
    '& .MuiChip-label': {
      padding: '0 6px',
    },
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.6rem',
    height: '16px',
    '& .MuiChip-label': {
      padding: '0 5px',
    },
  },
}));

const StationInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.3),
  },
}));

const StationText = styled(Typography)(({ theme }) => ({
  variant: 'body2',
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.75rem',
  },
}));

const LineInfo = styled(Typography)(({ theme }) => ({
  variant: 'caption',
  color: theme.palette.text.secondary,
  
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    fontSize: '0.65rem',
  },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  // 모바일 최적화
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
    },
  },
  
  // 아이폰 SE 대응
  '@media (max-width: 375px)': {
    padding: theme.spacing(0.8),
    '& .MuiSvgIcon-root': {
      fontSize: '1.1rem',
    },
  },
}));

export const FriendList = ({
  allFriends,
  expandedGroup,
  friendGroups,
  selectedFriendsForGroup,
  handleToggleFriendSelection,
  handleDeleteFriend,
}) => {
  return (
    <SectionCard>
      <SectionHeader>
        <HeaderTitle>
          전체 친구 ({allFriends.length})
        </HeaderTitle>
      </SectionHeader>
      <StyledList>
        {allFriends.map((friend) => {
          const isInExpandedGroup =
            expandedGroup &&
            friendGroups
              .find((g) => g.id === expandedGroup)
              ?.members.some((m) => m.id === friend.id);
          const isSelected = selectedFriendsForGroup.includes(friend.id);
          const isDisabled = !expandedGroup || isInExpandedGroup;

          return (
            <FriendListItem
              key={friend.id}
              sx={{
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? 'default' : 'pointer',
                backgroundColor: isSelected
                  ? theme.palette.primary.light
                  : isDisabled
                    ? theme.palette.custom.bgTertiary
                    : theme.palette.custom.bgTertiary,
                '&:hover': {
                  backgroundColor: isDisabled
                    ? theme.palette.custom.bgTertiary
                    : isSelected
                      ? theme.palette.primary.light
                      : theme.palette.custom.bgHover,
                },
              }}
              onClick={() => {
                if (!isDisabled) {
                  handleToggleFriendSelection(friend.id);
                }
              }}
            >
              <ListItemAvatar>
                <FriendAvatar
                  sx={{
                    backgroundColor: isSelected
                      ? theme.palette.primary.main
                      : theme.palette.primary.main,
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                >
                  <PersonIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </FriendAvatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <ChipContainer>
                    <FriendName>{friend.name}</FriendName>
                    {isInExpandedGroup && (
                      <StatusChip
                        label="그룹 멤버"
                        size="small"
                        variant="outlined"
                      />
                    )}
                    {isSelected && (
                      <StatusChip
                        label="선택됨"
                        size="small"
                        color="primary"
                      />
                    )}
                  </ChipContainer>
                }
                secondary={
                  <StationInfo>
                    <TrainIcon
                      sx={{
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        color: getLineColor(
                          STATION_CONFIG.DATA.find(
                            (s) => s.station_nm === friend.station,
                          )?.line_num || '',
                        ),
                      }}
                    />
                    <StationText
                      sx={{
                        color: getLineColor(
                          STATION_CONFIG.DATA.find(
                            (s) => s.station_nm === friend.station,
                          )?.line_num || '',
                        ),
                      }}
                    >
                      {friend.station}
                    </StationText>
                    <LineInfo>
                      (
                      {STATION_CONFIG.DATA.find(
                        (s) => s.station_nm === friend.station,
                      )?.line_num || '정보없음'}
                      )
                    </LineInfo>
                  </StationInfo>
                }
              />
              <ListItemSecondaryAction>
                <DeleteButton
                  edge="end"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFriend(friend.id);
                  }}
                >
                  <DeleteIcon />
                </DeleteButton>
              </ListItemSecondaryAction>
            </FriendListItem>
          );
        })}
      </StyledList>
    </SectionCard>
  );
};