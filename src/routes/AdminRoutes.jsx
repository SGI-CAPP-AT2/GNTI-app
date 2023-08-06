import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../context/profile.context';

const AdminRoutes = () => {
  const { profile } = useProfile();
  return profile.isAdmin ? <Outlet /> : <Navigate to="/" />;
};
export default AdminRoutes;
