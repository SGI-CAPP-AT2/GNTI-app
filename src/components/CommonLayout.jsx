import { useEffect, useRef, useState } from 'react';
import SuperBox from './SuperBox';
import { Box, IconButton, Spinner } from '@primer/react';
import styled from 'styled-components';
import { ImageIcon, InfoIcon, SearchIcon } from '@primer/octicons-react';
import InfoBtnDialog from './InfoBtnDialog';
import { useProfile } from '../context/profile.context';
const OverflowBox = styled(Box)`
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
const NavBar = styled(Box)`
  height: 50px;
  display: flex;
  align-items: center;
  vertical-align: middle;
  padding: 0 10px;
  * {
    margin-top: auto;
    margin-bottom: auto;
  }
`;
const CommonLayout = ({ children }) => {
  const [height, setHeight] = useState(0);
  const navbarRef = useRef(null);
  const { isLoading, profile } = useProfile();
  useEffect(() => {
    setHeight(navbarRef.current.offsetHeight);
  }, []);
  const renderLoader = () => (
    <Box display="flex" alignItems="center">
      <Spinner
        size="large"
        sx={{
          margin: 'auto',
          marginTop: 5,
        }}
      />
    </Box>
  );
  return (
    <SuperBox>
      <NavBar
        ref={navbarRef}
        borderBottom="1px solid"
        borderBottomColor="border.default"
      >
        <img src="/logo192.png" height={20} />
        <Box marginRight="auto" marginLeft="10px">
          GNTI @ADYPSOE
        </Box>
        <Box marginLeft="auto">
          <InfoBtnDialog />
        </Box>
      </NavBar>
      <OverflowBox bg="canvas.subtle" height={`calc(100vh - ${height}px)`}>
        {!isLoading && children}
        {isLoading && renderLoader()}
      </OverflowBox>
    </SuperBox>
  );
};
export default CommonLayout;
