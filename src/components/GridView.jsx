import { Box, Octicon, Text } from '@primer/react';
import { useNavigate } from 'react-router-dom';
const GridView = ({ width, list }) => {
  const navigate = useNavigate();
  return (
    <Box
      width={width - 4}
      display={'grid'}
      gridTemplateColumns={'auto auto auto'}
      padding={2}
    >
      {list.map(({ id, icon, text, url }) => (
        <Box
          onClick={() => {
            navigate(url);
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
