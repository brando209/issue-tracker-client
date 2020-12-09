import React from 'react';
import { Button, Nav } from 'react-bootstrap';

import LinkButton from '../../display/Button/LinkButton';
import NavBar from '../../display/NavBar/NavBar'
;
import useAuth from '../../../hooks/useAuth';

import logo from '../../../logo.svg';

function TopNavBar(props) {
    const auth = useAuth();

    const logout = () => {
        auth.logout(() => {
            console.log("Logged out")
        })
    }
    
    return (
        <NavBar title="Issue Tracker" logo={logo} bg="dark" expand="lg" render={() => (
            <Nav >
                { !auth.user ? <LinkButton to="login">Login</LinkButton> : null }
                { !auth.user ? <LinkButton to="signup">Signup</LinkButton> : null }
                { auth.user ? <LinkButton to="/dashboard">Dashboard</LinkButton> : null }
                { auth.user ? <LinkButton to="/account">Account</LinkButton> : null }
                { auth.user ? <Button onClick={logout}>Logout</Button> : null }
            </Nav>
        )} />
    )
}

export default TopNavBar;