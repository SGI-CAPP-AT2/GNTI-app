import { Box, Text } from '@primer/react';
import Config from './Config';

const Group = ({ groupName, groupConfigs = [] }) => {
  return (
    <Box>
      <Box>
        <Text>{groupName}</Text>
      </Box>
      {groupConfigs.map(config => {
        return <Config {...config} key={config.name} />;
      })}
    </Box>
  );
};
export default Group;
