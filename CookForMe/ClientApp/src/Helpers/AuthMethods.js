﻿import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthMethods {
    constructor() {
        this.authorizationApiUrl = "/api/Authorization";
    }

    login = (loginFormData) => {
        return axios.post(`${this.authorizationApiUrl}/login`, loginFormData)
            .then(res => {
                this.setToken(res.data.token);
                return Promise.resolve(res);
            })
    }

    register = (registerFormData) => {
        return axios.post(`${this.authorizationApiUrl}/Register`, registerFormData);
    }

    logout = () => {
        localStorage.removeItem("id_token");
    };

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    isTokenExpired = token => {

        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            console.log("Token validation failed");
            return false;
        }
    };

    setToken = idToken => {
        localStorage.setItem("id_token", idToken);
    };

    getToken = () => {
        return localStorage.getItem("id_token");
    };

    getConfirm = () => {
        // Check token validation
        let answer = decode(this.getToken());
        return answer;
    };

    getUserId = () => {
        const decoded = decode(this.getToken());
        return decoded.UserID;
    }

}
