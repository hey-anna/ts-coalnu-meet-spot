import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  ClickAwayListener,
  styled,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';
import { satisfactionTooltipText } from '@/domain/place/lib/constraint/tooltipText';

const StyledTooltip = styled(
  ({ className, ...props }: React.ComponentProps<typeof Tooltip>) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: '#f5f5f9',
    color: '#333',
    boxShadow: theme.shadows[2],
    fontSize: 13,
    padding: '12px 14px',
    maxWidth: 280,
    lineHeight: 1.6,
  },
}));

const SatisfactionTooltip = () => {
  const [open, setOpen] = useState(false);

  const handleTooltipToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box>
        <StyledTooltip
          title={
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                이동 만족도 기준
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{ whiteSpace: 'pre-line' }}
              >
                {satisfactionTooltipText}
              </Typography>
            </Box>
          }
          placement="top-end"
          open={open}
          onClose={handleTooltipClose}
          disableHoverListener
          disableFocusListener
          disableTouchListener
        >
          <IconButton size="small" onClick={handleTooltipToggle}>
            <InfoOutlinedIcon fontSize="small" color="action" />
          </IconButton>
        </StyledTooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default SatisfactionTooltip;
