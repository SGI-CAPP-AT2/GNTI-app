import { useNavigate } from 'react-router-dom';
import OptionPageBar from '../../components/OptionPageBar';
import { useScreen } from '../../context/screen.context';
import { useState } from 'react';
import { Box, Button, TextInput } from '@primer/react';
import ListView from '../../components/ListView';
import { GitCommitIcon } from '@primer/octicons-react';
import Loader from '../../components/Loader';
const BusStatus = () => {
  const { width } = useScreen();
  const [_, setBarH] = useState(0);
  const [searchRes, setSearchResults] = useState(null);
  const [searchInputVal, setSearchInputVal] = useState('');
  const [lastQuery, setLastQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const appWidth = width > 750 ? 750 : width - 20;
  const navigate = useNavigate();
  const search = async () => {
    setIsLoading(true);
    const res = await fetch(
      'http://127.0.0.1:5001/gnti-at-adypsoe/us-central1/busApi?q=' +
        searchInputVal
    );
    setLastQuery(searchInputVal);
    const json__sr = await res.json();
    setSearchResults(json__sr);
    setIsLoading(false);
  };
  if (searchRes) console.log(searchRes, searchRes.length, 0);
  return (
    <>
      <OptionPageBar
        text={'Search for Bus'}
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
        <Box
          display={'flex'}
          margin={'auto'}
          marginTop={'10px'}
          marginBottom={'10px'}
        >
          <TextInput
            value={searchInputVal}
            placeholder="Search..."
            onChange={value => setSearchInputVal(value.currentTarget.value)}
          />
          <Box width={10}></Box>
          <Button onClick={search}>Go</Button>
        </Box>
        {!isLoading && (
          <>
            {searchRes && searchRes.length > 0 ? (
              <Box width={appWidth - 10} overflow={'scroll'} margin={'auto'}>
                <ListView
                  width={appWidth - 20}
                  list={searchRes.map(({ route, current, name }) => {
                    return {
                      id: current + name,
                      text: route + ' ' + name,
                      sub: 'currently at: ' + current.name,
                      icon: GitCommitIcon,
                    };
                  })}
                />
              </Box>
            ) : lastQuery && searchRes ? (
              <Box margin={'auto'}>No Search Results of `{lastQuery}`</Box>
            ) : (
              <Box margin={'auto'}>Please Enter Query</Box>
            )}
          </>
        )}
        {isLoading && <Loader />}
      </Box>
    </>
  );
};
export default BusStatus;
