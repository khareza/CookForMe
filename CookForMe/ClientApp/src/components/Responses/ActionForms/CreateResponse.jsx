﻿import React, { Component } from 'react';
import AuthMethods from '../../../Helpers/AuthMethods';
import ResponseMethods from '../../../Helpers/ResponseMethods';
import OffersWrapper from '../Details/OffersWrapper';
import { NotificationManager } from 'react-notifications';
import { Error } from '../../Error';

export default class AddNewOrder extends Component {
    constructor(props) {
        super(props);

        this.Auth = new AuthMethods();
        this.ResponseRequest = new ResponseMethods();
        this.state = {
            orderId: this.props.match.params.order_id,
            offers:[],
            isSubmitDisabled: false,
            errors: {}
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { orderId, offers} = this.state;

        this.ResponseRequest.createResponse(
            { responserId: this.Auth.getUserId(), orderId, offers }
        ).then((res) => {
           NotificationManager.success('Created response', 'Success');
           this.props.history.push('/Responses/MyResponses');
        }).catch((err) => {
            console.log(err.response.data.errors);
            this.handleInputErrors(err.response.data.errors);
            NotificationManager.error('Data not valid', 'Error!');
        })
    }

    handleInputErrors = (errors) => {
        let errorsArray = [];
        for (var field in errors) {
            errorsArray[field] = errors[field];
        }
        this.setState({ errors: errorsArray });
    }

    saveOffers = (offersStringArray) => {
        this.setState({ offers: offersStringArray });
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off" encType="multipart/form-data">
                    <div className="headerLogin">
                        <h2 >Create response</h2>
                    </div>
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">

                            <div className="headerLogin">
                                <h3>Your offer</h3>
                            </div>

                            <div className="form-group">
                                <OffersWrapper saveOffers={this.saveOffers} />
                                {this.state.errors['Offers'] ? <Error messages={this.state.errors['Offers']} /> : null}
                            </div>

                            <input type="submit" value="Response to order" className="btn btn-large btn-block btn-primary" disabled={this.state.isSubmitDisabled} />
                            <input type="button" value="Cancel response" onClick={() => { this.props.history.push('/Orders/AllOrders/') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
