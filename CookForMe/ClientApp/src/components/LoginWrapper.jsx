import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import { Login } from './LoginForm';
import { RegisterNewUser } from './RegisterNewUser';
import AuthMethods from '../Helpers/AuthMethods';

export class LoginWrapper extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();

        if (this.Auth.loggedIn())
            this.props.history.push('/profile');
    }

    render() {
        return (
            <div>
                <div className="mainLoginWrapper ">
                    <div className="loginWrapper">
                        <div className="switch">
                            <NavLink activeClassName="activeLink" className="switchLink" to="/start/login">Login</NavLink>
                            <NavLink activeClassName="activeLink" className="switchLink" to="/start/register">Register</NavLink>
                        </div>
                        <Route exac path="/start/login" component={Login} />
                        <Route path="/start/register" component={RegisterNewUser} />
                    </div>
                </div>
            </div>
        );
    }
}