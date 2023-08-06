import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../context/profile.context';

const PublicRoutes = () => {
  const { profile } = useProfile();
  return !profile ? <Outlet /> : <Navigate to="/" />;
};
export default PublicRoutes;
