import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import AuthState from "./contexts/auth/AuthState";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Onboarding from "./components/Onboarding";

function App() {
  return (
    <AuthState>
      <Router>
        <div className="app-container">
          {/* <Navbar /> */}
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/" component={Profile} />
            <PrivateRoute exact path="/" component={Onboarding} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </AuthState>
  );
}

export default App;
