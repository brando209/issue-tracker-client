import React from 'react';
import { Redirect } from 'react-router-dom';

import useAuth from '../../../../hooks/useAuth';
import Login from '../../../form/Login';

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
            <Login onSubmit={login}/>
    )
}

export default LoginPage;