import React from 'react';
import { Button, Nav } from 'react-bootstrap';

import useAuth from '../../../hooks/useAuth';
import LinkButton from '../../display/Button/LinkButton';
import NavBar from '../../display/NavBar/NavBar';

function TopNavBar(props) {
    const auth = useAuth();

    const logout = () => {
        auth.logout(() => {
            console.log("Logged out")
        })
    }

    return (
        <NavBar title="Issue Tracker" render={() => (
            <Nav className="mr-auto">
                { !auth.user ? <LinkButton to="login">Login</LinkButton> : null }
                { !auth.user ? <LinkButton to="signup">Signup</LinkButton> : null }
                { auth.user ? <Button onClick={logout}>Logout</Button> : null }
                { auth.user ? <LinkButton to="/dashboard">Dashboard</LinkButton> : null }
                { auth.user ? <LinkButton to="/account">Account</LinkButton> : null }
            </Nav>
        )} />
    )
}

export default TopNavBar;