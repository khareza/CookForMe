import React, { Component } from 'react';
import AuthMethods from '../Helpers/AuthMethods';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class EditOrderForm extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();

        this.state = {
            deadline: this.props.orderToEdit.deadline,
            ingredientsPhotoUrl: this.props.orderToEdit.ingredientsPhotoUrl,
            ingredientsAvaiableList: this.props.orderToEdit.ingredientsAvaiableList,
            description: this.props.orderToEdit.description,
            isSubmitDisabled: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { deadline, ingredientsPhotoUrl, ingredientsAvaiableList, description } = this.state;

        this.Auth.editOrder(
            { id: this.props.orderToEdit.orderId, deadline, ingredientsPhotoUrl, ingredientsAvaiableList, description }
        ).then((res) => { this.props.history.push('/residents')});
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        //this.checkIfFormDataIsValid();
    }

    handleFileChange = (event) => {
        this.setState({ ingredientsPhoto: event.target.files[0] });
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
                    <div className="headerLogin">
                        {this.props.orderToEdit.id ? <h2 >Edit order</h2> : <h2 >Select order</h2>} 
                    </div>
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">

                            <div className="form-group">
                                <label>Ingredients Avaiable</label>
                                <input className="form-control" type="text" name="ingredientsPhotoUrl" value={this.state.ingredientsPhotoUrl} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <div className="form-group">
                                    <label>deadline</label>
                                    <input className="form-control" type="text" name="deadline" onChange={this.handleDateChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Ingredient Photo</label>
                                <input className="form-control" type="file" name="ingredientsPhoto" onChange={this.handleFileChange} />
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

                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/orders') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditOrderForm);