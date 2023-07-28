import { Box, Button, Text } from '@primer/react';
import styled from 'styled-components';
const LoginScreen = styled(Box)`
  width: 100%;
  max-width: 500px;
  padding: 10px;
  margin: auto;
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;
const Login = () => {
  return (
    <Box display="flex" alignItems="center">
      <LoginScreen
        border="1px solid"
        borderColor="border.default"
        borderBottomColor="border.default"
      >
        <Text textAlign="center">Sign in to continue</Text>
        <img src="/logo512.png" />
        <Button variant="outline" block>
          Continue With Google
        </Button>
      </LoginScreen>
    </Box>
  );
};
export default Login;
