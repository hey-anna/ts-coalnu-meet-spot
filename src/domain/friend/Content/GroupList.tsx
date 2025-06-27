import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Group as GroupIcon,
  ExpandMore as ExpandMoreIcon,
  Train as TrainIcon,
} from '@mui/icons-material';
import theme from '@/styles/mui/theme';
import { getLineColor, STATION_CONFIG } from '@/shared/config/stationConfig';
export const GroupList = ({
  friendGroups,
  expandedGroup,
  handleGroupExpand,
  setEditingGroup,
  setGroupForm,
  setGroupDialogOpen,
  handleDeleteGroup,
  handleRemoveFriendFromGroup,
  allFriends,
  selectedFriendsForGroup,
  handleAddSelectedFriendsToGroup,
  setSelectedFriendsForGroup,
}) => {
  return (
    <Card sx={sectionCardStyle}>
      <Box sx={sectionHeaderStyle}>
        <Typography variant="h6" fontWeight={600}>
          친구 그룹 ({friendGroups.length})
        </Typography>
      </Box>
      <Box sx={{ padding: 2 }}>
        {friendGroups.map((group) => (
          <Accordion
            key={group.id}
            sx={groupCardStyle}
            expanded={expandedGroup === group.id}
            onChange={(event, isExpanded) =>
              handleGroupExpand(group.id, isExpanded)
            }
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Avatar sx={{ backgroundColor: group.color, mr: 2 }}>
                  <GroupIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {group.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {group.members.length}명
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingGroup(group);
                    setGroupForm({
                      name: group.name,
                      color: group.color,
                    });
                    setGroupDialogOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGroup(group.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  그룹 멤버:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 2,
                  }}
                >
                  {group.members.map((member) => (
                    <Chip
                      key={member.id}
                      icon={<TrainIcon />}
                      label={`${member.name} (${member.station})`}
                      onDelete={() =>
                        handleRemoveFriendFromGroup(group.id, member.id)
                      }
                      sx={{
                        ...memberChipStyle,
                        borderColor: getLineColor(
                          allFriends
                            .find((f) => f.id === member.id)
                            ?.station.includes('호선') ||
                            allFriends
                              .find((f) => f.id === member.id)
                              ?.station.includes('선')
                            ? STATION_CONFIG.DATA.find(
                                (s) => s.station_nm === member.station,
                              )?.line_num || ''
                            : '',
                        ),
                      }}
                    />
                  ))}
                </Box>

                {selectedFriendsForGroup.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleAddSelectedFriendsToGroup(group.id)}
                      sx={{ mr: 1 }}
                    >
                      선택한 친구 추가 ({selectedFriendsForGroup.length}
                      명)
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setSelectedFriendsForGroup([])}
                    >
                      선택 취소
                    </Button>
                  </Box>
                )}

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: 'italic' }}
                >
                  오른쪽 친구 목록에서 친구를 선택하여 그룹에 추가하세요
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
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

const groupCardStyle = {
  marginBottom: 2,
  border: `1px solid ${theme.palette.custom.borderLight}`,
  borderRadius: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    transform: 'translateY(-2px)',
    backgroundColor: theme.palette.custom.bgHover,
  },
};

const memberChipStyle = {
  margin: 0.5,
  backgroundColor: theme.palette.custom.bgTertiary,
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.custom.borderLight}`,
  '&:hover': {
    backgroundColor: theme.palette.custom.bgHover,
  },
};
