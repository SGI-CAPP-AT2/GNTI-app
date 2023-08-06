import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../context/profile.context';

const PrivateRoutes = () => {
  const { profile } = useProfile();
  return profile ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
