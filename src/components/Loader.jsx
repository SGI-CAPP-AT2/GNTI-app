import { Box, Spinner } from '@primer/react';

const Loader = () => {
  return (
    <Box display="flex" alignItems="center">
      <Spinner
        size="large"
        sx={{
          margin: 'auto',
          marginTop: 5,
        }}
      />
    </Box>
  );
};
export default Loader;
