import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";
import { useHistory } from "react-router-dom";
import { switchCurrentBar } from "../../redux/actions/menu";
import UserModel from "../../model/userModel";

const userModel = new UserModel();

const MainNavbar = ({
  user,
  switchCurrentBar,
  setPathName,
  currentBar,
  signOut,
}) => {
  useEffect(() => {
    setCurrentLogo(
      currentBar ? (currentBar === "dkm" ? dkmlogo : mkmlogo) : dkmlogo
    );
    setNotCurrentLogo(
      currentBar ? (currentBar === "dkm" ? mkmlogo : dkmlogo) : mkmlogo
    );
  }, [currentBar]);

  const history = useHistory();

  const [currentLogo, setCurrentLogo] = useState(null);
  const [notCurrentLogo, setNotCurrentLogo] = useState(mkmlogo);
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar variant="dark" expand="lg" expanded={expanded}>
      <Navbar.Brand>
        {user.isAdmin ? (
          <img src={currentLogo} height="45px" />
        ) : (
          <NavDropdown
            id="test"
            title={<img src={currentLogo} height="45px" alt="barLogo" />}
          >
            <NavDropdown.Item
              onClick={() =>
                switchCurrentBar(currentBar === "dkm" ? "mkm" : "dkm")
              }
            >
              <img src={notCurrentLogo} height="45px" alt="barLogo" />
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="navbar"
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id="navbar">
        <Nav className="mr-auto">
          {user.isAdmin ? (
            <>
              <Nav.Item
                onClick={() => {
                  if (expanded) setExpanded(!expanded);
                }}
              >
                <Nav.Link onClick={() => history.push("/customizeMenu")}>
                  Customize Menu{" "}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                onClick={() => {
                  if (expanded) setExpanded(!expanded);
                }}
              >
                <Nav.Link onClick={() => history.push("/vieworders")}>
                  Orders
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item
                onClick={() => {
                  if (expanded) setExpanded(!expanded);
                }}
              >
                <Nav.Link onClick={() => history.push("/menu")}>Menu</Nav.Link>
              </Nav.Item>
              <Nav.Item
                onClick={() => {
                  if (expanded) setExpanded(!expanded);
                }}
              >
                <Nav.Link onClick={() => history.push("/profile")}>
                  Profile
                </Nav.Link>
              </Nav.Item>
            </>
          )}
          <Nav.Link
            onClick={() => {
              signOut(setPathName, history);
            }}
          >
            Log out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
