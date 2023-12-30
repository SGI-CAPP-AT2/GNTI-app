import { Box, Text } from '@primer/react';
import ListView from './ListView';
import { View } from './View';
import GridView from './GridView';
const SectionHomePage = ({ title, width, options, view }) => {
  return (
    <Box width={width - 20} padding={2} borderRadius={2} marginBottom={2}>
      <Text fontSize={16}>{title}</Text>
      <Box height={10}></Box>
      {view == View.listView && <ListView width={width - 20} list={options} />}
      {view == View.gridView && <GridView width={width - 20} list={options} />}
    </Box>
  );
};
export default SectionHomePage;
