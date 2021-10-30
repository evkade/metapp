import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";

const NavbarView = ({
  isAdmin,
  switchCurrentBar,
  setPathName,
  currentBar,
  currentLogo,
  notCurrentLogo,
  expanded,
  setExpanded,
  signOut,
  history,
}) => {
  return (
    <Navbar variant="dark" expand="lg" expanded={expanded}>
      <Navbar.Brand>
        {isAdmin ? (
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
          {isAdmin ? (
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

export default NavbarView;
