import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ResponseDetails } from './Details/Response';
import AuthMethods from '../../Helpers/AuthMethods';

class MyReponses extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        this.state = {
            responses: []
        }
    }

    componentDidMount = () => {
        this.getResponses();
    }

    getResponses = () => {
        this.Auth.getUserResponses()
            .then((res) => {
                this.setState({ responses: res.data });
            });
    }

    deleteResponse = (id) => {
        this.Auth.deleteResponse(id)
            .then(() => { this.getResponses() })
            .catch(err => { console.log(err) });
    }

    editResponse = (id) => {
        this.props.history.push(`/responses/MyResponses/edit/${id}`);
    }

    renderResponseComponents = () => {
        return this.state.responses.map((response) => {
            console.log(response);
            return (
                <ResponseDetails key={response.id}
                    deleteResponse={this.deleteResponse}
                    editResponse={this.editResponse}
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
