import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import LoginForm from '../../components/form/LoginForm';

import '../page.css';

function LoginPage(props) {
    const auth = useAuth();

    const login = async (credentials) => {
        await auth.login(credentials, (user) => {
            console.log("Signed in as " + user.userName + "!");
        });
    }

    const fromState = props.location.state ? props.location.state.from : null;

    return (
        auth.isLoading ?
            <div>Loading...</div> :
            auth.user ? 
                <Redirect to={fromState ? fromState.pathname : "/"} /> :
                <Container fluid className="page">
                    <LoginForm onSubmit={login}/>
                </Container>
    )
}

export default LoginPage;