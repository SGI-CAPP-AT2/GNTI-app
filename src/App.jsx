import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import CommonLayout from './components/CommonLayout';
import { ThemeProvider } from '@primer/react';
import { ProfileProvider } from './context/profile.context';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';
import CreateToken from './pages/User/CreateToken';
import Document from './pages/docs/Document';
import LazyLoad from './components/LazyLoad';
import History from './pages/User/History';
import BusStatus from './pages/User/BusStatus';
import VerifierRoutes from './routes/VerifierRoutes';
import Verify from './pages/Verifier/Verify';
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Admin/Dashboard'));
const Application = React.lazy(() => import('./pages/Application'));
function App() {
  return (
    <HashRouter>
      <ThemeProvider colorMode="auto">
        <ProfileProvider>
          <CommonLayout>
            <Routes>
              <Route element={<LazyLoad element={<PrivateRoutes />} />}>
                <Route element={<AdminRoutes />}>
                  <Route path="/admin" element={<Dashboard />} />
                </Route>
                <Route element={<VerifierRoutes />}>
                  <Route path="/vr/verify" element={<Verify />} />
                </Route>
                <Route path="/" element={<Application />} />
                <Route path="/user/token" element={<CreateToken />} />
                <Route path="/user/history" element={<History />} />
                <Route path="/user/bus_status" element={<BusStatus />} />
              </Route>
              <Route element={<LazyLoad element={<PublicRoutes />} />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route
                path="/docs/:docname"
                element={<LazyLoad element={<Document />} />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </CommonLayout>
        </ProfileProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
