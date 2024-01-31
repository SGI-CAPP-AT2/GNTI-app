import { useRef, useState } from 'react';
import OptionPageBar from '../../components/OptionPageBar';
import { useScreen } from '../../context/screen.context';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Octicon, TextInput, Timeline } from '@primer/react';
import { GitCommitIcon } from '@primer/octicons-react';
import { database } from '../../firebase/firebaseapp';
import Loader from '../../components/Loader';
const AddRoute = () => {
  const { height, width } = useScreen();
  const [barH, setBarH] = useState(0);
  const [routeMap, setRouteMap] = useState([]);
  const [nameOfStop, setNameOfStop] = useState('Unnamed Stop');
  const [fairOfStop, setFairOfStop] = useState(0);
  const [nameOfRoute, setNameOfRoute] = useState(null);
  const [numberOfRoute, setNumberOfRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const nameOfRouteRef = useRef(null);
  const numberOfRouteRef = useRef(null);
  const appWidth = width > 750 ? 750 : width - 20;
  const navigate = useNavigate();
  const addStop = () => {
    setRouteMap(prevRouteMap => [
      ...prevRouteMap,
      { name: nameOfStop, fair: fairOfStop },
    ]);
  };
  const addRoute = async () => {
    if (!nameOfRoute) {
      nameOfRouteRef.current.focus();
      return;
    }
    if (!numberOfRoute) {
      numberOfRouteRef.current.focus();
      return;
    }
    if (routeMap.length == 0) {
      return;
    }
    setIsLoading(true);
    const map = JSON.stringify(routeMap);
    const name = nameOfRoute;
    const id = numberOfRoute;
    const routeRef = database.ref('/routes/' + id);
    await routeRef.set({ map, name });
    setIsLoading(false);
    navigate('/');
  };
  return (
    <>
      <OptionPageBar
        text={'Add a Route'}
        buttons={true}
        onCancel={() => {
          navigate('/');
        }}
        onDone={() => {
          addRoute();
        }}
        setAquiredHeight={setBarH}
      />
      <Box width={appWidth} height={height - barH} margin={'auto'}>
        {!isLoading && (
          <>
            <Box width={appWidth} height={80} display={'flex'}>
              <Box margin={'auto'} display={'flex'}>
                <TextInput
                  ref={nameOfRouteRef}
                  placeholder="Name of Route"
                  value={nameOfRoute || ''}
                  onChange={v => {
                    setNameOfRoute(v.target.value);
                  }}
                />
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
              </Box>
            </Box>
            <Box height={height - barH - 80} overflow={'scroll'}>
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
                <Timeline.Item>
                  <Timeline.Badge>
                    <Octicon icon={GitCommitIcon} />
                  </Timeline.Badge>
                  <Timeline.Body>
                    <Box display={'flex'}>
                      <TextInput
                        placeholder="name of stop"
                        value={nameOfStop}
                        onChange={v => setNameOfStop(v.target.value)}
                      />
                      <Box width={10}></Box>
                      <TextInput
                        placeholder="fair from start"
                        value={fairOfStop}
                        onChange={v => setFairOfStop(v.target.value)}
                      />
                      <Box width={10}></Box>
                      <Button onClick={addStop}>Add</Button>
                    </Box>
                  </Timeline.Body>
                </Timeline.Item>
              </Timeline>
              <Box height={20}></Box>
            </Box>
          </>
        )}
        {isLoading && <Loader width={appWidth} />}
      </Box>
    </>
  );
};
export default AddRoute;
