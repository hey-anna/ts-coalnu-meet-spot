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
  useTheme,
  useMediaQuery,
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
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  return (
    <Card sx={getSectionCardStyle(isMobile)}>
      <Box sx={getSectionHeaderStyle(isMobile)}>
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          fontWeight={600}
          sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}
        >
          친구 그룹 ({friendGroups.length})
        </Typography>
      </Box>
      <Box sx={getContentPaddingStyle(isMobile)}>
        {friendGroups.map((group) => (
          <Accordion
            key={group.id}
            sx={getGroupCardStyle(isMobile)}
            expanded={expandedGroup === group.id}
            onChange={(event, isExpanded) =>
              handleGroupExpand(group.id, isExpanded)
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={getAccordionSummaryStyle(isMobile)}
            >
              <Box sx={getGroupHeaderStyle(isMobile)}>
                <Avatar sx={getAvatarStyle(group.color, isMobile)}>
                  <GroupIcon
                    sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}
                  />
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant={isMobile ? 'body1' : 'h6'}
                    fontWeight={600}
                    sx={{
                      fontSize: isMobile ? '1rem' : '1.25rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {group.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                  >
                    {group.members.length}명
                  </Typography>
                </Box>
              </Box>
              <Box sx={getActionButtonsStyle(isMobile)}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingGroup(group);
                    setGroupForm({
                      name: group.name,
                      color: group.color,
                    });
                    setGroupDialogOpen(true);
                  }}
                  sx={{
                    padding: isMobile ? '6px' : '8px',
                    minWidth: isMobile ? '36px' : '40px',
                    minHeight: isMobile ? '36px' : '40px',
                  }}
                >
                  <EditIcon sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }} />
                </div>
                <div
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGroup(group.id);
                  }}
                  sx={{
                    padding: isMobile ? '6px' : '8px',
                    minWidth: isMobile ? '36px' : '40px',
                    minHeight: isMobile ? '36px' : '40px',
                  }}
                >
                  <DeleteIcon
                    sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
                  />
                </div>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={getAccordionDetailsStyle(isMobile)}>
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    fontWeight: 600,
                  }}
                >
                  그룹 멤버:
                </Typography>
                <Box sx={getMemberChipsContainerStyle(isMobile)}>
                  {group.members.map((member) => (
                    <Chip
                      key={member.id}
                      icon={
                        <TrainIcon
                          sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                        />
                      }
                      label={`${member.name} (${member.station})`}
                      onDelete={() =>
                        handleRemoveFriendFromGroup(group.id, member.id)
                      }
                      size={isMobile ? 'small' : 'medium'}
                      sx={{
                        ...getMemberChipStyle(isMobile),
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
                  <Box sx={getSelectedFriendsActionsStyle(isMobile)}>
                    <Button
                      variant="contained"
                      size={isMobile ? 'small' : 'medium'}
                      onClick={() => handleAddSelectedFriendsToGroup(group.id)}
                      sx={{
                        mr: 1,
                        fontSize: isMobile ? '0.8rem' : '0.875rem',
                        padding: isMobile ? '6px 12px' : '8px 16px',
                        minHeight: isMobile ? '32px' : '36px',
                      }}
                      fullWidth={isMobile}
                    >
                      선택한 친구 추가 ({selectedFriendsForGroup.length}명)
                    </Button>
                    {!isMobile && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setSelectedFriendsForGroup([])}
                        sx={{
                          fontSize: '0.8rem',
                          padding: '6px 12px',
                          minHeight: '32px',
                        }}
                      >
                        선택 취소
                      </Button>
                    )}
                    {isMobile && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setSelectedFriendsForGroup([])}
                        sx={{
                          mt: 1,
                          fontSize: '0.8rem',
                          padding: '6px 12px',
                          minHeight: '32px',
                        }}
                        fullWidth
                      >
                        선택 취소
                      </Button>
                    )}
                  </Box>
                )}

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontStyle: 'italic',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    lineHeight: 1.4,
                    mt: 2,
                  }}
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

// Responsive style functions
const getSectionCardStyle = (isMobile) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: isMobile ? 1 : 2,
  boxShadow: isMobile
    ? '0 1px 8px rgba(0,0,0,0.06)'
    : '0 2px 12px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  margin: 0,
});

const getSectionHeaderStyle = (isMobile) => ({
  padding: isMobile ? 1.5 : 2,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const getContentPaddingStyle = (isMobile) => ({
  padding: isMobile ? 1 : 2,
});

const getGroupCardStyle = (isMobile) => ({
  marginBottom: isMobile ? 1 : 2,
  border: `1px solid ${theme.palette.custom.borderLight}`,
  borderRadius: isMobile ? 1 : 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: isMobile
      ? '0 2px 12px rgba(0,0,0,0.08)'
      : '0 4px 16px rgba(0,0,0,0.1)',
    transform: isMobile ? 'none' : 'translateY(-2px)',
    backgroundColor: theme.palette.custom.bgHover,
  },
});

const getAccordionSummaryStyle = (isMobile) => ({
  padding: isMobile ? '8px 12px' : '16px',
  minHeight: isMobile ? '56px !important' : '64px !important',
  '& .MuiAccordionSummary-content': {
    margin: isMobile ? '8px 0' : '12px 0',
    alignItems: 'center',
  },
});

const getGroupHeaderStyle = (isMobile) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
  gap: isMobile ? 1 : 2,
});

const getAvatarStyle = (color, isMobile) => ({
  backgroundColor: color,
  width: isMobile ? 36 : 40,
  height: isMobile ? 36 : 40,
  flexShrink: 0,
});

const getActionButtonsStyle = (isMobile) => ({
  display: 'flex',
  gap: isMobile ? 0.5 : 1,
  flexShrink: 0,
});

const getAccordionDetailsStyle = (isMobile) => ({
  padding: isMobile ? '8px 12px 12px' : '16px',
  paddingTop: 0,
});

const getMemberChipsContainerStyle = (isMobile) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: isMobile ? 0.5 : 1,
  mb: 2,
});

const getMemberChipStyle = (isMobile) => ({
  margin: 0,
  backgroundColor: theme.palette.custom.bgTertiary,
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.custom.borderLight}`,
  fontSize: isMobile ? '0.75rem' : '0.875rem',
  height: isMobile ? '28px' : '32px',
  '& .MuiChip-label': {
    padding: isMobile ? '0 8px' : '0 12px',
  },
  '& .MuiChip-deleteIcon': {
    fontSize: isMobile ? '16px' : '18px',
  },
  '&:hover': {
    backgroundColor: theme.palette.custom.bgHover,
  },
});

const getSelectedFriendsActionsStyle = (isMobile) => ({
  mb: 2,
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  gap: isMobile ? 0 : 1,
});
