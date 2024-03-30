import { useState } from 'react';
import { useScreen } from '../../context/screen.context';
import { useNavigate } from 'react-router-dom';
import OptionPageBar from '../../components/OptionPageBar';
import { Box, Button, TextInput } from '@primer/react';
import Loader from '../../components/Loader';
import ValidateUi from './components/ValidateUi';
import { functions } from '../../firebase/firebaseapp';

const Verify = () => {
  const { width } = useScreen();
  const [_, setBarH] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const appWidth = width > 750 ? 750 : width - 20;
  const navigate = useNavigate();
  const [vdNum, setVdNum] = useState('');
  const [bmfqNum, setBmfqNum] = useState('');
  const [validateData, setValidateData] = useState(null);
  const validate = async () => {
    setIsLoading(true);
    let callable = functions.httpsCallable('validateUserToken');
    let res = await callable({
      token_id: vdNum,
      bmfq_id: bmfqNum,
    });
    console.log(res.data);
    setValidateData(res.data);
    setIsLoading(false);
  };
  console.log(validateData);
  return (
    <>
      <OptionPageBar
        text={'Verify a Printed Token'}
        buttons={true}
        onCancel={() => {
          navigate('/');
        }}
        setAquiredHeight={setBarH}
      />
      <Box
        display={'flex'}
        width={appWidth}
        margin={'auto'}
        flexDirection={'column'}
      >
        {isLoading && isLoading && <Loader />}
        {!isLoading && (
          <>
            <Box
              display={'flex'}
              margin={'auto'}
              marginTop={'10px'}
              marginBottom={'10px'}
            >
              <TextInput
                value={bmfqNum}
                placeholder="Bmfq Id"
                onChange={value => setBmfqNum(value.currentTarget.value)}
                type="number"
              />
              <Box width={10}></Box>
              <TextInput
                value={vdNum}
                placeholder="Validation Id"
                onChange={value => setVdNum(value.currentTarget.value)}
                type="number"
              />

              <Box width={10}></Box>
              <Button onClick={validate}>Check</Button>
            </Box>
            {validateData && (
              <ValidateUi data={validateData} width={appWidth} />
            )}
          </>
        )}
      </Box>
    </>
  );
};
export default Verify;
