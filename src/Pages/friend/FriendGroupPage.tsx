import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Fab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Autocomplete,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  ExpandMore as ExpandMoreIcon,
  PersonAdd as PersonAddIcon,
  Train as TrainIcon,
} from '@mui/icons-material';
import { styled, ThemeProvider } from '@mui/material/styles';
import {
  getLineColor,
  STATION_CONFIG,
} from '../../shared/config/stationConfig';
import type { StationData } from '../../shared/models/station';
import theme from '../../styles/mui/theme';
import { colorPalette } from '@/shared/config/config';

// 타입 정의
interface Friend {
  id: string;
  name: string;
  station: string;
  avatar?: string;
}

interface FriendGroup {
  id: string;
  name: string;
  members: Friend[];
  color: string;
}

// 스타일 변수들
const pageContainerStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: 3,
  backgroundColor: theme.palette.background.default,
  minHeight: '80vh',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4,
  padding: 3,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 2,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: 3,
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

const fabStyle = {
  position: 'fixed',
  bottom: 24,
  right: 24,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.user.main,
  },
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

// 색상 선택 컴포넌트
const ColorPicker = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const ColorOption = styled(Box)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    width: 40,
    height: 40,
    borderRadius: '50%',
    cursor: 'pointer',
    border: selected
      ? `3px solid ${theme.palette.text.primary}`
      : `2px solid ${theme.palette.custom.borderLight}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
  }),
);

// 메인 컴포넌트
const FriendGroupManagement: React.FC = () => {
  const [friendGroups, setFriendGroups] = useState<FriendGroup[]>([
    {
      id: '1',
      name: '대학 친구들',
      members: [
        { id: '1', name: '김철수', station: '홍대입구역' },
        { id: '2', name: '이영희', station: '강남역' },
      ],
      color: theme.palette.primary.main,
    },
    {
      id: '2',
      name: '직장 동료',
      members: [{ id: '3', name: '박민수', station: '신촌역' }],
      color: theme.palette.user.main,
    },
  ]);

  const [allFriends, setAllFriends] = useState<Friend[]>([
    { id: '1', name: '김철수', station: '홍대입구역' },
    { id: '2', name: '이영희', station: '강남역' },
    { id: '3', name: '박민수', station: '신촌역' },
    { id: '4', name: '최지원', station: '명동역' },
  ]);

  // 다이얼로그 상태
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [friendDialogOpen, setFriendDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<FriendGroup | null>(null);

  // 그룹 편집 상태
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedFriendsForGroup, setSelectedFriendsForGroup] = useState<
    string[]
  >([]);

  // 폼 상태
  const [groupForm, setGroupForm] = useState({
    name: '',
    color: theme.palette.primary.main,
  });
  const [friendForm, setFriendForm] = useState({ name: '', station: '' });
  const [selectedStation, setSelectedStation] = useState<StationData | null>(
    null,
  );

  // 지하철역 검색 상태
  const [inputValue, setInputValue] = useState(''); // 입력 값을 별도로 관리
  const [searchResults, setSearchResults] = useState<StationData[]>([]);
  const maxResults = 50; // 결과 개수 제한

  // 검색 기능
  const handleStationSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // stationConfig의 DATA에서 검색
    const filtered = STATION_CONFIG.DATA.filter(
      (station: StationData) =>
        station.station_nm.includes(query) ||
        station.line_num.includes(query) ||
        station.fr_code.includes(query),
    ).slice(0, maxResults); // 결과 개수 제한

    setSearchResults(filtered);
  };

  // 그룹 생성/수정
  const handleSaveGroup = () => {
    if (!groupForm.name.trim()) return;

    if (editingGroup) {
      setFriendGroups((prev) =>
        prev.map((group) =>
          group.id === editingGroup.id ? { ...group, ...groupForm } : group,
        ),
      );
    } else {
      const newGroup: FriendGroup = {
        id: Date.now().toString(),
        ...groupForm,
        members: [],
      };
      setFriendGroups((prev) => [...prev, newGroup]);
    }

    setGroupDialogOpen(false);
    setEditingGroup(null);
    setGroupForm({ name: '', color: theme.palette.primary.main });
  };

  // 그룹 삭제
  const handleDeleteGroup = (groupId: string) => {
    setFriendGroups((prev) => prev.filter((group) => group.id !== groupId));
  };

  // 친구 추가
  const handleAddFriend = () => {
    if (!friendForm.name.trim() || !selectedStation) return;

    const newFriend: Friend = {
      id: Date.now().toString(),
      name: friendForm.name,
      station: selectedStation.station_nm,
    };

    setAllFriends((prev) => [...prev, newFriend]);
    setFriendDialogOpen(false);
    setFriendForm({ name: '', station: '' });
    setSelectedStation(null);
    setInputValue(''); // 입력값 초기화
    setSearchResults([]);
  };

  // 그룹에 친구 추가
  const handleAddFriendToGroup = (groupId: string, friendId: string) => {
    const friend = allFriends.find((f) => f.id === friendId);
    if (!friend) return;

    setFriendGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              members: group.members.find((m) => m.id === friendId)
                ? group.members
                : [...group.members, friend],
            }
          : group,
      ),
    );
  };

  // 선택된 친구들을 그룹에 추가
  const handleAddSelectedFriendsToGroup = (groupId: string) => {
    selectedFriendsForGroup.forEach((friendId) => {
      handleAddFriendToGroup(groupId, friendId);
    });
    setSelectedFriendsForGroup([]);
  };

  // 친구 선택/해제
  const handleToggleFriendSelection = (friendId: string) => {
    setSelectedFriendsForGroup((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId],
    );
  };

  // 그룹 펼침/접힘 처리
  const handleGroupExpand = (groupId: string, isExpanded: boolean) => {
    if (isExpanded) {
      setExpandedGroup(groupId);
      setSelectedFriendsForGroup([]);
    } else {
      setExpandedGroup(null);
      setSelectedFriendsForGroup([]);
    }
  };

  // 그룹에서 친구 제거
  const handleRemoveFriendFromGroup = (groupId: string, friendId: string) => {
    setFriendGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              members: group.members.filter((m) => m.id !== friendId),
            }
          : group,
      ),
    );
  };

  // 친구 삭제
  const handleDeleteFriend = (friendId: string) => {
    setAllFriends((prev) => prev.filter((f) => f.id !== friendId));
    setFriendGroups((prev) =>
      prev.map((group) => ({
        ...group,
        members: group.members.filter((m) => m.id !== friendId),
      })),
    );
  };

  // 다이얼로그 닫을 때 검색 상태 초기화
  const handleCloseFriendDialog = () => {
    setFriendDialogOpen(false);
    setFriendForm({ name: '', station: '' });
    setSelectedStation(null);
    setInputValue('');
    setSearchResults([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={pageContainerStyle}>
        {/* 헤더 */}
        <Box sx={headerStyle}>
          <Typography sx={titleStyle}>
            <GroupIcon fontSize="large" />
            친구 그룹 관리
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setGroupDialogOpen(true)}
            >
              그룹 생성
            </Button>
            <Button
              variant="outlined"
              startIcon={<PersonAddIcon />}
              onClick={() => setFriendDialogOpen(true)}
            >
              친구 추가
            </Button>
          </Box>
        </Box>

        {/* 메인 콘텐츠 */}
        <Box sx={gridContainerStyle}>
          {/* 친구 그룹 섹션 */}
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
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', flex: 1 }}
                    >
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
                            onClick={() =>
                              handleAddSelectedFriendsToGroup(group.id)
                            }
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

          {/* 전체 친구 목록 섹션 */}
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
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
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
        </Box>

        {/* 플로팅 액션 버튼 */}
        <Fab sx={fabStyle} onClick={() => setFriendDialogOpen(true)}>
          <PersonAddIcon />
        </Fab>

        {/* 그룹 생성/수정 다이얼로그 */}
        <Dialog
          open={groupDialogOpen}
          onClose={() => setGroupDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingGroup ? '그룹 수정' : '새 그룹 생성'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="그룹 이름"
              fullWidth
              variant="outlined"
              value={groupForm.name}
              onChange={(e) =>
                setGroupForm((prev) => ({ ...prev, name: e.target.value }))
              }
              sx={{ mb: 3 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              그룹 색상 선택:
            </Typography>
            <ColorPicker>
              {colorPalette.map((color) => (
                <ColorOption
                  key={color}
                  selected={groupForm.color === color}
                  sx={{ backgroundColor: color }}
                  onClick={() => setGroupForm((prev) => ({ ...prev, color }))}
                />
              ))}
            </ColorPicker>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setGroupDialogOpen(false)}>취소</Button>
            <Button onClick={handleSaveGroup} variant="contained">
              {editingGroup ? '수정' : '생성'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* 친구 추가 다이얼로그 */}
        <Dialog
          open={friendDialogOpen}
          onClose={handleCloseFriendDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>새 친구 추가</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="친구 이름"
              fullWidth
              variant="outlined"
              value={friendForm.name}
              onChange={(e) =>
                setFriendForm((prev) => ({ ...prev, name: e.target.value }))
              }
              sx={{ mb: 2 }}
            />
            <Autocomplete
              options={searchResults}
              getOptionLabel={(option) => option?.station_nm || ''}
              value={selectedStation}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                handleStationSearch(newInputValue);
              }}
              onChange={(event, newValue) => {
                setSelectedStation(newValue);
              }}
              isOptionEqualToValue={(option, value) =>
                option.fr_code === value.fr_code
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="출발역 검색"
                  placeholder="지하철역을 검색하세요"
                  variant="outlined"
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.fr_code}>
                  <TrainIcon
                    sx={{
                      mr: 1,
                      color: getLineColor(option.line_num),
                    }}
                  />
                  <Box>
                    <Typography variant="body2">{option.station_nm}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: getLineColor(option.line_num),
                        fontWeight: 600,
                      }}
                    >
                      {option.line_num}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {' | '}
                      {option.fr_code}
                    </Typography>
                  </Box>
                </Box>
              )}
              noOptionsText={
                inputValue.trim() === ''
                  ? '지하철역 이름을 입력해주세요'
                  : '검색 결과가 없습니다'
              }
              loadingText="검색 중..."
              freeSolo={false}
              clearOnBlur={false}
              selectOnFocus={true}
              filterOptions={(x) => x}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFriendDialog}>취소</Button>
            <Button onClick={handleAddFriend} variant="contained">
              추가
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default FriendGroupManagement;
