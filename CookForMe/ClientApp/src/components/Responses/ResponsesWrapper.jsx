import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import MyResponsesWrapper from './MyResponsesWrapper';

export class ResponsesWrapper extends Component {
    render() {
        return (
            <div>
                <div>
                    <ul>
                        {
                            //<NavLink to="/Responses/OtherResponses">Other's responses</NavLink>
                        }
                        <NavLink to="/Responses/MyResponses">My Responses</NavLink>
                    </ul>
                </div>
                <div>
                    {
                        //<Route path="/Responses/OtherResponses" component={AllOrdersWrapper} />
                    }
                    <Route path="/Responses/MyResponses" component={MyResponsesWrapper} />
                </div>
            </div>
        );
    }
}

