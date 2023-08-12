import { Link as RouterLink } from 'react-router-dom';
import { Link as PrimerLink } from '@primer/react';
const Link = ({ to, children }) => {
  return (
    <RouterLink to={to}>
      <PrimerLink>{children}</PrimerLink>
    </RouterLink>
  );
};
export default Link;
