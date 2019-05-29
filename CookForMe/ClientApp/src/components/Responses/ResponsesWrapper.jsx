import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import MyResponsesWrapper from './MyResponsesWrapper';

export class ResponsesWrapper extends Component {
    render() {
        return (
            <div>
                <div className="selectMenu">
                    <NavLink activeClassName="selectMenuActive" to="/Responses/AcceptedResponses">Accepted responses</NavLink>
                    <NavLink activeClassName="selectMenuActive" to="/Responses/MyResponses">My responses</NavLink>
                </div>
                <div>

                    <Route path="/Responses/MyResponses" component={MyResponsesWrapper} />
                </div>
            </div>
        );
    }
}
