import React, { useState, useEffect, createContext } from 'react';
import authApi from '../api/auth';

export const authContext = createContext({ });

export default function ProvideAuth(props) {
    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth}>
            {props.children}
        </authContext.Provider>
    )
}

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const loginWithToken = async () => {
            await authApi.tokenLogin((user) => {
                user ? console.log("Logged in as " + user.userName) : console.log("Not logged in");
                setUser(user);
                setIsLoading(false);
            });
        }
        console.log("Logging in with token");
        setIsLoading(true);
        loginWithToken();

    }, []);

    const signup = (userInfo, cb) => {
        return authApi.signup(userInfo, (data) => {
            console.log(data);
            cb(data);
        })
    }

    const login = (credentials, cb) => {
        console.log("logging in");
        setIsLoading(true);
        return authApi.login(credentials, (user) => {
            setUser(user);
            cb(user);
            setIsLoading(false);
        })
    }

    const logout = cb => {
        return authApi.logout(() => {
            setUser(null);
            cb();
        });
    }

    const changePassword = (currentPassword, newPassword, cb) => {
        console.log('Context', currentPassword, newPassword);
        return authApi.changePassword(currentPassword, newPassword, user.token, cb);
    }

    return {
        user,
        isLoading,
        signup,
        login, 
        logout,
        changePassword
    }
}