import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  UserListPage,
} from "./pages";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" component={UserListPage} />
      <Redirect from="/" to="/home" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
