import { Box, Octicon, Text } from '@primer/react';
const GridView = ({ width, list, onItemClick }) => {
  return (
    <Box
      width={width - 4}
      display={'grid'}
      gridTemplateColumns={'auto auto auto'}
      padding={2}
    >
      {list.map(({ id, icon, text }) => (
        <Box
          onClick={() => {
            onItemClick(id);
            console.log('clicked');
          }}
          key={id}
          margin={'auto'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Box width={40} display={'flex'} margin={'auto'}>
            <Box margin={'auto'}>
              <Octicon icon={icon} size={24} />
            </Box>
          </Box>
          <Box margin={'auto'}>
            <Text fontSize={12} padding={1}>
              {text}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default GridView;
