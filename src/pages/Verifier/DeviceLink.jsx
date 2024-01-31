import { Box } from '@primer/react';
import { useEffect, useState } from 'react';
import OptionPageBar from '../../components/OptionPageBar';
import { useNavigate } from 'react-router-dom';
import { useScreen } from '../../context/screen.context';
import AfterScan from './components/AfterScan';
import { useProfile } from '../../context/profile.context';
import { database } from '../../firebase/firebaseapp';
import Loader from '../../components/Loader';
import { QrScanner } from '@yudiel/react-qr-scanner';
const DeviceLink = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [scanRes, setScanResults] = useState(null);
  const [alreadyLinked, setAlreadyLinked] = useState(false);
  const { profile } = useProfile();
  const scanning = res => {
    if (res) {
      let found_res = new URL(res.text);
      let bmfq_id = found_res.searchParams.get('bmfqid');
      console.log(found_res);
      if (bmfq_id && found_res.host === 'gnti-at-adypsoe.web.app') {
        setScanResults(found_res.searchParams.get('bmfqid'));
        setIsScanning(false);
      }
    }
  };
  const { height, width } = useScreen();
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
      const stateOfSession = await sessionRef.child('state').once('value');
      console.log(stateOfSession.val());
      if (stateOfSession.val() == 'active') {
        setAlreadyLinked(true);
      }
      setIsLoading(false);
    };
    mn();
  });
  return (
    <>
      <OptionPageBar
        text={'Link a Device to start a Session'}
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
      {!isLoading && !alreadyLinked && isScanning && (
        <Box
          width={appWidth}
          height={height - barH}
          display={'flex'}
          overflowY={'scroll'}
          margin={'auto'}
        >
          <Box
            margin={'auto'}
            width={(appWidth < height - barH ? appWidth : height - barH) - 4}
            height={(appWidth < height - barH ? appWidth : height - barH) - 4}
            overflow={'hidden'}
            display={'flex'}
            justifyContent={'center'}
            border={'2px solid'}
            borderColor={'border.subtle'}
            borderRadius={'30px'}
          >
            <QrScanner
              style={{ height: '100%' }}
              tracker={true}
              onResult={scanning}
              onError={() => {}}
            />
          </Box>
        </Box>
      )}
      {!isLoading && !isScanning && (
        <Box width={appWidth} height={height - barH} margin={'auto'}>
          <AfterScan bmfq={scanRes} height={height - barH} width={appWidth} />
        </Box>
      )}
      {!isLoading && alreadyLinked && (
        <Box
          width={appWidth}
          height={height - barH}
          margin={'auto'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Box margin={'auto'} marginY={'10px'}>
            Already a Session started
          </Box>
          <Box margin={'auto'} marginY={'10px'} fontSize={'small'}>
            Manage it from the {'"Set Session Status"'}
          </Box>
        </Box>
      )}
    </>
  );
};
export default DeviceLink;
