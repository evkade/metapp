import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import EntryView from "./components/views/entryView";
import { HandleUserSignIn } from "./components/presenters/handleUserSignIn";
import DrinkModel from "./model/drinkModel";
import AddBeverageToMenuPresenter from "./components/presenters/addBeverageToMenuPresenter";
import { searchTypes } from "./constants/searchTypes";
import AdminViewDrinkOrdersPresenter from "./components/presenters/adminViewDrinkOrdersPresenter";

const drinkModel = new DrinkModel();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <EntryView />
          </Route>
          <Route exact path="/modifyMenu">
            <AddBeverageToMenuPresenter
              drinkModel={drinkModel}
              searchType={searchTypes.COCKTAIL}
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
