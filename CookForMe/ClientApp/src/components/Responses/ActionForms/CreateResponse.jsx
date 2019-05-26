import React, { Component } from 'react';
import AuthMethods from '../../../Helpers/AuthMethods';

export default class AddNewOrder extends Component {
    constructor(props) {
        super(props);

        this.Auth = new AuthMethods();
        this.state = {
            orderId: this.props.match.params.order_id,
            name: '',
            price: '',
            avgCookTime: '',
            isSubmitDisabled: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { orderId, name, price, avgCookTime } = this.state;

        this.Auth.createResponse(
            { responserId: this.Auth.getUserId(), recipeName: name, recipePrice: price, recipeAvgCookTime: avgCookTime, orderId  }
        ).then((res) => {
            console.log(res);
           this.props.history.push('/Responses/MyResponses');
        })
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // this.checkIfFormDataIsValid();
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
                            <div className="form-group">
                                <label>Order ID: {this.state.orderId}</label>
                            </div>

                            <div className="headerLogin">
                                <h3>Recipe</h3>
                            </div>

                            <div className="form-group">
                                <label>Name</label>
                                <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                            </div>


                            <div className="form-group">
                                <label>Price</label>
                                <input className="form-control" type="text" name="price" value={this.state.price} onChange={this.handleInputChange} />
                            </div>


                            <div className="form-group">
                                <label>Average cook time</label>
                                <input className="form-control" type="text" name="avgCookTime" value={this.state.avgCookTime} onChange={this.handleInputChange} />
                            </div>

                            <input type="submit" value="Response to order" className="btn btn-large btn-block btn-primary" disabled={this.state.isSubmitDisabled} />
                            <input type="button" value="Cancel response" onClick={() => { this.props.history.push('/Responses/MyResponses') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
