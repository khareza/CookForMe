import axios from 'axios';
import AuthMethods from './AuthMethods';

export default class UserMethods {
    constructor() {
        this.userApiUrl = "/api/User";
        this.auth = new AuthMethods();

        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.auth.getToken();
    }

    getUserRating = (id) => {
        return axios.get(`${this.userApiUrl}/getUserRating/${id}`);
    }

    rateUser = (newRateFormData) => {
        return axios.post(`${this.userApiUrl}/rateUser`, newRateFormData);
    }

}