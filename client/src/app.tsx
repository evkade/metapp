import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { beverageTypes } from "./constants/searchTypes";

import EntryView from "./components/views/entryView";
import { HandleUserSignIn } from "./components/presenters/handleUserSignIn";
import AdminViewDrinkOrdersPresenter from "./components/presenters/adminViewDrinkOrdersPresenter";
import CustomizeMenuPresenter from "./components/presenters/customizeMenuPresenter";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <EntryView />
          </Route>
          <Route exact path="/customizeMenu">
            <CustomizeMenuPresenter
            />
          </Route>
          <Route exact path="/signIn">
            <HandleUserSignIn />
          </Route>
          <Route exakt path="/viewOrders">
            <AdminViewDrinkOrdersPresenter />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
