// import "bootstrap/dist/css/bootstrap.min.css";
import "./components/components.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { connect } from "react-redux";
import { signIn } from "./redux/actions/user";

import RoutingApp from "./routingApp";

const App = ({}) => {
  checkValidUser();

  return (
    <Provider store={store}>
      <RoutingApp />
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

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps)(App);

ReactDOM.render(<App />, document.querySelector("#app"));
