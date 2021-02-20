import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import LoginForm from '../../components/form/LoginForm';

import '../page.css';

function LoginPage() {
    const auth = useAuth();
    
    const login = async (credentials) => {
        await auth.login(credentials, (user) => {
            console.log("Signed in as " + user.userName + "!");
        });
    }

    return (
        auth.user ? 
            <Redirect to="/dashboard"/> :
            <Container fluid className="page">
                <LoginForm onSubmit={login}/>
            </Container>
    )
}

export default LoginPage;