import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AcceptedResponse } from './Details/AcceptedResponse';
import ResponseMethods from '../../Helpers/ResponseMethods';

class AcceptedResponses extends Component {
    constructor(props) {
        super(props);
        this.ResponseRequest = new ResponseMethods();
        this.state = {
            acceptedResponses: []
        }
    }

    componentDidMount = () => {
        this.getResponses();
    }

    getResponses = () => {
        this.ResponseRequest.getAcceptedResponses()
            .then((res) => {
                this.setState({acceptedResponses : res.data});
            });
    }

    renderResponseComponents = () => {
        return this.state.acceptedResponses.map((response, index) => {
            return (
                <AcceptedResponse key={index}
                    response={response} />
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderResponseComponents()}
            </div>
        );
    }
}

export default withRouter(AcceptedResponses);
