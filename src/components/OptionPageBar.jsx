import { Box, IconButton, Text } from '@primer/react';
import { CheckIcon, XIcon } from '@primer/octicons-react';
import { useEffect, useRef } from 'react';
const OptionPageBar = ({
  text,
  onDone,
  onCancel,
  buttons,
  setAquiredHeight,
}) => {
  const boxRef = useRef(null);
  console.log(setAquiredHeight);
  useEffect(() => {
    setAquiredHeight(boxRef.current.offsetHeight);
  }, [boxRef, setAquiredHeight]);
  return (
    <Box
      display={'flex'}
      padding={2}
      background="canvas.muted"
      borderBottom="1px solid"
      borderBottomColor="border.subtle"
      ref={boxRef}
    >
      {buttons && onCancel && (
        <IconButton variant="danger" onClick={onCancel} icon={XIcon} />
      )}
      <Box margin={'auto'}>
        <Text>{text}</Text>
      </Box>
      {buttons && onDone && (
        <IconButton variant="outline" onClick={onDone} icon={CheckIcon} />
      )}
    </Box>
  );
};
export default OptionPageBar;
