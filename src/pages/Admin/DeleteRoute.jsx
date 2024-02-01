import { useRef, useState } from 'react';
import OptionPageBar from '../../components/OptionPageBar';
import { useScreen } from '../../context/screen.context';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Octicon, TextInput, Timeline } from '@primer/react';
import { GitCommitIcon } from '@primer/octicons-react';
import { database } from '../../firebase/firebaseapp';
import Loader from '../../components/Loader';
const DeleteRoute = () => {
  const { height, width } = useScreen();
  const [barH, setBarH] = useState(0);
  const [routeMap, setRouteMap] = useState([]);
  const [numberOfRoute, setNumberOfRoute] = useState(null);
  const [fetchedRouteNumber, setFetchedRouteNumber] = useState(null);
  const [nameOfRoute, setNameOfRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const nameOfRouteRef = useRef(null);
  const numberOfRouteRef = useRef(null);
  const appWidth = width > 750 ? 750 : width - 20;
  const navigate = useNavigate();
  const loadRoute = async () => {
    setIsLoading(true);
    const routesRef = database.ref('/routes/');
    const routeSnap = await routesRef.child(numberOfRoute).once('value');
    const route = routeSnap.val();
    if (route) {
      const { map: mapString, name } = route;
      const map = JSON.parse(mapString);
      setRouteMap(map);
      setFetchedRouteNumber(numberOfRoute);
      setNameOfRoute(name);
    } else {
      setRouteMap(null);
      setFetchedRouteNumber(null);
      setNameOfRoute(null);
    }
    setIsLoading(false);
  };
  const deleteTheRoute = async () => {
    setIsLoading(true);
    const routesRef = database.ref('/routes/');
    await routesRef.child(fetchedRouteNumber).set(null);
    await loadRoute();
    setIsLoading(false);
  };
  return (
    <>
      <OptionPageBar
        text={'Delete a Route'}
        buttons={true}
        onCancel={() => {
          navigate('/');
        }}
        setAquiredHeight={setBarH}
      />
      <Box width={appWidth} height={height - barH} margin={'auto'}>
        {!isLoading && (
          <>
            <Box width={appWidth} height={80} display={'flex'}>
              <Box margin={'auto'} display={'flex'}>
                <Box width={10}></Box>
                <TextInput
                  ref={numberOfRouteRef}
                  placeholder="Number of Route"
                  type="number"
                  value={numberOfRoute || ''}
                  onChange={v => {
                    setNumberOfRoute(v.target.value);
                  }}
                />
                <Box width={10}></Box>
                <Button onClick={loadRoute}>Load</Button>
              </Box>
            </Box>
            {fetchedRouteNumber && (
              <>
                <Box display={'flex'} width={appWidth} height={80}>
                  <Box marginRight={'auto'}>
                    Are you sure to delete {nameOfRoute} ?
                  </Box>
                  <Box marginLeft={'auto'}>
                    <Button variant="danger" onClick={deleteTheRoute}>
                      Delete
                    </Button>
                  </Box>
                </Box>
                <Box height={height - barH - 160} overflow={'scroll'}>
                  <Timeline>
                    {routeMap.map(stop => {
                      const { name, fair } = stop;
                      return (
                        <Timeline.Item key={fair}>
                          <Timeline.Badge>
                            <Octicon icon={GitCommitIcon} />
                          </Timeline.Badge>
                          <Timeline.Body>
                            <b>{name}</b> for fair <b>{fair}</b>
                          </Timeline.Body>
                        </Timeline.Item>
                      );
                    })}
                  </Timeline>
                  <Box height={20}></Box>
                </Box>
              </>
            )}
          </>
        )}
        {isLoading && <Loader width={appWidth} />}
      </Box>
    </>
  );
};
export default DeleteRoute;
