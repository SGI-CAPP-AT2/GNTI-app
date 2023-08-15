import { useScreen } from '../context/screen.context';
import OptionPageBar from '../components/OptionPageBar';
import { useState } from 'react';
import { Box } from '@primer/react';
const Configure = () => {
  const { width, height } = useScreen();
  const [aqHieght, setAqHeight] = useState(0);
  return (
    <Box height={height} width={width}>
      <OptionPageBar
        buttons={true}
        onCancel={() => {
          console.log('Cancel');
        }}
        onDone={() => {
          console.log('Success');
        }}
        text="Configure"
        setAquiredHeight={setAqHeight}
      />
      <Box height={`calc(${height}px - ${aqHieght}px)`} padding={2}></Box>
    </Box>
  );
};
export default Configure;
