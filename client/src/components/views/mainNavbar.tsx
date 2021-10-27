import React from "react";
import { connect } from "react-redux";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";
import { useHistory } from "react-router-dom";
import { switchCurrentBar } from "../../redux/actions/menu";
import { signOut } from "../../redux/actions/user";

const MainNavbar = ({ user, signOut, switchCurrentBar, setPathName }) => {
  const history = useHistory();

  const [currentLogo, setCurrentLogo] = React.useState(dkmlogo);
  const [notCurrentLogo, setNotCurrentLogo] = React.useState(mkmlogo);

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
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <NavDropdown id="test" title={<img src={currentLogo} height="50px" />}>
          <NavDropdown.Item onClick={() => switchLogos()}>
            <img src={notCurrentLogo} height="50px" />
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav>
          {user.isAdmin ? (
            <Nav.Link onClick={() => history.push("/customizeMenu")}>
              Customize Menu{" "}
            </Nav.Link>
          ) : (
            <Nav.Link onClick={() => history.push("/menu")}>Menu</Nav.Link>
          )}
          <Nav.Link onClick={() => history.push("/profile")}>Profile</Nav.Link>
          {user.isAdmin ? (
            <Nav.Link onClick={() => history.push("/vieworders")}>
              Orders
            </Nav.Link>
          ) : null}
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
