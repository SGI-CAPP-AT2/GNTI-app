import { Box, Button, Text } from '@primer/react';
import { useState } from 'react';
import styled from 'styled-components';
import TnCTooltipBtn from '../components/Login/TnCTooltipBtn';
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
  const [allowed, setAllowed] = useState(false);
  return (
    <Box display="flex" alignItems="center">
      <LoginScreen
        border="1px solid"
        borderColor="border.default"
        borderBottomColor="border.default"
      >
        <Text textAlign="center">Sign in to continue</Text>
        <br />
        <TnCTooltipBtn value={allowed} setValue={setAllowed} />
        <Button disabled={!allowed} variant="outline" block>
          Continue With Google
        </Button>
      </LoginScreen>
    </Box>
  );
};
export default Login;
