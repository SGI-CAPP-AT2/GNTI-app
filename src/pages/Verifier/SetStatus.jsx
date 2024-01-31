import { Box, Button, FormControl, Radio, RadioGroup } from '@primer/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import OptionPageBar from '../../components/OptionPageBar';
import { useNavigate } from 'react-router-dom';
import { useScreen } from '../../context/screen.context';
import { useProfile } from '../../context/profile.context';
import { database } from '../../firebase/firebaseapp';
import Loader from '../../components/Loader';
const SetStatus = () => {
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [alreadyLinked, setAlreadyLinked] = useState(false);
  const [routeMap, setRouteMap] = useState(null);
  const { profile } = useProfile();
  const { height, width } = useScreen();
  const bottomSheet = useRef(null);
  const [btmShtHgt, setBtmHeigh] = useState(0);
  const [barH, setBarH] = useState(0);
  const appWidth = width > 750 ? 750 : width - 20;
  const navigate = useNavigate();
  useEffect(() => {
    const profileRef = database.ref('/profiles/' + profile.uid);
    const mn = async () => {
      const linkedSessionSnap = await profileRef
        .child('session_linked')
        .once('value');
      const sessionRef = database.ref('/sessions/' + linkedSessionSnap.val());
      const sessionSnap = await sessionRef.once('value');
      if (!sessionSnap.val()) {
        setAlreadyLinked(false);
        setIsLoading(false);
        return;
      }
      const { id, index, route, state: status } = sessionSnap.val();
      console.log(id, index, route, status);
      const routeRef = database.ref('/routes/' + route);
      if (status != 'active') {
        setAlreadyLinked(false);
        setIsLoading(false);
        return;
      }
      const routeSnap = await routeRef.once('value');
      const { map: mapString, name } = routeSnap.val();
      console.log(mapString, name);
      const map = JSON.parse(mapString);
      setSessionId(id);
      setRouteMap(map);
      setSelectedIndex(index);
      setIsLoading(false);
      setAlreadyLinked(true);
    };
    mn();
  }, [profile.uid]);
  useLayoutEffect(() => {
    if (bottomSheet.current) {
      console.log(bottomSheet.current.offsetHeight);
      setBtmHeigh(bottomSheet.current.offsetHeight);
    }
  }, [bottomSheet, height, isLoading, alreadyLinked]);
  const setSessionStatus = async () => {
    setIsLoading(true);
    const selIndex = parseInt(selectedIndex);
    const sessionRef = database.ref('/sessions/' + sessionId);
    const profileRef = database.ref('/profiles/' + profile.uid);
    if (selIndex == -1 || routeMap.length - 1 == selIndex) {
      await sessionRef.child('state').set('inactive');
      await profileRef.child('session_linked').set(null);
      navigate('/');
    }
    if (selIndex != -1 && selIndex < routeMap.length) {
      await sessionRef.child('index').set(selIndex);
    }
    setIsLoading(false);
  };
  return (
    <>
      <OptionPageBar
        text={'Manage Session : ' + sessionId}
        buttons={true}
        onCancel={() => {
          navigate('/');
        }}
        setAquiredHeight={setBarH}
      />
      {isLoading && (
        <Box width={appWidth} margin={'auto'} marginTop={10}>
          <Loader width={appWidth} />
        </Box>
      )}
      {!isLoading && !alreadyLinked && (
        <Box
          width={appWidth}
          height={height - barH}
          margin={'auto'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Box margin={'auto'} marginY={'10px'}>
            No Session started
          </Box>
          <Box margin={'auto'} marginY={'10px'} fontSize={'small'}>
            Create Session from {'"Link a Device"'}
          </Box>
        </Box>
      )}
      {!isLoading && alreadyLinked && (
        <Box width={appWidth} height={height - barH} margin={'auto'}>
          <Box overflowY={'scroll'} height={height - barH - btmShtHgt - 10}>
            <RadioGroup
              name="choiceGroup"
              onChange={val => setSelectedIndex(val)}
            >
              <RadioGroup.Label>Choose Current Session: </RadioGroup.Label>
              <FormControl key={-1}>
                <Radio value={-1} checked={selectedIndex == -1} />
                <FormControl.Label>
                  {-1 + ': ' + 'Deactivate'}
                </FormControl.Label>
              </FormControl>
              {routeMap.map(({ name }, index) => (
                <FormControl key={index}>
                  <Radio value={index} checked={selectedIndex == index} />
                  <FormControl.Label>{index + ': ' + name}</FormControl.Label>
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
              <Button onClick={setSessionStatus}>Set</Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default SetStatus;
