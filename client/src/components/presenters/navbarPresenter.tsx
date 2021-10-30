import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { switchCurrentBar } from "../../redux/actions/menu";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";
import UserModel from "../../model/userModel";
import NavbarView from "../views/navbarView";

const userModel = new UserModel();

const NavbarPresenter = ({
  user,
  switchCurrentBar,
  setPathName,
  currentBar,
  signOut,
}) => {
  const history = useHistory();

  useEffect(() => {
    setCurrentLogo(
      currentBar ? (currentBar === "dkm" ? dkmlogo : mkmlogo) : dkmlogo
    );
    setNotCurrentLogo(
      currentBar ? (currentBar === "dkm" ? mkmlogo : dkmlogo) : mkmlogo
    );
  }, [currentBar]);

  const [currentLogo, setCurrentLogo] = useState(null);
  const [notCurrentLogo, setNotCurrentLogo] = useState(mkmlogo);
  const [expanded, setExpanded] = useState(false);

  return (
    <NavbarView
      isAdmin={user.isAdmin}
      switchCurrentBar={switchCurrentBar}
      setPathName={setPathName}
      currentBar={currentBar}
      currentLogo={currentLogo}
      notCurrentLogo={notCurrentLogo}
      expanded={expanded}
      setExpanded={setExpanded}
      signOut={signOut}
      history={history}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
    currentBar: store.menu.currentBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchCurrentBar: (bar) => dispatch(switchCurrentBar(bar)),
    signOut: (setPathname, history) =>
      dispatch(userModel.logOut(setPathname, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarPresenter);
