// import "bootstrap/dist/css/bootstrap.min.css";
import "./components/components.scss";
import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import EntryPresenter from "./components/presenters/entryPresenter";
import CustomizeMenuPresenter from "./components/presenters/customizeMenuPresenter";
import HandleUserLogIn from "./components/presenters/handleUserLogIn";
import AdminViewDrinkOrdersPresenter from "./components/presenters/adminViewDrinkOrdersPresenter";
import HandleUserSignUp from "./components/presenters/handleUserSignUp";
import NavbarPresenter from "./components/presenters/navbarPresenter";
import userMenuPresenter from "./components/presenters/userMenuPresenter";
import userProfilePresenter from "./components/presenters/userProfilePresenter";
import orderPresenter from "./components/presenters/orderPresenter";
import UserModel from "./model/userModel";

const userModel = new UserModel();

const PrivateRoute = ({ component: Component, path, user, ...rest }) => (
  <Route
    path={path}
    render={(props) =>
      user.loggedIn ? <Component {...props} {...rest} /> : <Redirect to="/" />
    }
  />
);

const AdminRoute = ({ component: Component, path, user, ...rest }) => (
  <Route
    path={path}
    render={(props) =>
      user.loggedIn && user.isAdmin ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const PublicRoute = ({
  component: Component,
  pathName,
  path,
  user,
  ...rest
}) => (
  <Route
    path={path}
    render={(props) =>
      user.loggedIn ? (
        <Redirect to={pathName == null ? "/" : pathName} />
      ) : (
        <Component {...props} {...rest} />
      )
    }
  />
);

const RoutingApp = ({ socket, user, checkValidUser }) => {
  const [pathName, setPathName] = useState("/");

  window.onbeforeunload = () => {
    localStorage.setItem("pathname", window.location.pathname);
  };

  useEffect(() => {
    checkValidUser();
    window.onload = () => {
      const pathname = localStorage.getItem("pathname");
      if (pathname !== null) {
        setPathName(pathname);
      }
    };
  }, []);

  return (
    <Router>
      {user.loggedIn || user.isAdmin ? (
        <NavbarPresenter setPathName={setPathName} />
      ) : null}
      <Switch>
        <AdminRoute
          exact
          path="/customizeMenu"
          component={CustomizeMenuPresenter}
          user={user}
        />
        <AdminRoute
          exact
          path="/vieworders"
          component={AdminViewDrinkOrdersPresenter}
          socket={socket}
          user={user}
        />
        <PrivateRoute
          exact
          path="/menu"
          component={userMenuPresenter}
          user={user}
        />
        <PrivateRoute
          exact
          path="/profile"
          component={userProfilePresenter}
          socket={socket}
          user={user}
        />
        <PrivateRoute
          exact
          path="/order"
          component={orderPresenter}
          socket={socket}
          user={user}
        />
        <PublicRoute
          exact
          path="/logIn"
          component={HandleUserLogIn}
          pathName={pathName}
          user={user}
        />
        <PublicRoute
          exact
          path="/signUp"
          component={HandleUserSignUp}
          pathName={pathName}
          user={user}
        />
        <PublicRoute
          path="/"
          component={EntryPresenter}
          pathName={pathName}
          user={user}
        />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkValidUser: () => dispatch(userModel.checkValidUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutingApp);
