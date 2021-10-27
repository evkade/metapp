import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";
import { useHistory } from "react-router-dom";
import { switchCurrentBar } from "../../redux/actions/menu";
import { signOut } from "../../redux/actions/user";

const MainNavbar = ({ user, signOut, switchCurrentBar, setPathName }) => {
  const history = useHistory();

  const checkAdminBar = () => {
    if (user && user.username === "mkm") {
      switchCurrentBar();
      return mkmlogo;
    } else return dkmlogo;
  };

  const [currentLogo, setCurrentLogo] = useState(checkAdminBar());
  const [notCurrentLogo, setNotCurrentLogo] = useState(mkmlogo);
  const [expanded, setExpanded] = useState(false);

  const switchLogos = () => {
    const tmp = currentLogo;
    setCurrentLogo(notCurrentLogo);
    setNotCurrentLogo(tmp);
    switchCurrentBar();
  };

  const logout = async () => {
    await fetch("http://localhost:5000/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      // @ts-ignore
    }).then(() => {
      signOut();
      setPathName("/");
      history.push("/");
    });
  };

  return (
    <Navbar variant="dark" expand="lg" expanded={expanded}>
      <Navbar.Brand>
        {user.isAdmin ? (
          <img src={currentLogo} height="45px" />
        ) : (
          <NavDropdown
            id="test"
            title={<img src={currentLogo} height="45px" />}
          >
            <NavDropdown.Item onClick={() => switchLogos()}>
              <img src={notCurrentLogo} height="45px" />
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
              <Nav.Item onClick={() => setExpanded(!expanded)}>
                <Nav.Link onClick={() => history.push("/customizeMenu")}>
                  Customize Menu{" "}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => setExpanded(!expanded)}>
                <Nav.Link onClick={() => history.push("/vieworders")}>
                  Orders
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item onClick={() => setExpanded(!expanded)}>
                <Nav.Link onClick={() => history.push("/menu")}>Menu</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => setExpanded(!expanded)}>
                <Nav.Link onClick={() => history.push("/profile")}>
                  Profile
                </Nav.Link>
              </Nav.Item>
            </>
          )}
          <Nav.Link
            onClick={() => {
              logout();
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchCurrentBar: () => dispatch(switchCurrentBar()),
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
