﻿import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthMethods {
    constructor() {
        this.userApiUrl = "/api/User";
        this.authorizationApiUrl = "/api/Authorization";
    }

    login = (loginFormData) => {
        return axios.post(`${this.authorizationApiUrl}/login`, loginFormData)
            .then(res => {
                this.setToken(res.data.token);
                return Promise.resolve(res);
            })
    }

    logout = () => {
        localStorage.removeItem("id_token");
    };


    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    register = (registerFormData) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.post(`${this.authorizationApiUrl}/Register`, registerFormData);
    }

    createOrder = (newOrderFormData) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.post(`${this.userApiUrl}/CreateOrder`, newOrderFormData);
    }
    uploadOrderPhoto = (photo) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.post(`${this.userApiUrl}/UploadPhoto`, photo);
    }

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

    editOrder = (editFormData) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.put(`${this.userApiUrl}/EditOrder`, editFormData);
    }

    deleteOrder = (id) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.delete(`${this.userApiUrl}/DeleteOrder/` + id);
    }

    getAllOrders = () => {
        let id = this.getUserId();
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.get(`${this.userApiUrl}/GetOrders/${id}`);
    }

    getMyOrders = () => {
        let id = this.getUserId();
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.get(`${this.userApiUrl}/GetMyOrders/${id}`);
    }

    getOrderById = (id) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.get(`${this.userApiUrl}/GetOrder/${id}`);
    }

    getUserId = () => {
        const decoded = decode(this.getToken());
        return decoded.UserID;
    }

    createResponse = (newResponseFormData) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.post(`${this.userApiUrl}/CreateResponse`, newResponseFormData);
    }

    getOrderResponses = (id) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.get(`${this.userApiUrl}/GetOrderResponses/${id}`);
    }


    getUserResponses = () => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        let id = this.getUserId();
        return axios.get(`${this.userApiUrl}/GetUserResponses/${id}`);
    }

    getResponse= (id) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.get(`${this.userApiUrl}/GetResponse/${id}`);
    }

    editResponse = (editFormData) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.put(`${this.userApiUrl}/EditResponse`, editFormData);
    }
}
