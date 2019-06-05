﻿import React, { Component } from 'react';
import Moment from 'react-moment';
import ResponseMethods from '../../../Helpers/ResponseMethods';
export class ResponseDetails extends Component {

    constructor(props) {
        super(props);
        this.ResponseRequest = new ResponseMethods();

        this.state = {
            appUser: {},
            offerId: '',
            response: {
                order: {},
                offers:[]}
        };
        this.id = this.props.match.params.response_id;
    }

    componentDidMount = () => {
        this.getResponse(this.id);

    }

    getResponse = (id) => {
        this.ResponseRequest.getAcceptedResponse(id)
            .then((res) => {
                this.setState({
                    appUser: res.data.appUser,
                    offerId: res.data.offerId,
                    response: res.data.response
                });
            }).catch((err) => {
                this.props.history.push(`/responses/MyResponses`);
            });
    }


    render() {

        return (
            <div className="responseCard">
                <div className="responseCardFlex">
                    <div className="orderColumn">
                        <div className="responseCardHeader">
                            <h4>Order</h4>
                            {this.state.response.order.ingredientsPhotoUrl
                                ? <img className="imgPreview" src={this.state.response.order.ingredientsPhotoUrl} alt="empty"></img>
                                : null}
                            <p>Time left: <Moment fromNow="dddd YYYY-MM-DD HH:mm">{this.state.response.order.expirationDate}</Moment></p>
                        </div>
                        <div className="responseData">
                            <div>
                                <p className="description"><span>Description: </span>{this.state.response.order.description}</p>
                                <p><span>Ingredients list: </span>{this.state.response.order.ingredientsAvaiable}</p>
                            </div>
                        </div>
                    </div>
                    <div className="offersColumn">
                        <h4>Response offers</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Avg cook time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.response.offers.map((offer, index) => {
                                    let selected = 'rejectedOffer';
                                    if (offer.id === this.state.offerId) {
                                        selected = 'selectedOffer';
                                    }
                                    return (
                                        <tr key={index} className={selected}>
                                            <td>{offer.name}</td>
                                            <td>{offer.price}</td>
                                            <td>{offer.avgCookTime}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="personalDataColumn">
                        <div>
                            <h4>Client</h4>
                            <p>First name: {this.state.appUser.firstName}</p>
                            <p>Last name: {this.state.appUser.lastName}</p>
                            <p>City: {this.state.appUser.city}</p>
                            <p>Street: {this.state.appUser.street}</p>
                            <p>Phone: {this.state.appUser.phoneNumber}</p>
                            <p>Rating: {this.state.appUser.rating}</p>
                        </div>
                    </div>
                </div>
                <input type="button" value="Back to my responses" onClick={() => { this.props.history.push('/Responses/MyResponses') }} className="btn btn-large btn-block btn-danger" />
            </div>
        );
    }
}



