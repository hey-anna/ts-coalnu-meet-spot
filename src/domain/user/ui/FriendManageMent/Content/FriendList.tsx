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

export const FriendList = ({
  allFriends,
  expandedGroup,
  friendGroups,
  selectedFriendsForGroup,
  handleToggleFriendSelection,
  handleDeleteFriend,
}) => {
  return (
    <Card sx={sectionCardStyle}>
      <Box sx={sectionHeaderStyle}>
        <Typography variant="h6" fontWeight={600}>
          전체 친구 ({allFriends.length})
        </Typography>
      </Box>
      <List sx={{ padding: 2 }}>
        {allFriends.map((friend) => {
          const isInExpandedGroup =
            expandedGroup &&
            friendGroups
              .find((g) => g.id === expandedGroup)
              ?.members.some((m) => m.id === friend.id);
          const isSelected = selectedFriendsForGroup.includes(friend.id);
          const isDisabled = !expandedGroup || isInExpandedGroup;

          return (
            <ListItem
              key={friend.id}
              sx={{
                ...friendItemStyle,
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
                <Avatar
                  sx={{
                    backgroundColor: isSelected
                      ? theme.palette.primary.main
                      : theme.palette.primary.main,
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1">{friend.name}</Typography>
                    {isInExpandedGroup && (
                      <Chip
                        label="그룹 멤버"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', height: '20px' }}
                      />
                    )}
                    {isSelected && (
                      <Chip
                        label="선택됨"
                        size="small"
                        color="primary"
                        sx={{ fontSize: '0.7rem', height: '20px' }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <TrainIcon
                      fontSize="small"
                      sx={{
                        color: getLineColor(
                          STATION_CONFIG.DATA.find(
                            (s) => s.station_nm === friend.station,
                          )?.line_num || '',
                        ),
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: getLineColor(
                          STATION_CONFIG.DATA.find(
                            (s) => s.station_nm === friend.station,
                          )?.line_num || '',
                        ),
                      }}
                    >
                      {friend.station}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      (
                      {STATION_CONFIG.DATA.find(
                        (s) => s.station_nm === friend.station,
                      )?.line_num || '정보없음'}
                      )
                    </Typography>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFriend(friend.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

const sectionCardStyle = {
  backgroundColor: theme.palette.background.paper,
  borderRadius: 2,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  overflow: 'hidden',
};

const sectionHeaderStyle = {
  padding: 2,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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
