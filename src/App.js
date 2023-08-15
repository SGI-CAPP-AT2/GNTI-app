import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Login';
import CommonLayout from './components/CommonLayout';
import { ThemeProvider } from '@primer/react';
import { ProfileProvider } from './context/profile.context';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import Application from './pages/Application';
import AdminRoutes from './routes/AdminRoutes';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <HashRouter>
      <ThemeProvider colorMode="auto">
        <ProfileProvider>
          <CommonLayout>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route element={<AdminRoutes />}>
                  <Route path="/admin" element={<Dashboard />} />
                </Route>
                <Route path="/" element={<Application />} />
              </Route>
              <Route element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/prpo" element={<PrivacyPolicy />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </CommonLayout>
        </ProfileProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
