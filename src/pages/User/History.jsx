import { useNavigate } from 'react-router-dom';
import { useScreen } from '../../context/screen.context';
import { useEffect, useState } from 'react';
import OptionPageBar from '../../components/OptionPageBar';
import { useProfile } from '../../context/profile.context';
import { database } from '../../firebase/firebaseapp';
import { Box } from '@primer/react';
import Loader from '../../components/Loader';
import ListView from '../../components/ListView';
import { LogIcon } from '@primer/octicons-react';
const History = () => {
  const { height, width } = useScreen();
  const [_, setBarH] = useState(0);
  const appWidth = width > 750 ? 750 : width - 20;
  const navigate = useNavigate();
  const profileObject = useProfile();
  const { uid } = profileObject.profile;
  const [history, setHistory] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const array_of_history = Object.values(history).sort((a, b) => b.at - a.at);
  useEffect(() => {
    console.log('Exec');
    const userHistoryRef = database.ref('/profiles/' + uid + '/history/');
    console.log(userHistoryRef.toString());
    userHistoryRef.once('value', snap => {
      setHistory({ ...snap.val() });
      console.log(snap.val());
      setIsFetched(true);
    });
  }, [uid]);
  return (
    <>
      <OptionPageBar
        text={'History'}
        buttons={true}
        onCancel={() => {
          navigate('/');
        }}
        setAquiredHeight={setBarH}
      />

      <Box display={'flex'} width={appWidth} margin={'auto'}>
        {!isFetched && (
          <Box width={appWidth} marginTop={10}>
            <Loader width={appWidth} />
          </Box>
        )}
        {isFetched && (
          <>
            <ListView
              list={array_of_history.map(val => {
                if (val.status) {
                  console.log(val);
                  const { status, at, from, to, routeName } = val;
                  return {
                    text: routeName + ' from: ' + from.name + ' to: ' + to.name,
                    sub: status + ' ' + new Date(at),
                    id: at,
                    icon: LogIcon,
                  };
                }
              })}
            />
          </>
        )}
      </Box>
    </>
  );
};
export default History;
