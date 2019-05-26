import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ResponseDetails } from './Details/Response';
import AuthMethods from '../../Helpers/AuthMethods';

class MyReponses extends Component {
    Auth = new AuthMethods();


    renderOrderComponents = () => {
        return this.props.responses.map((response) => {
            return (
                <ResponseDetails key={response.id}
                    deleteResponse={this.props.deleteResponse}
                    response={response} />
            )
        })
    }

    render() {
        return (
            <div>
                <div className="headerLogin">
                    <h2>All orders</h2>
                </div>
                {this.renderOrderComponents()}
                <div className="text-center">
                    <button className="btn btn-success mt-3"
                        onClick={() => { this.props.history.push('/orders/create') }}>Add new order</button>
                </div>
            </div>
        );
    }
}

export default withRouter(MyReponses);