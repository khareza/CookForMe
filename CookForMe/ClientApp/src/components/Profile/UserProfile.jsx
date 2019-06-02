import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { MainProfile } from './MainProfile';
import { OrdersHistory } from './OrdersHistory';
import { ResponsesHistory } from './ResponsesHistory';

export class UserProfile extends Component {
    render() {
        return (
            <div>
                <div className="selectMenu">
                    <NavLink activeClassName="selectMenuActive" to="/Profile/Main">My profile</NavLink>
                    <NavLink activeClassName="selectMenuActive" to="/Profile/OrdersHistory">Orders history</NavLink>
                    <NavLink activeClassName="selectMenuActive" to="/Profile/ResponsesHistory">Responses history</NavLink>
                </div>
                <div>
                    <Route path="/Profile/Main" component={MainProfile} />
                    <Route path="/Profile/OrdersHistory" component={OrdersHistory} />
                    <Route path="/Profile/ResponsesHistory" component={ResponsesHistory} />
                </div>
            </div>
        );
    }

}