
import axios from 'axios';
import AuthMethods from './AuthMethods';

export default class ResponseMethods {
    constructor() {
        this.auth = new AuthMethods();
        this.responseApiUrl = "/api/Response";

        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.auth.getToken();
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

    createResponse = (newResponseFormData) => {
        return axios.post(`${this.responseApiUrl}/CreateResponse`, newResponseFormData);
    }

    acceptResponse = (acceptResponseFormData) => {
        return axios.post(`${this.responseApiUrl}/AcceptResponse`, acceptResponseFormData);
    }

    editResponse = (editFormData) => {
        return axios.put(`${this.responseApiUrl}/EditResponse`, editFormData);
    }

}
