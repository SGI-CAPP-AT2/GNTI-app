import { Box } from '@primer/react';
import Group from './Group';

const SuperGroup = ({ configState = [] }) => {
  return (
    <Box>
      {configState.map(group => {
        return <Group {...group} key={group.groupName} />;
      })}
    </Box>
  );
};
export default SuperGroup;
