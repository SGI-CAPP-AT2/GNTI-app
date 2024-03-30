import { Box } from '@primer/react';
import { CheckCircleFillIcon, XCircleFillIcon } from '@primer/octicons-react';
const ValidateUi = ({ data, width }) => {
  const { valid } = data;
  if (!valid)
    return (
      <Box
        width={width}
        display={'flex'}
        flexDirection={'column'}
        marginTop={40}
      >
        <Box margin={'auto'}>
          <XCircleFillIcon size={80} />
        </Box>
        <Box margin={'auto'} marginTop={4}>
          Invalid Token : {data.message}
        </Box>
      </Box>
    );
  return (
    <Box width={width} display={'flex'} flexDirection={'column'} marginTop={40}>
      <Box margin={'auto'}>
        <CheckCircleFillIcon size={80} />
      </Box>
      <Box margin={'auto'} marginTop={4}>
        Valid Token
      </Box>
      Token Information:
      <ul>
        <li>
          Destination :
          <ul>
            <li>Stop: {data.destinationStop.name}</li>
            <li>Fair: {data.destinationStop.fair}</li>
          </ul>
        </li>
        <li>
          Date & Time :
          <ul>
            <li>Time: {new Date(data.time).toLocaleTimeString()}</li>
            <li>Date: {new Date(data.time).toLocaleDateString()}</li>
          </ul>
        </li>
        <li>
          Route:
          <ul>
            <li>Number: {data.route}</li>
            <li>Name: {data.name}</li>
          </ul>
        </li>
      </ul>
    </Box>
  );
};
export default ValidateUi;
