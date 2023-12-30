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
];
export const verifierOptions = [
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
];
export const adminOptions = [
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
];
