import axios from 'axios';
import { setLocalAuthToken, getLocalAuthToken, removeLocalAuthToken } from '../utility/local/authStorage';

const auth = {
    isAuthenticated: false, 
    async login(credentials, cb) {
        const response = await axios.post(
            'http://localhost:3001/api/auth/login', 
            { 
                userName: credentials.userName, 
                password: credentials.password 
            }
        );
        auth.isAuthenticated = true;
        setLocalAuthToken(response.data.token);
        cb({ ...response.data.user, token: response.data.token });
        return response.data;
    },
    async tokenLogin(cb) {
        const token = getLocalAuthToken();

        if(!token) {
            auth.isAuthenticated = false;
            console.log("Token not found");
            cb(null);
            return;
        }

        console.log("Token found");
        let response = null;
        try {
            response = await axios.get(
                'http://localhost:3001/api/user/login',
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            auth.isAuthenticated = true;
            cb({ ...response.data.user, token });
        } catch(err) {
            auth.isAuthenticated = false;
            cb(null);
        }

        return response;
    },
    async signup(user, cb) {
        const response = await axios.post(
            'http://localhost:3001/api/auth/register',
            { ...user }
        );
        console.log(response);
        cb(response.data);
        return response.data;
    },
    async logout(cb) {
        auth.isAuthenticated = false;
        removeLocalAuthToken();
        cb();
    }
}

export default auth;