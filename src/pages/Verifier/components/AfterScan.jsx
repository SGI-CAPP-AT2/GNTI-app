import { useLayoutEffect, useRef, useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../../components/Loader';
import { Box, Button, FormControl, Radio, RadioGroup } from '@primer/react';
import { useNavigate } from 'react-router-dom';
import { database } from '../../../firebase/firebaseapp';
import { useProfile } from '../../../context/profile.context';
const AfterScan = ({ height, width, bmfq }) => {
  const [isLoding, setIsLoading] = useState(true);
  const [allRoutes, setAllRoutes] = useState(null);
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const bottomSheet = useRef(null);
  const [btmShtHgt, setBtmHeigh] = useState(0);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const { profile } = useProfile();
  useEffect(() => {
    if (!isCreatingSession) {
      const mn = async () => {
        const response = await fetch(
          'https://busapi-nycezhdh5a-uc.a.run.app?q=RETURN_ALL_ROUTES_1109'
        );
        const allRoutes = await response.json();
        setAllRoutes(allRoutes);
        setIsLoading(false);
      };
      mn();
    }
  }, [isCreatingSession]);
  useLayoutEffect(() => {
    if (bottomSheet.current) {
      setBtmHeigh(bottomSheet.current.offsetHeight);
    }
  }, [bottomSheet, height, isLoding]);
  const setRouteFromGroup = v => {
    setSelectedRoute(v);
  };
  const createSession = async () => {
    if (selectedRoute) {
      setIsCreatingSession(true);
      setIsLoading(true);
      const sessionsRef = database.ref('/sessions/');
      const deviceRef = database.ref('/BMfQs/' + bmfq);
      const profileRef = database.ref('/profiles/' + profile.uid);
      const sessionSnap = await sessionsRef.once('value');
      const id = sessionSnap.numChildren() + 1;
      await sessionsRef.child(id).set({
        id,
        index: 0,
        route: selectedRoute,
        state: 'active',
      });
      await deviceRef.child('session').set(id);
      await profileRef.child('session_linked').set(id);
      navigate('/');
      console.log(bmfq);
    }
  };
  return (
    <Box width={width}>
      {isLoding && (
        <Box margin={'auto'}>
          <Loader />
        </Box>
      )}
      {!isLoding && (
        <>
          <Box height={height - btmShtHgt - 10}>
            <RadioGroup name="choiceGroup" onChange={setRouteFromGroup}>
              <RadioGroup.Label>
                Choose the route to start session on:{' '}
              </RadioGroup.Label>
              {allRoutes.map(({ name, id }) => (
                <FormControl key={id}>
                  <Radio value={id} />
                  <FormControl.Label>{id + ' ' + name}</FormControl.Label>
                </FormControl>
              ))}
            </RadioGroup>
          </Box>
          <Box ref={el => (bottomSheet.current = el)} display={'flex'}>
            <Box>
              <Button variant="danger" onClick={() => navigate('/')}>
                Cancel
              </Button>
            </Box>
            <Box marginLeft={'auto'}>
              <Button onClick={createSession}>Continue</Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
export default AfterScan;
