// import "bootstrap/dist/css/bootstrap.min.css";
import "./components/components.scss";
import React, { Component } from "react";
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

import RoutingApp from "./routingApp";

const App = ({}) => {
  return (
    <Provider store={store}>
      <RoutingApp />
    </Provider>
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps)(App);

ReactDOM.render(<App />, document.querySelector("#app"));
