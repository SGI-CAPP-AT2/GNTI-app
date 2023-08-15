import { Box, Text } from '@primer/react';
const renderValue = (type, value, props) => {};
const Config = ({ type, name, value, props }) => {
  return (
    <Box display={'flex'}>
      <Text>{name}</Text>
      <Box marginLeft={'auto'}>{renderValue(type, value, props)}</Box>
    </Box>
  );
};
export default Config;
