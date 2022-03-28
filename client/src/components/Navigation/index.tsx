import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavbarText, Container, Button } from 'reactstrap';

export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
    let navigationStyle = {
        background: '#212121',
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: 'height'
    };

    return (
        <Navbar style={navigationStyle} dark sticky="top" expand="md">
            <Container>
                <NavbarBrand tag={Link} to="/home" onClick={() => {}}>
                    Home
                </NavbarBrand>
                <Nav className="mr-auto" navbar></Nav>
                <div>
                    <Button tag={Link} to="/visual">
                        <i className="far fa-sticky-note mr-2"></i>
                        About
                    </Button>
                    <NavbarText className="ml-2 mr-2">|</NavbarText>
                    <Button size="sm" tag={Link} to="/visual">
                        Demo
                    </Button>
                </div>
            </Container>
        </Navbar>
    );
};

export default Navigation;
