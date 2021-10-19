// import "bootstrap/dist/css/bootstrap.min.css";
import "./components/components.scss";
import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "redux/rootReducer";

import EntryView from "./components/views/entryView";

import CustomizeMenuPresenter from "./components/presenters/customizeMenuPresenter";
import HandleUserSignIn from "./components/presenters/handleUserSignIn";
import DrinkModel from "./model/drinkModel";
import { searchTypes } from "./constants/searchTypes";
import AdminViewDrinkOrdersPresenter from "./components/presenters/adminViewDrinkOrdersPresenter";
import { HandleUserSignUp } from "./components/presenters/handleUserSignUp";
import MainNavbar from "./components/views/mainNavbar";
import { signIn, signOut } from "./redux/actions/user";
import userMenuPresenter from "./components/presenters/userMenuPresenter";
import { useSelector } from "react-redux";
import userProfilePresenter from "./components/presenters/userProfilePresenter";

const drinkModel = new DrinkModel();

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

const PublicRoute = ({ component: Component, path, pathName, ...rest }) => (
  <Route
    path={path}
    render={(props) =>
      store.getState().user.loggedIn ? (
        !store.getState().user.isAdmin ? (
          <Redirect to={pathName == null ? "/" : pathName} />
        ) : (
          <Redirect to="/customizeMenu" />
        )
      ) : (
        // TODO what is first page?
        <Component {...props} {...rest} />
      )
    }
  />
);

const RoutingApp = () => {
  const user = useSelector((state: RootState) => {
    return state.user;
  });

  const [pathName, setPathName] = useState("/");

  window.onbeforeunload = () => {
    localStorage.setItem("pathname", window.location.pathname);
  };

  useEffect(() => {
    window.onload = () => {
      const pathname = localStorage.getItem("pathname");
      if (pathname !== null) {
        setPathName(pathname);
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <Router>
        {user.loggedIn || user.isAdmin ? <MainNavbar /> : null}
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
          />
          <PrivateRoute exact path="/menu" component={userMenuPresenter} />
          <PrivateRoute
            exact
            path="/profile"
            component={userProfilePresenter}
          />
          <PublicRoute
            exact
            path="/signIn"
            component={HandleUserSignIn}
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
    </Provider>
  );
};

export default RoutingApp;
