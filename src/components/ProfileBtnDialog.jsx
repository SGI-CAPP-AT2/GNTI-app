import {
  Box,
  Dialog,
  IconButton,
  Avatar,
  Text,
  RelativeTime,
  Token,
  Button,
} from '@primer/react';
import { FeedPersonIcon, PasskeyFillIcon } from '@primer/octicons-react';
import { useModal } from '../hooks/useModal';
import styled from 'styled-components';
const M_10 = styled.div`
  width: 10px;
`;
const ProfileBtnDialog = ({ profile, signOut }) => {
  const { isOpen, open, close } = useModal();
  return (
    <>
      <IconButton onClick={open} sx={{ padding: 0 }}>
        <Avatar src={profile.avatar} size={20} />
      </IconButton>
      <Dialog
        sx={{
          top: '50px',
        }}
        isOpen={isOpen}
        onDismiss={close}
        aria-labelledby="header-id"
      >
        <Dialog.Header id="header-id">
          Profile Details (Data being used by us)
        </Dialog.Header>
        <Box p={3}>
          <Box display="flex" textAlign="center" alignItems="center">
            <Avatar
              src={profile.avatar}
              size={50}
              square={true}
              sx={{ margin: 'auto' }}
            />
          </Box>
          <br />
          <Text>
            Name: <strong>{profile.name}</strong>
            <br />
            Email: <strong>{profile.email}</strong>
            <br />
            joined :{' '}
            <strong>
              <RelativeTime date={new Date(profile.createdAt)} />
            </strong>
            <br />
            User id: <strong>{profile.uid}</strong>
          </Text>
          <br />
          <br />
          <Box display={'flex'}>
            <Token text="User" leadingVisual={FeedPersonIcon} />
            {profile.isAdmin && (
              <>
                <M_10 />
                <Token text="Admin" leadingVisual={PasskeyFillIcon} />
              </>
            )}
          </Box>
        </Box>
        <Box display="flex" p={2}>
          <Button
            onClick={signOut}
            variant="danger"
            sx={{
              marginLeft: 'auto',
            }}
          >
            Sign out
          </Button>
        </Box>
      </Dialog>
    </>
  );
};
export default ProfileBtnDialog;
