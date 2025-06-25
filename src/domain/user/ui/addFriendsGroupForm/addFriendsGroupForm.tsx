import { useState, type Dispatch, type SetStateAction } from 'react';

import type { SelsectedFriendsList } from '@/domain/user/models/model';

import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ModalPortal from '@/shared/component/ModalPortal';
import { GroupManager } from './GroupManager/GroupManager';
import { SelectedFriendsList } from './SelectedFriendsList/SelectedFriendsList';
import AddFriendsForm from '../addFriendsForm/addFriendsForm';

const AddFriendsGroupForm = ({ onClose }: { onClose: () => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isAddFriendFormOpen, setIsAddFriendFormOpen] =
    useState<boolean>(false);
  const [selectedFriendsList, setSelectedFriendsList] =
    useState<SelsectedFriendsList>([]);
  const fetchForm = () => {
    console.log('fetchForm');
  };

  // 주석
  return (
    <ModalPortal>
      {({ overlayRef }) => (
        <Box
          ref={overlayRef}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1300,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 300,
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: 4,
              borderRadius: 2,
              minWidth: isMobile ? 150 : 300,
              maxWidth: 500,
              maxHeight: {
                sm: '80vh',
                md: 600,
              },
              overflowY: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flex: 1,
                justifyContent: 'flex-end',
                maxHeight: 10,
              }}
            >
              <IconButton
                onClick={onClose}
                sx={{
                  width: 32,
                  height: 32,
                  padding: 0,
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  color: 'grey.700',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'custom.bgHove',
                    color: 'primary.main',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <GroupManager setSelectedFriendsList={setSelectedFriendsList} />

            <AddNewFriendButton
              setIsAddFriendFormOpen={setIsAddFriendFormOpen}
            />

            {selectedFriendsList.length > 0 ? (
              <SelectedFriendsList
                selectedFriendsList={selectedFriendsList}
                setSelectedFriendsList={setSelectedFriendsList}
              />
            ) : null}

            <FormButton fetchForm={fetchForm} />

            {isAddFriendFormOpen && (
              <AddFriendsForm
                onClose={() => setIsAddFriendFormOpen(false)}
                setSelectedFriendsList={setSelectedFriendsList}
              />
            )}
          </Box>
        </Box>
      )}
    </ModalPortal>
  );
};

export default AddFriendsGroupForm;

const FormButton = ({ fetchForm }: { fetchForm: () => void }) => {
  return (
    <Box sx={{ display: 'flex', flex: 1 }}>
      <Button
        onClick={() => fetchForm()}
        sx={{
          boxSizing: 'border-box',
          marginTop: 2,
          width: '100%',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff',
          fontWeight: 'bold',
          borderRadius: 2,
          '&:hover': {
            backgroundImage:
              'linear-gradient(135deg, #5a63e0 0%, #6c3b92 100%)',
          },
          minWidth: '100%',
        }}
      >
        저장하기
      </Button>
    </Box>
  );
};

const AddNewFriendButton = ({
  setIsAddFriendFormOpen,
}: {
  setIsAddFriendFormOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

        marginTop: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'primary.main',
          '&:hover': {
            color: 'user.main',
          },
          fontSize: '12px',
        }}
        onClick={() => setIsAddFriendFormOpen((prev) => !prev)}
      >
        그룹에 없는 친구 추가
      </Typography>
    </Box>
  );
};
