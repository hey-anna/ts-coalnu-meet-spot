import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { colorPalette } from '@/shared/config/config';

export const GroupDialog = ({
  groupDialogOpen,
  setGroupDialogOpen,
  editingGroup,
  groupForm,
  setGroupForm,
  handleSaveGroup,
}) => {
  return (
    <Dialog
      open={groupDialogOpen}
      onClose={() => setGroupDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{editingGroup ? '그룹 수정' : '새 그룹 생성'}</DialogTitle>
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
          {colorPalette.map((color, index) => (
            <ColorOption
              key={`color-${index}`}
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
  );
};

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
