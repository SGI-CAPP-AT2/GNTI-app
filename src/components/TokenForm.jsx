import { Box, Button, FormControl, Radio, RadioGroup } from '@primer/react';
import { functions } from '../firebase/firebaseapp';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import styled from 'styled-components';
import { useProfile } from '../context/profile.context';
import { useNavigate } from 'react-router-dom';
const ControlBox = styled(Box)`
  margin: 5px;
`;
const TokenForm = ({ res, width }) => {
  const [result, setResults] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [destIndex, setDestIndex] = useState(-1);
  const [submitState, setSubmitState] = useState(false);
  const [fair, setFair] = useState(null);
  const { profile } = useProfile();
  const navigate = useNavigate();
  const onSubmit = () => {
    if (destIndex !== -1) {
      setIsFetching(true);
      let getFair = functions.httpsCallable('submitDestForFair');
      getFair({
        destination_index: destIndex,
      }).then(res => {
        setFair(res.data);
        setSubmitState(true);
        setIsFetching(false);
      });
    }
  };
  const setDestChoice = e => {
    setDestIndex(e);
  };
  const submitPayment = async () => {
    setIsFetching(true);
    const resp = await fetch('https://gatewayverify-nycezhdh5a-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: profile.uid, verifiedPayment: fair }),
    });
    const text = await resp.text();
    setIsFetching(false);
    console.log(text);
    if (text == 'successful') {
      navigate('/user/history');
    } else {
      navigate('/user/pg/unsuccessful');
    }
  };
  try {
    useEffect(() => {
      let found_res = new URL(res);
      let bmfq_id = found_res.searchParams.get('bmfqid');
      let startIssueSession = functions.httpsCallable('startIssueSession');
      startIssueSession({ bmfq_id }).then(res => {
        setIsFetching(false);
        setResults(res);
        console.log(res);
      });
      return () => {};
    }, [res]);
    return (
      <Box display={'flex'}>
        {isFetching ? (
          <Box margin={'auto'}>
            <Loader width={width} />
          </Box>
        ) : !submitState ? (
          <Box display={'flex'} flexDirection={'column'} width={width}>
            <ControlBox>
              Issue Token for <b>{result.data.routeName}</b>
            </ControlBox>
            <ControlBox>
              Your Sign in Bus Stop: <b>{result.data.current.name}</b>
            </ControlBox>
            <ControlBox>
              <RadioGroup name="choiceGroup" onChange={setDestChoice}>
                <RadioGroup.Label>Choose the destination: </RadioGroup.Label>
                {result.data.availableDest.map(({ name, fair }, index) => (
                  <FormControl key={fair}>
                    <Radio value={index} />
                    <FormControl.Label>{name}</FormControl.Label>
                  </FormControl>
                ))}
              </RadioGroup>
            </ControlBox>
            {destIndex != -1 && (
              <ControlBox>
                Estimated Fair Price:{' '}
                {result.data.availableDest[destIndex].fair -
                  result.data.current.fair}
                rs
              </ControlBox>
            )}
            <ControlBox display={'flex'}>
              <Box margin={'auto'}>
                <Button onClick={onSubmit}>Submit</Button>
              </Box>
            </ControlBox>
          </Box>
        ) : (
          <Box display={'flex'} flexDirection={'column'} width={width}>
            <ControlBox>Fake Payment Gateway Page</ControlBox>
            <ControlBox> Payment Page for fair : {fair}rs </ControlBox>
            <ControlBox display={'flex'}>
              <Box margin={'auto'}>
                <Button margin="auto" onClick={submitPayment}>
                  Call Callback URL to Verify
                </Button>
              </Box>
            </ControlBox>
          </Box>
        )}
      </Box>
    );
  } catch (e) {
    console.log(e);
    return (
      <Box margin={'auto'}>
        Error Occured:
        <pre>
          1. Check the QR Code you scanned <br />
          2. Check if the session is started on the QR Device <br />
          3. If you think it{"'"}s System Error, Report it to Representative.
        </pre>
      </Box>
    );
  }
};
export default TokenForm;
