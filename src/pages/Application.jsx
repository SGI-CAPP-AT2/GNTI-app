import { Box, Button } from '@primer/react';
import { useScreen } from '../context/screen.context';
import OptionPageBar from '../components/OptionPageBar';
import { useState } from 'react';
import { LogIcon, ChecklistIcon } from '@primer/octicons-react';
import { useNavigate } from 'react-router-dom';
const Application = () => {
  const { height, width } = useScreen();
  const [barH, setBarH] = useState();
  const navigate = useNavigate();
  const appWidth = width > 750 ? 750 : width - 20;
  return (
    <>
      <OptionPageBar text="Home" setAquiredHeight={setBarH} />
      <Box width={width} height={height - barH} display={'flex'}>
        <Box
          width={appWidth}
          marginLeft="auto"
          marginRight="auto"
          marginTop={20}
        >
          <Box
            width={appWidth}
            display={'flex'}
            flexDirection="column"
            marginTop={2}
          >
            <Button
              leadingIcon={LogIcon}
              variant="outline"
              onClick={() => navigate('/user/newtoken')}
            >
              Issue a Token
            </Button>
            <br />
            <Button leadingIcon={ChecklistIcon}>Verify My Token</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Application;
