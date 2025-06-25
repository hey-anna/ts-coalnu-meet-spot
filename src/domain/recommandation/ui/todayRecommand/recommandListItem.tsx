import type { PlaceData } from "../../../../shared/config/config";
import {
  Box, Typography,
} from '@mui/material';
import theme from "../../../../styles/mui/theme";

const placeItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  margin: '4px 0',
  borderBottom: `1px solid #e0e0e0`,
  borderRadius: '0px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:last-child': {
    borderBottom: 'none'
  },
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  }
};

const placeInfoStyle = {
  flex: 1
};

const placeNameStyle = {
  fontSize: '15px',
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginBottom: '4px'
};

const placeCategoryStyle = {
  fontSize: '13px',
  color: theme.palette.text.secondary
};

const recommandListItem = ({ place }: { place: PlaceData }) => (
  <Box 
    sx={placeItemStyle}
    onClick={() => window.open(place.place_url, '_blank')}
  >
    <Box sx={placeInfoStyle}>
      <Typography sx={placeNameStyle}>
        {place.place_name}
      </Typography>
      <Typography sx={placeCategoryStyle}>
        {place.category_name.split(' > ').pop()}
      </Typography>
    </Box>
  </Box>
);

export default recommandListItem;