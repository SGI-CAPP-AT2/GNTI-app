import { Box, Button, Heading, Popover, Text } from '@primer/react';

const LoginBtnPop = ({ onClick, disabled, message }) => {
  return (
    <Box position="relative">
      <Button onClick={onClick} disabled={disabled} variant="outline" block>
        Continue With Google
      </Button>
      <Popover relative open={!!message} caret="top">
        <Popover.Content sx={{ mt: 2 }}>
          <Heading sx={{ fontSize: 2 }}>Sign in Attempt Message</Heading>
          <Text as="p">{message}</Text>
        </Popover.Content>
      </Popover>
    </Box>
  );
};
export default LoginBtnPop;
