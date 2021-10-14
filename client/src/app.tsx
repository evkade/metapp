import "bootstrap/dist/css/bootstrap.min.css";
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

import EntryView from "./components/views/entryView";
import HandleUserSignIn from "./components/presenters/handleUserSignIn";
import DrinkModel from "./model/drinkModel";
import AddBeverageToMenuPresenter from "./components/presenters/addBeverageToMenuPresenter";
import { searchTypes } from "./constants/searchTypes";
import AdminViewDrinkOrdersPresenter from "./components/presenters/adminViewDrinkOrdersPresenter";
import { HandleUserSignUp } from "./components/presenters/handleUserSignUp";
import MainNavbar from "./components/views/mainNavbar";
import { signIn, signOut } from "./redux/actions/user";

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
      ) : store.getState().user.loggedIn ? (
        <Redirect to="/vieworders" /> // TODO what is first page
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const PublicRoute = ({ component: Component, path, ...rest }) => (
  <Route
    path={path}
    render={(props) =>
      store.getState().user.loggedIn ? (
        <Redirect to="/vieworders" /> // TODO what is first page?
      ) : (
        <Component {...props} {...rest} />
      )
    }
  />
);

const App = () => {
  const [user, setUser] = React.useState(null);

  checkValidUser().then(() => setUser(store.getState().user.username));

  console.log(store.getState().user);

  return (
    <Provider store={store}>
      <Router>
        {(user || store.getState().user.loggedIn) &&
        !store.getState().user.isAdmin ? (
          <MainNavbar signout={signOut} />
        ) : null}
        <Switch>
          <AdminRoute
            exact
            path="/modifyMenu"
            drinkModel={drinkModel}
            searchType={searchTypes.COCKTAIL}
            component={AddBeverageToMenuPresenter}
          />
          <PrivateRoute
            exakt
            path="/vieworders"
            component={AdminViewDrinkOrdersPresenter}
          />
          <PublicRoute exact path="/signIn" component={HandleUserSignIn} />
          <PublicRoute exact path="/signUp" component={HandleUserSignUp} />
          <PublicRoute exact path="/" component={EntryView} />
        </Switch>
      </Router>
    </Provider>
  );
};

const checkValidUser = async () => {
  await fetch("http://localhost:5000/api/auth/currentuser", {
    credentials: "include",
  })
    .then((data) => data.json())
    .then((user) => store.dispatch(signIn(user.currentUser)))
    .catch((err) => console.log("No signed in user"));
};

ReactDOM.render(<App />, document.querySelector("#app"));
