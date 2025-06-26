import { Box, Container, Paper, styled } from '@mui/material';
import { MemberSettingCurrentMemberCard } from './MemberSettingCurrentMemberCard';
import { MemberSettingAddArea } from './MemberSettingAddArea';

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '600px',
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: '18px',
  overflow: 'hidden',
  border: '1px solid rgba(0,0,0,0.04)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  height: '25vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.down('sm')]: {
    height: '40vh',
    padding: '12px 8px',
  },
}));

export const MemberSettingWidget = () => (
  <StyledContainer>
    <StyledPaper>
      <Box
        sx={{
          flex: { xs: '0 0 40%', sm: '0 0 60%' },
          p: 2.5,
        }}
      >
        <MemberSettingCurrentMemberCard />
      </Box>

      <Box
        sx={{
          flex: { xs: '0 0 60%', sm: '0 0 40%' },
          px: 2.5,
          pt: 0,
          pb: 2.5,
        }}
      >
        <MemberSettingAddArea />
      </Box>
    </StyledPaper>
  </StyledContainer>
);
