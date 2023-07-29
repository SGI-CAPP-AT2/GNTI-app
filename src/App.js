import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoggedInRoute from './routes/LoggedInRoute';
import Dashboard from './pages/Dashboard';
import NonLoggedInRoute from './routes/NonLoggedInRoute';
import Login from './pages/Login';
import CommonLayout from './components/CommonLayout';
import { ThemeProvider } from '@primer/react';
import { ProfileProvider } from './context/profile.context';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider colorMode="auto">
        <ProfileProvider>
          <CommonLayout>
            <Switch>
              <LoggedInRoute path="/app">
                <Dashboard />
              </LoggedInRoute>
              <NonLoggedInRoute path="/login">
                <Login />
              </NonLoggedInRoute>
              <Route path="*">
                <Redirect to="/app" />
              </Route>
            </Switch>
          </CommonLayout>
        </ProfileProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
