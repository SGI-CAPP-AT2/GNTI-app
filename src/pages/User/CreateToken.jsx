import { Box } from '@primer/react';
import { useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import OptionPageBar from '../../components/OptionPageBar';
import { useNavigate } from 'react-router-dom';
import { useScreen } from '../../context/screen.context';
import TokenForm from '../../components/TokenForm';
const CreateToken = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanRes, setScanResults] = useState(null);
  const scanning = res => {
    if (res) {
      let found_res = new URL(res.text);
      let bmfq_id = found_res.searchParams.get('bmfqid');
      console.log(found_res);
      if (bmfq_id && found_res.host === 'gnti-at-adypsoe.web.app') {
        setScanResults(res.text);
        setIsScanning(false);
      }
    }
  };
  const { height, width } = useScreen();
  const [barH, setBarH] = useState(0);
  const appWidth = width > 750 ? 750 : width - 20;
  const navigate = useNavigate();
  return (
    <>
      <OptionPageBar
        text={'Issue a Token'}
        buttons={true}
        onCancel={() => {
          navigate('/');
        }}
        setAquiredHeight={setBarH}
      />
      <Box
        width={appWidth}
        height={height - barH}
        display={'flex'}
        overflowY={'scroll'}
        margin={'auto'}
      >
        {isScanning && (
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
        )}
        {scanRes && <TokenForm res={scanRes} width={appWidth} />}
      </Box>
    </>
  );
};
export default CreateToken;
