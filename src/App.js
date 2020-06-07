import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components
import Login from "./component/login/login";
import Dashboard from "./component/dashbord/dashboard";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
