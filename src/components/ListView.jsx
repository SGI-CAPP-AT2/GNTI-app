import { Box, Octicon, Text } from '@primer/react';

const ListView = ({ width, list }) => {
  return (
    <Box width={width}>
      {list.map(({ id, icon, text, sub }) => (
        <Box key={id} width={width - 10} display={'flex'} margin={'5px'}>
          <Box width={40} display={'flex'}>
            <Box margin={'auto'}>
              <Octicon icon={icon} size={24} />
            </Box>
          </Box>
          <Box
            width={0.8 * width}
            textAlign={'left'}
            display={'flex'}
            flexDirection={'column'}
          >
            <Text padding={1}>{text}</Text>
            <Text padding={1} fontSize={12} color={'fg.muted'}>
              {sub}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default ListView;
