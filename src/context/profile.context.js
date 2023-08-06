import { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../firebase/firebaseapp';

const ProfileContext = createContext();
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let userRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        console.log(authObj);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { createdAt, name, isAdmin = null } = snap.val();
          const data = {
            uid: authObj.uid,
            email: authObj.email,
            avatar: authObj.photoURL,
            name,
            createdAt,
            isAdmin,
          };
          setProfile(data);
          setIsLoading(false);
        });
      } else {
        if (userRef) userRef.off();
        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      authUnsub();
      if (userRef) userRef.off();
    };
  }, []);
  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => {
  return useContext(ProfileContext);
};
