import React, { Component } from 'react';
import Moment from 'react-moment';
import UserMethods from '../../../Helpers/UserMethods'
import AuthMethods from '../../../Helpers/AuthMethods'
import StarRatings from 'react-star-ratings';

export class AcceptedResponse extends Component {

    constructor(props) {
        super(props);
        this.userRequest = new UserMethods();
        this.authRequest = new AuthMethods();
        this.state = {
            ratingInfo: { rate: 0, ratesAmount: 0 }
        }
    }

    componentDidMount = () => {
        this.getUserRating();
    }

    getUserRating = () => {
        this.userRequest.getUserRating(this.props.response.appUser.id)
            .then((res) => {
                this.setState({ ratingInfo: res.data });
            })
    }

    changeRating = (newRate, name) => {
        this.userRequest
            .rateUser({
                userRatingId: this.authRequest.getUserId(),
                userRatedId: this.props.response.appUser.id,
                rate: newRate
            })
            .then((res) => {
                this.getUserRating();
            })
    }

    render() {

        return (
            <div className="responseCard">
                <div className="responseCardFlex">
                    <div className="orderColumn">
                        <div className="responseCardHeader">
                            <h4>Order</h4>
                            {this.props.response.response.order.ingredientsPhotoUrl
                                ? <img className="imgPreview" src={this.props.response.response.order.ingredientsPhotoUrl} alt="empty"></img>
                                : null}
                            <p>Time left: <Moment fromNow="dddd YYYY-MM-DD HH:mm">{this.props.response.response.order.expirationDate}</Moment></p>
                        </div>
                        <div className="responseData">
                            <div>
                                <p className="description"><span>Description: </span>{this.props.response.response.order.description}</p>
                                <p><span>Ingredients list: </span>{this.props.response.response.order.ingredientsAvaiable}</p>
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
                                {this.props.response.response.offers.map((offer, index) => {
                                    let selected = 'rejectedOffer';
                                    if (offer.id === this.props.response.offerId) {
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
                            <h4>Chef</h4>
                            <p>First name: {this.props.response.appUser.firstName}</p>
                            <p>Last name: {this.props.response.appUser.lastName}</p>
                            <p>City: {this.props.response.appUser.city}</p>
                            <p>Street: {this.props.response.appUser.street}</p>
                            <p>Phone: {this.props.response.appUser.phoneNumber}</p>
                            <p>Rating({this.state.ratingInfo.ratesAmount}): {this.state.ratingInfo.rate} </p>
                            <StarRatings
                                rating={this.state.ratingInfo.rate}
                                starRatedColor={'rgb(255, 215, 0)'}
                                starHoverColor={'rgb(255, 215, 0)'}
                                changeRating={this.changeRating}
                                starSpacing={'5px'}
                                starDimension={'40px'}
                                numberOfStars={5}
                                name='rating'
                            />
                        </div>
                        <div className="responseButtons">
                            <button className="btn btn-success mt-3">Order finished</button>
                            <button className="btn btn-danger mt-3">Order unfinished</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}