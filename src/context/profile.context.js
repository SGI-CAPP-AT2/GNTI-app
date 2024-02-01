import { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../firebase/firebaseapp';

const ProfileContext = createContext();
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let userRef;
    const authUnsub = auth.onAuthStateChanged(async authObj => {
      if (authObj) {
        //(authObj);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        const idTokenRes = await authObj.getIdTokenResult();
        userRef.on('value', snap => {
          const { createdAt, name } = snap.val();
          const data = {
            uid: authObj.uid,
            email: authObj.email,
            avatar: authObj.photoURL,
            name,
            createdAt,
            isAdmin: idTokenRes.claims.admin,
            isVerifier: idTokenRes.claims.verifier,
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
  const signOut = () => {
    auth.signOut();
  };
  return (
    <ProfileContext.Provider value={{ profile, isLoading, signOut }}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => {
  return useContext(ProfileContext);
};
