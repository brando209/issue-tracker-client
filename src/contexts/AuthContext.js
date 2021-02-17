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

    useEffect(() => {
        const loginWithToken = async () => {
            await authApi.tokenLogin((user) => {
                user ? console.log("Logged in as " + user.userName) : console.log("Not logged in");
                setUser(user);
            });
        }
        console.log("Logging in with token")
        loginWithToken();
    }, []);

    const signup = (userInfo, cb) => {
        return authApi.signup(userInfo, (data) => {
            console.log(data);
            cb(data);
        })
    }

    const login = (credentials, cb) => {
        return authApi.login(credentials, (user) => {
            setUser(user);
            cb(user);
        })
    }

    const logout = cb => {
        return authApi.logout(() => {
            setUser(null);
            cb();
        });
    }

    return {
        user,
        signup,
        login, 
        logout
    }
}