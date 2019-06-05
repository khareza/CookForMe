import React, { Component } from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import ResponseMethods from '../../../Helpers/ResponseMethods';

export class OrderDetails extends Component {
    ResponseRequest = new ResponseMethods();

    state = {
        id: this.props.order.id,
        responses: []
    }

    responseToOrder = () => {
        this.props.responseToOrder(this.state.id);
    }

    componentDidMount = () => {
        this.getResponses();
    }

    getResponses = () => {
        this.ResponseRequest.getOrderResponses(this.state.id)
            .then((res) => {
                this.setState({ responses: res.data });
            });
    }

    renderResponses = () => {
        return this.state.responses.map((response, index) => {
            let offerIndex = index;
            return response.offers.map((offer, index) => (
                <div className="offer" key={index}>
                    <p>{offerIndex+1}</p>
                    <p>{offer.name}</p>
                    <p>{offer.price}</p>
                    <p>{offer.avgCookTime}</p>
                    <hr></hr>
                </div>
            ))
        })
    }

    render() {

        return (
            <div className="orderCard">
                <div className="orderCardHeader">
                    {this.props.order.ingredientsPhotoUrl
                        ? <img src={this.props.order.ingredientsPhotoUrl} alt="empty"></img>
                        : null}
                    <p>Deadline: <Moment format="dddd YYYY-MM-DD HH:mm">{this.props.order.deadline}</Moment></p>
                    <p>Time left: <Moment fromNow="dddd YYYY-MM-DD HH:mm">{this.props.order.deadline}</Moment></p>
                    <p>Number of offers: {this.state.responses.length}</p>
                </div>
                <div className="orderData">
                    <div>
                        <p><span>Description: </span>{this.props.order.description}</p>
                        <p><span>Ingredients list: </span>{this.props.order.ingredientsAvaiable}</p>
                    </div>
                    <div className="orderButtons">
                        
                    </div>
                </div>
                <hr></hr>

                <div>
                    <div>{this.renderResponses()}</div>
                </div>
                <a className="btn btn-large btn-block btn-success text-light" onClick={this.responseToOrder}>Make an offer for this order</a>
            </div>
        );
    }
}