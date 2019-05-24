import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SideMenu } from './SideMenu';
import { ActiveUserDetails } from './ActiveUserDetails';
import { OrdersListWrapper } from './OrdersListWrapper';
import { ResponsesListWrapper } from './ResponsesListWrapper';
import '../ComponentsStyles/UserProfile.css';

export class UserProfile extends Component {



    render() {
        return (
            <div className="row mx-0">
                <div className="col-md-2">
                    <SideMenu logOut={this.props.logOut} />
                </div>
                <div className="col-md-10 d-inline-block mt-5 ">
                    <Route path="/profile" component={ActiveUserDetails} />
                    <Route path="/orders" component={OrdersListWrapper} />
                    <Route path="/responses" component={ResponsesListWrapper} />
                </div>
            </div>
        );
    }

}