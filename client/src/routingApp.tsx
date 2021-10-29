// import "bootstrap/dist/css/bootstrap.min.css";
import "./components/components.scss";
import React, { useEffect, useState } from "react";
import store from "./redux/store";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { RootState } from "redux/rootReducer";

import EntryView from "./components/views/entryView";

import CustomizeMenuPresenter from "./components/presenters/customizeMenuPresenter";
import HandleUserLogIn from "./components/presenters/handleUserLogIn";
import AdminViewDrinkOrdersPresenter from "./components/presenters/adminViewDrinkOrdersPresenter";
import { HandleUserSignUp } from "./components/presenters/handleUserSignUp";
import MainNavbar from "./components/views/mainNavbar";
import userMenuPresenter from "./components/presenters/userMenuPresenter";
import { connect } from "react-redux";
import userProfilePresenter from "./components/presenters/userProfilePresenter";
import orderPresenter from "./components/presenters/orderPresenter";
import UserModel from "./model/userModel";

const userModel = new UserModel();

const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route
    path={path}
    render={(props) =>
      store.getState().user.loggedIn ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const AdminRoute = ({ component: Component, path, ...rest }) => (
  <Route
    path={path}
    render={(props) =>
      store.getState().user.loggedIn && store.getState().user.isAdmin ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const PublicRoute = ({ component: Component, pathName, path, ...rest }) => (
  <Route
    path={path}
    render={(props) =>
      store.getState().user.loggedIn ? (
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
        <MainNavbar setPathName={(newPath) => setPathName(newPath)} />
      ) : null}
      <Switch>
        <AdminRoute
          exact
          path="/customizeMenu"
          component={CustomizeMenuPresenter}
        />
        <AdminRoute
          exact
          path="/vieworders"
          component={AdminViewDrinkOrdersPresenter}
          socket={socket}
        />
        <PrivateRoute exact path="/menu" component={userMenuPresenter} />
        <PrivateRoute
          exact
          path="/profile"
          component={userProfilePresenter}
          socket={socket}
        />
        <PrivateRoute
          exact
          path="/order"
          component={orderPresenter}
          socket={socket}
        />
        <PublicRoute
          exact
          path="/logIn"
          component={HandleUserLogIn}
          pathName={pathName}
        />
        <PublicRoute
          exact
          path="/signUp"
          component={HandleUserSignUp}
          pathName={pathName}
        />
        <PublicRoute path="/" component={EntryView} pathName={pathName} />
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
