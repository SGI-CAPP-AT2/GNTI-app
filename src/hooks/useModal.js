import { useCallback, useState } from 'react';

export const useModal = (defaultVale = false) => {
  const [isOpen, setIsOpen] = useState(defaultVale);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return { isOpen, open, close };
};
