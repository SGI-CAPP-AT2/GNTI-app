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
import NewToken from './pages/User/NewToken';
import Document from './pages/docs/Document';

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
                <Route path="/user/newtoken" element={<NewToken />} />
              </Route>
              <Route element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/docs/:docname" element={<Document />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </CommonLayout>
        </ProfileProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
