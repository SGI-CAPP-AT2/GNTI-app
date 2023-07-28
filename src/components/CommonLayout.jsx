import { useEffect, useRef, useState } from 'react';
import SuperBox from './SuperBox';
import { Box, IconButton } from '@primer/react';
import styled from 'styled-components';
import { ImageIcon, InfoIcon, SearchIcon } from '@primer/octicons-react';
import InfoBtnDialog from './InfoBtnDialog';
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
  useEffect(() => {
    setHeight(navbarRef.current.offsetHeight);
  });
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
        {children}
      </OverflowBox>
    </SuperBox>
  );
};
export default CommonLayout;
