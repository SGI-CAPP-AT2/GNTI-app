import { Box, Octicon, Text } from '@primer/react';
import { useNavigate } from 'react-router-dom';

const ListView = ({ width, list, onItemClick }) => {
  const navigate = useNavigate();
  return (
    <Box width={width}>
      {list.map(({ id, icon, text, sub, url }) => (
        <Box
          key={id}
          width={width - 10}
          display={'flex'}
          margin={'5px'}
          onClick={() => {
            navigate(url);
          }}
        >
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
