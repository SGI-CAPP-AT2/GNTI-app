import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../context/profile.context';

const VerifierRoutes = () => {
  const { profile } = useProfile();
  return profile.isAdmin || profile.isVerifier ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default VerifierRoutes;
