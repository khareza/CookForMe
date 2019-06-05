import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ResponseDetails } from './Details/Response';
import ResponseMethods from '../../Helpers/ResponseMethods';

class MyReponses extends Component {
    constructor(props) {
        super(props);
        this.ResponseRequest = new ResponseMethods();
        this.state = {
            responses: []
        }
    }

    componentDidMount = () => {
        this.getResponses();
    }

    getResponses = () => {
        this.ResponseRequest.getUserResponses()
            .then((res) => {
                this.setState({ responses: res.data });
            });
    }

    deleteResponse = (id) => {
        this.ResponseRequest.deleteResponse(id)
            .then(() => { this.getResponses() })
            .catch(err => { console.log(err) });
    }

    editResponse = (id) => {
        this.props.history.push(`/responses/MyResponses/edit/${id}`);
    }

    checkResponseDetails = (id) => {
        this.props.history.push(`/responses/MyResponses/details/${id}`);
    }



    renderResponseComponents = () => {
        return this.state.responses.map((response) => {
            return (
                <ResponseDetails key={response.id}
                    deleteResponse={this.deleteResponse}
                    editResponse={this.editResponse}
                    checkResponseDetails={this.checkResponseDetails}
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

export default withRouter(MyReponses);
