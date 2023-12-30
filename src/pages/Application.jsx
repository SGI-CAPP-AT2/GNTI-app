import { Box } from '@primer/react';
import { useScreen } from '../context/screen.context';
import OptionPageBar from '../components/OptionPageBar';
import { useState } from 'react';
import SectionHomePage from '../components/SectionHomePage';
import {
  GitPullRequestDraftIcon,
  PasskeyFillIcon,
  GitPullRequestClosedIcon,
  CpuIcon,
  LogIcon,
  RepoIcon,
  CodescanCheckmarkIcon,
  CheckIcon,
  UnlinkIcon,
  LinkIcon,
  GitPullRequestIcon,
} from '@primer/octicons-react';
import { View } from '../components/View';
import { useProfile } from '../context/profile.context';
const Application = () => {
  const { height, width } = useScreen();
  const [barH, setBarH] = useState(0);
  const appWidth = width > 750 ? 750 : width - 20;
  const { profile } = useProfile();
  return (
    <>
      <OptionPageBar text="Home" setAquiredHeight={setBarH} />
      <Box width={width} height={height - barH} display={'flex'}>
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
            options={[
              {
                text: 'Issue Token',
                id: 'issue_toke',
                icon: LogIcon,
              },
              {
                text: 'Issued Tokens',
                id: 'hist_tok',
                icon: RepoIcon,
              },
              {
                text: 'Bus Status',
                id: 'status_check',
                icon: CodescanCheckmarkIcon,
              },
            ]}
            onSelect={item => console.log(item)}
          />
          <SectionHomePage
            width={appWidth}
            title={'Bus Management Options'}
            view={View.listView}
            options={[
              {
                text: 'Verify a Token',
                sub: 'verify a issued token',
                icon: CheckIcon,
                id: 'verify_toke',
              },
              {
                text: 'link a device',
                sub: 'start a route journey by linking device',
                icon: LinkIcon,
                id: 'link_dev',
              },
              {
                text: 'set route status',
                sub: 'Change the status of bus & device (Set Current Stop)',
                icon: GitPullRequestIcon,
                id: 'route_state',
              },
            ]}
          />
          {profile.isAdmin && (
            <SectionHomePage
              width={appWidth}
              title={'Admin Options'}
              view={View.listView}
              options={[
                {
                  text: 'Add a route',
                  sub: 'Create a new route & genrate root number',
                  id: 'add_route',
                  icon: GitPullRequestDraftIcon,
                },
                {
                  text: 'Delete a route',
                  sub: 'Discontinue existing route & stop the schedules',
                  id: 'del_route',
                  icon: GitPullRequestClosedIcon,
                },
                {
                  text: 'Set Roles',
                  sub: 'Set roles for different users',
                  id: 'set_role',
                  icon: PasskeyFillIcon,
                },
                {
                  text: 'Setup Device',
                  sub: 'Setup new BMfQ Device',
                  id: 'crt_BMfQ',
                  icon: CpuIcon,
                },
                {
                  text: 'Block a device',
                  sub: 'Immediately block a device',
                  id: 'blck_dev',
                  icon: UnlinkIcon,
                },
              ]}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
export default Application;
