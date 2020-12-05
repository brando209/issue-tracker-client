import React, { useState, useEffect, createContext } from 'react';
import auth from '../api/auth';

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
            await auth.tokenLogin((user) => {
                user ? console.log("Logged in as " + user.userName) : console.log("Not logged in");
                setUser(user);
            });
        }
        console.log("Logging in with token")
        loginWithToken();
    }, []);

    const signup = (userInfo, cb) => {
        return auth.signup(userInfo, (data) => {
            console.log(data);
            cb(data);
        })
    }

    const login = (credentials, cb) => {
        return auth.login(credentials, (user) => {
            setUser(user);
            cb(user);
        })
    }

    const logout = cb => {
        return auth.logout(() => {
            setUser(null);
            cb()
        });
    }

    return {
        user,
        signup,
        login, 
        logout
    }
}