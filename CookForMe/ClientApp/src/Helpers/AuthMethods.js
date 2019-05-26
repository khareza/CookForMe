import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthMethods {
    constructor() {
        this.userApiUrl = "/api/User";
        this.authorizationApiUrl = "/api/Authorization";
    //localhost:64763/
    //localhost:50123/
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
        console.log(newOrderFormData);

        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.post(`${this.userApiUrl}/CreateOrder`, newOrderFormData);
    }
    uploadOrderPhoto = (orderPhoto) => {
        console.log(orderPhoto);

        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.post(`${this.userApiUrl}/UploadOrderPhoto`, orderPhoto);
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
        console.log("Recieved answer!");
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

}
