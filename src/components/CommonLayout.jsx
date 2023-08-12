import { useEffect, useRef, useState } from 'react';
import SuperBox from './SuperBox';
import { Box, Spinner, Button } from '@primer/react';
import styled from 'styled-components';
import InfoBtnDialog from './InfoBtnDialog';
import { useProfile } from '../context/profile.context';
import ProfileBtnDialog from './ProfileBtnDialog';
import { ScreenProvider } from '../context/screen.context';
import { useNavigate } from 'react-router-dom';
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
const M_10 = styled.div`
  width: 10px;
`;
const CommonLayout = ({ children }) => {
  const [height, setHeight] = useState(0);
  const navbarRef = useRef(null);
  const { profile, isLoading, signOut } = useProfile();
  useEffect(() => {
    setHeight(navbarRef.current.offsetHeight);
  }, []);
  const navigate = useNavigate();
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
        <Box marginLeft="auto" display="flex" flexDirection="row">
          <InfoBtnDialog />

          {profile ? (
            <>
              <M_10 />
              <ProfileBtnDialog profile={profile} signOut={signOut} />
            </>
          ) : (
            <>
              <M_10 />
              <Button onClick={() => navigate('/login')}>Sign in</Button>
            </>
          )}
        </Box>
      </NavBar>
      <OverflowBox bg="canvas.subtle" height={`calc(100vh - ${height}px)`}>
        {!isLoading && (
          <ScreenProvider navHeight={navbarRef.current.offsetHeight}>
            {children}
          </ScreenProvider>
        )}
        {isLoading && renderLoader()}
      </OverflowBox>
    </SuperBox>
  );
};
export default CommonLayout;
