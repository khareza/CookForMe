﻿import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import IngredientsWrapper from '../Details/IngredientsWrapper';
import 'react-datepicker/dist/react-datepicker.css';
import AuthMethods from '../../../Helpers/AuthMethods';



export default class AddNewOrder extends Component {
    constructor(props) {
        super(props);

        this.Auth = new AuthMethods();
        this.state = {
            deadline: new Date(),
            ingredientsPhoto: '',
            ingredientsAvaiableList: '',
            description: '',
            isSubmitDisabled: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { deadline, ingredientsPhoto, ingredientsAvaiableList, description } = this.state;
        console.log(ingredientsPhoto);

        const fd = new FormData();
        fd.append('photo', ingredientsPhoto);
        this.Auth.uploadOrderPhoto(fd).then((res) => {
            this.Auth.createOrder(
                { founderId: this.Auth.getUserId(), photoUrl:res.data, deadline, ingredientsAvaiableList, description }
            )
        }).then((res) => {
            console.log(res);
            this.props.history.push('/orders/MyOrders')
        })
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // this.checkIfFormDataIsValid();
    }

    handleFileChange = (event) => {
        this.setState({ ingredientsPhoto: event.target.files[0] });
        // this.checkIfFormDataIsValid();
    }

    handleDateChange = (date) => {
        this.setState({ deadline: date });
    }

    saveIngredients = (igredientsString) => {

        this.setState({ ingredientsAvaiableList: igredientsString });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off" encType="multipart/form-data">
                    <div className="headerLogin">
                        <h2 >Add new order</h2>
                    </div>
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">
                            <div className="form-group">
                                <label>Deadline</label>
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

                            <div className="form-group">
                                <label>Ingredient Photo</label>
                                <div>
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        Select photo
                                    </label>
                                    <input className="inputFileinput" id="file-upload" type="file" name="ingredientsPhoto" onChange={this.handleFileChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Ingredients Avaiable List</label>
                                <IngredientsWrapper saveIngredients={this.saveIngredients}/>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                            </div>
                            <input type="submit" value="Add new order" className="btn btn-large btn-block btn-primary" disabled={this.state.isSubmitDisabled} />
                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/orders/MyOrders') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div >
        );
    }
}
