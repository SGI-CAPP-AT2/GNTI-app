import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoggedInRoute from "./routes/LoggedInRoute";
import Dashboard from "./pages/Dashboard";
import NonLoggedInRoute from "./routes/NonLoggedInRoute";
import Login from "./pages/Login";

function App() {
  return (  
    <BrowserRouter>
      <Switch>
        <LoggedInRoute path="/app">
          <Dashboard/>
        </LoggedInRoute>
        <NonLoggedInRoute path="/login">
          <Login/>
        </NonLoggedInRoute>
        <Route path="*">
          <Redirect to="/app"/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
