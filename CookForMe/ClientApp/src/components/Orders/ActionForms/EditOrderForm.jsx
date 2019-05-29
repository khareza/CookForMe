import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import OrderMethods from '../../../Helpers/OrderMethods';

class EditOrderForm extends Component {

    constructor(props) {
        super(props);
        this.OrderRequest = new OrderMethods();

        this.state = {
            deadline: new Date(),
            ingredientsPhotoUrl: '',
            ingredientsAvaiableList: '',
            ingredientsPhoto: '',
            description: '',
            isSubmitDisabled: false
        };
        let id = this.props.match.params.order_id;
        this.getOrder(id);
    }

    getOrder = (id) => {
        this.OrderRequest.getOrderById(id)
            .then((res) => {
                this.setState({
                    ingredientsPhotoUrl: res.data.ingredientsPhotoUrl ? res.data.ingredientsPhotoUrl : 'WithOutPhoto',
                    ingredientsAvaiableList: res.data.ingredientsAvaiable,
                    ingredientsPhoto: '',
                    description: res.data.description,
                    isSubmitDisabled: false
                });
            }).catch((err) => {
                this.props.history.push(`/orders/MyOrders`);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { deadline, ingredientsPhotoUrl, ingredientsAvaiableList, description } = this.state.order;

        this.Auth.editOrder(
            { orderId: this.props.orderToEdit.id, photoUrl: ingredientsPhotoUrl, deadline, ingredientsAvaiableList, description }
        ).then((res) => { this.props.history.push('/orders') });
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        //this.checkIfFormDataIsValid();
    }

    handleFileChange = (event) => {
        this.setState({ ingredientsPhotoUrl: event.target.files[0].name });
        // this.checkIfFormDataIsValid();
    }

    handleDateChange = (date) => {
        this.setState({ deadline: date });
    }

    //checkIfFormDataIsValid = () => {
    //    if (this.state.userName.length > 0 && this.state.firstName.length > 0) {
    //        this.setState({ isSubmitDisabled: false });
    //    }
    //    else {
    //        this.setState({ isSubmitDisabled: true });
    //    }
    //}

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">

                            <div className="form-group">
                                <label>Ingredients Avaiable</label>
                                <input className="form-control" type="text" name="ingredientsPhotoUrl" value={this.state.ingredientsPhotoUrl} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Deadline</label>
                                <div>
                                    <DatePicker
                                        selected={this.state.deadline}
                                        onChange={this.handleDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Ingredient Photo</label>
                                <div>
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        Select new photo
                                    </label>
                                    <input className="inputFileinput" id="file-upload" type="file" name="ingredientsPhoto" onChange={this.handleFileChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Ingredients Avaiable</label>
                                <input className="form-control" type="text" name="ingredientsAvaiableList" value={this.state.ingredientsAvaiableList} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                            </div>

                            <input type="submit" value="Edit order data" className="btn btn-large btn-block btn-info" disabled={this.state.isSubmitDisabled} />

                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/orders/MyOrders') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditOrderForm);