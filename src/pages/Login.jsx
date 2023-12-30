import { Box, Text } from '@primer/react';
import { useState } from 'react';
import styled from 'styled-components';
import TnCTooltipBtn from '../components/Login/TnCTooltipBtn';
import { auth, database } from '../firebase/firebaseapp';
import firebase from 'firebase/app';
import LoginBtnPop from '../components/Login/LoginBtnPop';
import icon from '../assets/icon.png';
const LoginScreen = styled(Box)`
  width: calc(100% - 30px);
  max-width: 500px;
  padding: 10px;
  margin: auto;
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;
const Login = () => {
  const [message, setMessage] = useState(null);
  const loginWithGoogle = async () => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      setMessage('Signed in successfully');
    } catch (e) {
      setMessage(e.message);
      //(e.message);
    }
  };
  return (
    <Box display="flex" alignItems="center">
      <LoginScreen
        border="1px solid"
        borderColor="border.default"
        borderBottomColor="border.default"
      >
        <Box display="flex">
          <Box>
            <img src={icon} height={20} />
          </Box>
          <Box margin={'auto'}>
            <Text textAlign="center">Sign in to continue</Text>
          </Box>
        </Box>
        <br />

        <LoginBtnPop onClick={loginWithGoogle} message={message}>
          Continue With Google
        </LoginBtnPop>
        <TnCTooltipBtn />
      </LoginScreen>
    </Box>
  );
};
export default Login;
