import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import CommonLayout from './components/CommonLayout';
import { ThemeProvider } from '@primer/react';
import { ProfileProvider } from './context/profile.context';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';
import VerifierRoutes from './routes/VerifierRoutes';
import LazyLoad from './components/LazyLoad';

const CreateToken = lazy(() => import('./pages/User/CreateToken'));
const Document = lazy(() => import('./pages/docs/Document'));
const History = lazy(() => import('./pages/User/History'));
const BusStatus = lazy(() => import('./pages/User/BusStatus'));
const Verify = lazy(() => import('./pages/Verifier/Verify'));
const DeviceLink = lazy(() => import('./pages/Verifier/DeviceLink'));
const SetStatus = lazy(() => import('./pages/Verifier/SetStatus'));
const AddRoute = lazy(() => import('./pages/Admin/AddRoute'));
const DeleteRoute = lazy(() => import('./pages/Admin/DeleteRoute'));
const SetRole = lazy(() => import('./pages/Admin/SetRole'));
const SetDevice = lazy(() => import('./pages/Admin/SetDevice'));
const BlockDevice = lazy(() => import('./pages/Admin/BlockDevice'));
const Login = lazy(() => import('./pages/Login'));
const Application = lazy(() => import('./pages/Application'));

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider colorMode="auto">
        <ProfileProvider>
          <CommonLayout>
            <Routes>
              <Route element={<LazyLoad element={<PrivateRoutes />} />}>
                <Route element={<AdminRoutes />}>
                  <Route path="/admin/add_route" element={<AddRoute />} />
                  <Route path="/admin/delete_route" element={<DeleteRoute />} />
                  <Route path="/admin/set_role" element={<SetRole />} />
                  <Route path="/admin/set_device" element={<SetDevice />} />
                  <Route path="/admin/block_device" element={<BlockDevice />} />
                </Route>
                <Route element={<VerifierRoutes />}>
                  <Route path="/vr/verify" element={<Verify />} />
                  <Route path="/vr/link_device" element={<DeviceLink />} />
                  <Route path="/vr/set_status" element={<SetStatus />} />
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
    </BrowserRouter>
  );
}

export default App;
