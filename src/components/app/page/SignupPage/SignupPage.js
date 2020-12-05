import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Signup from '../../../form/Signup';
import useAuth from '../../../../hooks/useAuth';

function SignupPage() {
    const auth = useAuth();
    const [redirect, setRedirect] = useState(false); 

    const signup = async (userInfo) => {
        await auth.signup(userInfo, (data) => {
            console.log(data)
        });
        setRedirect(true);
    }

    return (
        redirect === true ?
        <Redirect to="/" /> :
        <Signup onSubmit={signup} />
    )
}

export default SignupPage;