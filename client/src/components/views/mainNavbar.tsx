import React from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";

export const MainNavbar = () => {

    const [currentLogo, setCurrentLogo] = React.useState(dkmlogo);
    const [notCurrentLogo, setNotCurrentLogo] = React.useState(mkmlogo);

    const switchLogos = () => {
        // Todo save current bar
        const tmp = currentLogo;
        setCurrentLogo(notCurrentLogo);
        setNotCurrentLogo(tmp);
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <NavDropdown id="test" title={<img src={currentLogo} height="50px"/>}>
                    <NavDropdown.Item onClick={() => switchLogos()} >
                        <img src={notCurrentLogo} height="50px" />
                    </NavDropdown.Item>
                </NavDropdown>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
                <Nav>
                    <Nav.Link >Menu</Nav.Link>
                    <Nav.Link >Profile</Nav.Link>
                    <Nav.Link >Orders</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}