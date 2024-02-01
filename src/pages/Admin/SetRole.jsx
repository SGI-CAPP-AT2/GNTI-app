import { useState } from 'react';
import { useScreen } from '../../context/screen.context';
import {
  Avatar,
  Box,
  Button,
  RelativeTime,
  Text,
  TextInput,
  Token,
} from '@primer/react';
import OptionPageBar from '../../components/OptionPageBar';
import { useNavigate } from 'react-router-dom';
import {
  SearchIcon,
  FeedPersonIcon,
  PasskeyFillIcon,
} from '@primer/octicons-react';
import { database, functions } from '../../firebase/firebaseapp';
import Loader from '../../components/Loader';

const SetRole = () => {
  const { height, width } = useScreen();
  const [barH, setBarH] = useState(0);
  const [uid, setUid] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const navigate = useNavigate();
  const appWidth = width > 750 ? 750 : width - 20;
  const getUserInformation = async () => {
    setIsLoading(true);
    const getUserData = functions.httpsCallable('getUserData');
    const user = await getUserData({ targetUserId: uid });
    console.log(user.data);
    if (user.data.error) {
      setUserInformation(null);
      setError(user.data.error);
      setIsLoading(false);
      return;
    }
    setUserInformation(user.data);
    setError(null);
    setIsLoading(false);
  };
  const setUserAdmin = async () => {
    setIsLoading(true);
    const targetUserId = userInformation.uid;
    const setRoleOfUser = functions.httpsCallable('setRoleOfUser');
    const res = await setRoleOfUser({ targetUserId, role: 'admin' });
    console.log(res);
    setUserInformation(null);
    setError(res.data.status);
    setIsLoading(false);
  };
  const setUserVerifier = async () => {
    setIsLoading(true);
    const targetUserId = userInformation.uid;
    const setRoleOfUser = functions.httpsCallable('setRoleOfUser');
    const res = await setRoleOfUser({ targetUserId, role: 'verifier' });
    setUserInformation(null);
    setError(res.data.status);
    setIsLoading(false);
  };
  return (
    <>
      <OptionPageBar
        text={'Set Role of User'}
        buttons={true}
        onCancel={() => {
          navigate('/');
        }}
        setAquiredHeight={setBarH}
      />
      {isLoading && (
        <Box margin={'auto'}>
          <Loader />
        </Box>
      )}
      {!isLoading && (
        <Box
          width={appWidth}
          height={height - barH}
          margin={'auto'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Box width={appWidth}>
            Enter User Id:
            <TextInput
              block
              placeholder="User Id"
              value={uid}
              onChange={v => {
                setUid(v.target.value);
              }}
              trailingAction={
                <TextInput.Action
                  onClick={getUserInformation}
                  icon={SearchIcon}
                  aria-label="search user"
                />
              }
            />
          </Box>
          {error && <Box margin={'auto'}>{error}</Box>}
          {userInformation && (
            <Box p={3}>
              <Box display="flex" textAlign="center" alignItems="center">
                <Avatar
                  src={userInformation.photoURL}
                  size={50}
                  square={true}
                  sx={{ margin: 'auto' }}
                />
              </Box>
              <br />
              <Text>
                Name: <strong>{userInformation.displayName}</strong>
                <br />
                Email: <strong>{userInformation.email}</strong>
              </Text>
              <br />
              <br />
              <Box display={'flex'}>
                <Token text="User" leadingVisual={FeedPersonIcon} />
                <Box marginLeft={'10px'}>
                  {userInformation.admin ? (
                    <>
                      <Token text="Admin" leadingVisual={PasskeyFillIcon} />
                    </>
                  ) : (
                    <Button onClick={setUserAdmin}>Set role to Admin</Button>
                  )}
                </Box>
                <Box marginLeft={'10px'}>
                  {userInformation.verifier ? (
                    <>
                      <Token text="Verifier" leadingVisual={PasskeyFillIcon} />
                    </>
                  ) : (
                    <Button onClick={setUserVerifier}>
                      Set role to Verifier
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
export default SetRole;
