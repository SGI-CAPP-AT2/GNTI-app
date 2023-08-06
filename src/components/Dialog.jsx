import styled from 'styled-components';
import { Dialog as PrimerDialog } from '@primer/react';
export const Dialog = styled(PrimerDialog)`
  top: 10px;
  @media (max-width: 750px) {
    height: auto !important;
    width: calc(100vw - 20px);
  }
`;
