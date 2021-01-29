import axios from 'axios';
import config from '../config';
import auth from './auth';

export function signupApi({ email, username, password }) {
    const data = { email, username, password };
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
        url: `${config.api_route}/user/signup`,
        withCredentials: true
    };
    return axios(options);
}

export function signinApi({ email, password }) {
    const data = { email, password };
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        url: `${config.api_route}/user/login`,
        withCredentials: true
    };
    return axios(options);
}

export async function isLoggedin() {
    try {
        if (auth.isAuthenticated) return true;

        const options = {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
            url: `${config.api_route}/user/login/auth`,
            withCredentials: true
        };
        const res = await axios(options);
        const isAuth = res && res.data && res.data.auth;
        if (isAuth) auth.authenticte();
        return isAuth;

    } catch (err) {
        return false;
    }
}

export function logout() {
    const data = {};
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
        url: `${config.api_route}/user/logout`,
        withCredentials: true
    };
    return axios(options);
}