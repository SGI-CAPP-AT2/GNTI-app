import { InfoIcon } from '@primer/octicons-react';
import {
  Avatar,
  AvatarStack,
  Box,
  IconButton,
  Text,
  Link,
} from '@primer/react';
import { useModal } from '../hooks/useModal';
import { Dialog } from './Dialog';
const InfoBtnDialog = () => {
  const { open, close, isOpen } = useModal();
  return (
    <>
      <IconButton icon={InfoIcon} onClick={open} />
      <Dialog isOpen={isOpen} onDismiss={close} aria-labelledby="header-id">
        <Dialog.Header id="header-id">Project Details</Dialog.Header>
        <Box p={3}>
          <Text>
            This is Project created at{' '}
            <strong>
              Ajeenkya DY Patil School of engineering (Polytechnic)
            </strong>{' '}
            as a part of curriculum of CO5I & CO6I (MSBTE) of Diploma in{' '}
            <strong>Computer Engineering</strong>
            <AvatarStack alignRight>
              <Link href="https://github.com/SGI-CAPP-AT2">
                <Avatar
                  alt="Shubham Ingale"
                  src="https://avatars.githubusercontent.com/SGI-CAPP-AT2"
                />
              </Link>
              <Link href="https://github.com/Shirish456">
                <Avatar
                  alt="Shirish456"
                  src="https://avatars.githubusercontent.com/Shirish456"
                />
              </Link>
              <Avatar
                alt="Atom"
                src="https://avatars.githubusercontent.com/atom"
              />
              <Avatar
                alt="Desktop"
                src="https://avatars.githubusercontent.com/desktop"
              />
            </AvatarStack>
          </Text>
        </Box>
      </Dialog>
    </>
  );
};
export default InfoBtnDialog;
