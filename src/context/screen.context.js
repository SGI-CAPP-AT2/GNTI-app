import { createContext, useContext, useEffect, useState } from 'react';

const ScreenContext = createContext();
export const ScreenProvider = ({ navHeight, children }) => {
  const [availableSize, setAvailableSize] = useState({
    height: Math.abs(window.innerHeight - navHeight),
    width: window.innerWidth,
  });
  useEffect(() => {
    const listener = () => {
      setAvailableSize({
        height: Math.abs(window.innerHeight - navHeight),
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  });
  return (
    <ScreenContext.Provider value={availableSize}>
      {children}
    </ScreenContext.Provider>
  );
};
export const useScreen = () => useContext(ScreenContext);
