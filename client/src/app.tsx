import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import EntryView from "./components/views/entryView";
import { HandleUserSignIn } from "./components/presenters/handleUserSignIn";
import { searchTypes } from "./constants/searchTypes";
import { AddBeverageToMenuPresenter } from "./components/presenters/addBeverageToMenuPresenter";
import DrinkModel from "./model/drinkModel";

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
              searchType={searchTypes.BEER}
            />
          </Route>
          <Route exact path="/signIn">
            <HandleUserSignIn />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
