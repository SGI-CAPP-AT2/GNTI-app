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
export const userOptions = [
  {
    text: 'Issue Token',
    id: 'issue_toke',
    icon: LogIcon,
    url: '/user/token',
  },
  {
    text: 'Issued Tokens',
    id: 'hist_tok',
    icon: RepoIcon,
    url: '/user/history',
  },
  {
    text: 'Bus Status',
    id: 'status_check',
    icon: CodescanCheckmarkIcon,
    url: '/user/bus_status',
  },
];
export const verifierOptions = [
  {
    text: 'Verify a Token',
    sub: 'verify a issued token',
    icon: CheckIcon,
    id: 'verify_toke',
    url: '/vr/verify',
  },
  {
    text: 'link a device',
    sub: 'start a route journey by linking device',
    icon: LinkIcon,
    id: 'link_dev',
    url: '/vr/link_device',
  },
  {
    text: 'set session status',
    sub: 'Change the status of bus & device (Set Current Stop)',
    icon: GitPullRequestIcon,
    id: 'route_state',
    url: '/vr/set_status',
  },
];
export const adminOptions = [
  {
    text: 'Add a route',
    sub: 'Create a new route & genrate root number',
    id: 'add_route',
    icon: GitPullRequestDraftIcon,
    url: '/admin/add_route',
  },
  {
    text: 'Delete a route',
    sub: 'Discontinue existing route & stop the schedules',
    id: 'del_route',
    icon: GitPullRequestClosedIcon,
    url: '/admin/delete_route',
  },
  {
    text: 'Set Roles',
    sub: 'Set roles for different users',
    id: 'set_role',
    icon: PasskeyFillIcon,
    url: '/admin/set_role',
  },
  {
    text: 'Setup Device',
    sub: 'Setup new BMfQ Device',
    id: 'crt_BMfQ',
    icon: CpuIcon,
    url: '/admin/set_device',
  },
];
