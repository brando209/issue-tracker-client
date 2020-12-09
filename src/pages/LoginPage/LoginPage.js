import React from 'react';
import { Redirect } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import LoginForm from '../../components/form/LoginForm';

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
            <LoginForm onSubmit={login}/>
    )
}

export default LoginPage;