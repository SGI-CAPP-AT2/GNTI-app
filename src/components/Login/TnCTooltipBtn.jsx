import { Box, Tooltip, Text } from '@primer/react';
import { Link } from 'react-router-dom';
const TnCTooltipBtn = () => {
  return (
    <Box display={'flex'} width="100%">
      <Text marginLeft={'auto'} padding={2} color={'fg.subtle'} fontSize="10px">
        <Tooltip aria-label="We access your Email id, Name, Avatar (READ)">
          * By Signing in or Signing up you accept{' '}
          <Link to={'/prpo'}>Privacy Policy</Link>{' '}
        </Tooltip>
      </Text>
    </Box>
  );
};
export default TnCTooltipBtn;
