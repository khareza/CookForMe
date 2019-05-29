
import axios from 'axios';
import AuthMethods from './AuthMethods';

export default class ResponseMethods {
    constructor() {
        this.auth = new AuthMethods();
        this.responseApiUrl = "/api/Response";

        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.auth.getToken();
    }

    createResponse = (newResponseFormData) => {
        return axios.post(`${this.responseApiUrl}/CreateResponse`, newResponseFormData);
    }

    getOrderResponses = (id) => {
        return axios.get(`${this.responseApiUrl}/GetOrderResponses/${id}`);
    }


    getUserResponses = () => {
        let id = this.auth.getUserId();
        return axios.get(`${this.responseApiUrl}/GetUserResponses/${id}`);
    }

    getResponse = (id) => {
        return axios.get(`${this.responseApiUrl}/GetResponse/${id}`);
    }

    editResponse = (editFormData) => {
        return axios.put(`${this.responseApiUrl}/EditResponse`, editFormData);
    }
}
