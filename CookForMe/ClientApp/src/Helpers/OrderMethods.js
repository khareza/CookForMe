import axios from 'axios';
import AuthMethods from './AuthMethods';

export default class OrderMethods {
    constructor() {
        this.auth = new AuthMethods();
        this.orderApiUrl = "/api/Order";

        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.auth.getToken();
    }

    getOrderById = (id) => {
        return axios.get(`${this.orderApiUrl}/GetOrder/${id}`);
    }

    getAllOrders = () => {
        let id = this.auth.getUserId();
        return axios.get(`${this.orderApiUrl}/GetOrders/${id}`);
    }

    getMyOrders = () => {
        let id = this.auth.getUserId();
        return axios.get(`${this.orderApiUrl}/GetMyOrders/${id}`);
    }

    createOrder = (newOrderFormData) => {
        console.log(newOrderFormData);
        return axios.post(`${this.orderApiUrl}/CreateOrder`, newOrderFormData);
    }

    uploadOrderPhoto = (photo) => {
        return axios.post(`${this.orderApiUrl}/UploadPhoto`, photo);
    }

    editOrder = (editFormData) => {
        console.log(editFormData);
        return axios.put(`${this.orderApiUrl}/EditOrder`, editFormData);
    }

    deleteOrder = (id) => {
        return axios.delete(`${this.orderApiUrl}/DeleteOrder/` + id);
    }

}
