import { Box } from '@primer/react';
import { useScreen } from '../context/screen.context';
import OptionPageBar from '../components/OptionPageBar';
import { useState } from 'react';
import SectionHomePage from '../components/SectionHomePage';
import { View } from '../components/View';
import { useProfile } from '../context/profile.context';
import { adminOptions, userOptions, verifierOptions } from './ApplicationUrls';
const Application = () => {
  const { height, width } = useScreen();
  const [barH, setBarH] = useState(0);
  const appWidth = width > 750 ? 750 : width - 20;
  const { profile } = useProfile();
  return (
    <>
      <OptionPageBar text="Home" setAquiredHeight={setBarH} />
      <Box
        width={width}
        height={height - barH}
        display={'flex'}
        overflowY={'scroll'}
      >
        <Box
          width={appWidth}
          marginLeft="auto"
          marginRight="auto"
          marginTop={20}
        >
          <SectionHomePage
            width={appWidth}
            title={'User Options'}
            view={View.gridView}
            options={userOptions}
          />
          <SectionHomePage
            width={appWidth}
            title={'Bus Management Options'}
            view={View.listView}
            options={verifierOptions}
          />
          {profile.isAdmin && (
            <SectionHomePage
              width={appWidth}
              title={'Admin Options'}
              view={View.listView}
              options={adminOptions}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
export default Application;
