import { Box, Spinner } from '@primer/react';

const Loader = ({ width }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      width={width || 'auto'}
      marginTop={width ? 0 : 5}
    >
      <Spinner
        size="large"
        sx={{
          margin: 'auto',
        }}
      />
    </Box>
  );
};
export default Loader;
